import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, CategoriesOptions, EmotionOptions, SentimentOptions, MetadataOptions
import news_scraper as feed
import psycopg2
import configparser

class sentiment_analysis: 

    def __init__ (self, companies, date): 

        #database connection 

        # read db from config file
        config = configparser.ConfigParser()
        config.read('config.ini')
        #database connection
         # read db from config file
        config = configparser.ConfigParser()
        config.read('config.ini')
        #database connection
        try:
            connect = psycopg2.connect(database=config['postgresDB']['database'], user=config['postgresDB']['user'], 
                password=config['postgresDB']['password'], host=config['postgresDB']['host'], port='5432')
        except:
            print("Database connection unsuccessful")
            exit()
        
        self.connect = connect
        self.cursor = connect.cursor()
        self.companies = companies 
        self.date = date 
        self.schema_name = date.strftime('%b%d%y')
    
    def __process_historical(self, company): 
        self.cursor.execute("SELECT AVG(sent_score), AVG(sadness_score), AVG(joy_score), AVG(fear_score), AVG(disgust_score), AVG(anger_score) from  " + self.schema_name + "." + company + "_sentiment")
        results = self.cursor.fetchall()
        self.cursor.execute("INSERT INTO historical.historic_data (date, company_name, avg_sent, avg_sadness_score,  avg_joy_score , avg_fear_score, avg_disgust_score, avg_anger_score) values (%s, %s,%s, %s, %s, %s, %s, %s)",  
        (
            self.schema_name, 
            company,
            results[0][0], 
            results[0][1],
            results[0][2], 
            results[0][3], 
            results[0][4], 
            results[0][5]
        )
        )
        self.connect.commit()
   
    def process_sentiment(self): 


        # read in my credentials, parse api key
        cred_file = open("./nlp_cred.txt", "r")
        cred_str = cred_file.read()
        # read in as JSON
        cred_json = json.loads(cred_str)

        auth = IAMAuthenticator(cred_json['apikey'])
        natural_language_understanding = NaturalLanguageUnderstandingV1(
            version='2019-07-12',
            authenticator=auth
        )

        natural_language_understanding.set_service_url(cred_json['url'])

        for company in self.companies:
            print("in loop")
            #process information for each company 
            company_params = feed.news_scraper(company, self.date)
            company_articles =company_params.get_articles()
            sentiment_table = company + '_sentiment'
            try:
                self.cursor.execute("CREATE TABLE IF NOT EXISTS " + self.schema_name + "." + sentiment_table + "(document_id INTEGER, title varchar, retrieved_url varchar, pub_date varchar, authors varchar, num_characters integer, sent_score numeric, sent_label varchar, sadness_score numeric, joy_score numeric, fear_score numeric,  disgust_score numeric, anger_score numeric)")
            except:
                print("not created")

            #restart document_id 
            document_id = 0

            for item in company_articles: 
                
                try : 
                    response_w_url = natural_language_understanding.analyze(
                        url = item['url'],
                        features= Features(metadata=MetadataOptions(), emotion=EmotionOptions(), sentiment=SentimentOptions())
                    ).get_result()
                    title = response_w_url["metadata"]["title"]
                    # make title palatable for postgres
                    title = title.replace("'", "")
                    retrieved_url = response_w_url["retrieved_url"]
                    pub_date = response_w_url["metadata"]["publication_date"]
                    authors = [author["name"] for author in response_w_url["metadata"]["authors"]]
                    num_char = response_w_url["usage"]["text_characters"]
                    # gather the information for the sentiment and emotion scores again
                    # we want to see if they're different using this method
                    sentiment_score = response_w_url["sentiment"]["document"]["score"]
                    sentiment_label = response_w_url["sentiment"]["document"]["label"]

                    sad_score = response_w_url["emotion"]["document"]["emotion"]["sadness"]
                    joy_score = response_w_url["emotion"]["document"]["emotion"]["joy"]
                    fear_score = response_w_url["emotion"]["document"]["emotion"]["fear"]
                    disgust_score = response_w_url["emotion"]["document"]["emotion"]["disgust"]
                    anger_score = response_w_url["emotion"]["document"]["emotion"]["anger"]
                    self.cursor.execute("insert into " + self.schema_name + "."  + sentiment_table + " (document_id, title, retrieved_url, pub_date, authors, num_characters, sent_score, sent_label, sadness_score, joy_score, fear_score, disgust_score, anger_score) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                    (
                        document_id,
                        title,
                        retrieved_url,
                        pub_date,
                        authors,
                        num_char, 
                        sentiment_score, 
                        sentiment_label, 
                        sad_score, 
                        joy_score, 
                        fear_score, 
                        disgust_score, 
                        anger_score
                    ))
                    document_id += 1
                except Exception: 
                    print("Broken link")
            self.connect.commit()
            self.__process_historical(company)
            
        self.connect.commit()
        self.connect.close()
    