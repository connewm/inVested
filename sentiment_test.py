import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, CategoriesOptions, EmotionOptions, SentimentOptions, MetadataOptions
import news_scraper as feed
import psycopg2

class sentiment_analysis: 

    def __init__ (self, companies, start_date, end_date): 
         self.companies = companies 
         self.start_date = start_date 
         self.end_date = end_date 
         self.schema_name = start_date.strftime('%b%d%y')
    
    def process_sentiment(self): 

        try:
            connect = psycopg2.connect(database="postgres", user="postgres", password="CapStoneRDS", 
            host="database-1.ciomlblnrvsp.us-east-2.rds.amazonaws.com", port='5432')
        except:
            print("no good")

        cursor = connect.cursor()

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
            
            #process information for each company 
            company_params = feed.news_scraper(company, self.start_date, self.end_date)
            company_articles =company_params.get_articles()
            sentiment_table = company + '_sentiment'
            cursor.execute("CREATE TABLE IF NOT EXISTS " + self.schema_name + "." + sentiment_table + "(document_id INTEGER, title varchar, retrieved_url varchar, pub_date varchar, authors varchar, num_characters integer, sent_score numeric, sent_label varchar, sadness_score numeric, joy_score numeric, fear_score numeric,  disgust_score numeric, anger_score numeric)")

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
                    print(document_id)
                    cursor.execute("insert into " + self.schema_name + "."  + sentiment_table + " (document_id, title, retrieved_url, pub_date, authors, num_characters, sent_score, sent_label, sadness_score, joy_score, fear_score, disgust_score, anger_score) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
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
                
        connect.commit()
        connect.close()
    