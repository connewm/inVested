# API for getting stock, article metadata, positive/negative sentiment and categorical sentiment data
from datetime import datetime
from datetime import timedelta
from datetime import date
from decimal import Decimal
from django.core.serializers.json import DjangoJSONEncoder  
import psycopg2
import json
import configparser

class retrieve_data:

    def __init__ (self, company_name, start_date, end_date):

        # read db from config file
        config = configparser.ConfigParser()
        config.read('config.ini')
        #database connection
        try:
            self.connect = psycopg2.connect(database=config['postgresDB']['database'], user=config['postgresDB']['user'], 
                password=config['postgresDB']['password'], host=config['postgresDB']['host'], port='5432')
        except:
            print("Database connection unsuccessful")
            exit()
        self.cursor = self.connect.cursor()
        self.start_date = start_date
        self.company_name = company_name
        self.historic_response = []
        self.company_response = []
        self.end_date = end_date
    def get_historic_data (self): 

        start_date_format = datetime.strptime(self.start_date, '%b%d%y').date()
        end_date_format = datetime.strptime(self.end_date, '%b%d%y').date()
        date_range = []
        for single_date in self.__daterange(start_date_format, end_date_format):
            date_range.append(datetime.strftime(single_date,'%b%d%y'))
                
        #setup a data dictionary  
        data_dict =  {'company_name': self.company_name}
        dates_dict = {}
        date_sent_stock_arr = []
        print(start_date_format)
        while start_date_format != end_date_format:
            # date formatting
            start_date_format += timedelta(days =1)
            start_date_str = datetime.strftime(start_date_format,'%b%d%y')

            current_date_dict = {}
            # set date attribute
            current_date_dict['date'] = start_date_str

            sent_date_dict = {}
            try:
                self.cursor.execute('select * from historical.historic_sentiment_data where date = %s and company_name = %s', (start_date_str, self.company_name))
                sent_results = self.cursor.fetchall()
                sent_date_dict["avg_sent"] = sent_results[0][2]
                sent_date_dict["avg_sadness_score"] = sent_results[0][3]
                sent_date_dict["avg_joy_score"] = sent_results[0][4]
                sent_date_dict["avg_fear_score"] = sent_results[0][5]
                sent_date_dict["avg_disgust_score"] = sent_results[0][6]
            except:
                print("Was not able to query either company or date")
                sent_date_dict = None
                self.connect.rollback()

            current_date_dict["sentiment"] = sent_date_dict

            # do the same for stocks
            stock_date_dict = {}
            try:
                self.cursor.execute('select * from historical.historic_stock_data where date = %s and company_name = %s', (start_date_str, self.company_name))
                stock_results = self.cursor.fetchall()
                stock_date_dict["symbol"] = stock_results[0][9]
                stock_date_dict["high_pt"] = stock_results[0][2]
                stock_date_dict["low_pt"] = stock_results[0][3]
                stock_date_dict["open_value"] = stock_results[0][4]
                stock_date_dict["close_value"] = stock_results[0][5]
                stock_date_dict["average_value"] = stock_results[0][6]
                stock_date_dict["volume"] = stock_results[0][7]
                stock_date_dict["num_trades"] = stock_results[0][8]
            except:
                print("Was not able to query either company or date")
                stock_date_dict = None
                self.connect.rollback()

            current_date_dict["stock"] = stock_date_dict     

            date_sent_stock_arr.append(current_date_dict)
           
        data_dict['dates'] = date_sent_stock_arr
       
        self.historic_response = json.dumps(data_dict, cls=DjangoJSONEncoder, indent=2)
        return json.dumps(data_dict, cls=DjangoJSONEncoder, indent=2)
    
    def get_company_data(self):
       
       #date formatting 
        start_date_format = datetime.strptime(self.start_date, '%b%d%y').date() - timedelta(days = 1)
        end_date_format = datetime.strptime(self.end_date, '%b%d%y').date()

        #create a dictionary object to work 
        data_dict =  {'company_name': self.company_name}

        #TODO: Create a dictionary for growth 


        dates_dict = {}
        date_data_arr = []
        while start_date_format != end_date_format:
            #date formatting
            start_date_format += timedelta(days =1)
            start_date_str = datetime.strftime(start_date_format,'%b%d%y')
            #create dictionary for the current day 
            current_date_dict = {}
            current_date_dict['date'] = start_date_str
            current_date_dict['stock_data'] =  self.__get_stock_data(start_date_str)
            current_date_dict['pos_neg'] =  self.__get_pos_neg(start_date_str)
            current_date_dict['categorical'] = self.__get_categorical(start_date_str)
            current_date_dict['metadata'] = self.__get_metadata(start_date_str)
            #append created dictionary into the dates dictionary
            date_data_arr.append(current_date_dict)
        data_dict['dates'] = date_data_arr
        self.company_response = json.dumps(data_dict, cls=DjangoJSONEncoder, indent=2)
        return json.dumps(data_dict, cls=DjangoJSONEncoder, indent=2)
    
    def __get_stock_data (self, date): 
        stock_data = {}
        stock_schema = self.company_name + '_stock'
        try:
            self.cursor.execute('select * from ' + date + '.' + stock_schema)
            result = self.cursor.fetchall()
            data_arr = []
            for entry in result:
                item = {}
                item['company_name'] = entry[1]
                item['stock_symbol'] = entry[2]
                item['minute'] = entry[3]
                item['high_pt'] = entry[4]
                item['low_pt'] = entry[5]
                item['open_value'] = entry[6]
                item['close_value'] = entry[7]
                item['average_value'] = entry[8]
                item['volume'] = entry[9]
                item['num_trades'] = entry[10]
                data_arr.append(item)
            stock_data = data_arr
        except:
            print(f"Schema {stock_schema} does not exist; replace with null values")
            stock_data = None
            self.connect.rollback()
        return stock_data
    
    def __get_pos_neg (self, date):
        sentiment_table = self.company_name + '_sentiment'
        sentiments = []
        try:
            self.cursor.execute('select document_id, sent_score from ' + date + "." + sentiment_table)
            sentiments = [ {'document_id' : x[0], 'score' : x[1]} for x in self.cursor.fetchall()]
        except:
            print(f"Schema {sentiment_table} does not exist; replace with null values")
            sentiments = None
            self.connect.rollback()
        return sentiments

    def __get_categorical (self, date):
        sentiment_table = self.company_name + '_sentiment'
        categorical_scores = {}
        try:
            #scores for anger
            self.cursor.execute('select document_id, anger_score from ' + date + "." + sentiment_table)
            categorical_scores['anger'] = [{'document_id' : x[0], 'score' : x[1]} for x in self.cursor.fetchall()]
        except:
            print("Scores for Anger not present; replacing with null value")
            categorical_scores['anger'] = None
            self.connect.rollback()
        try:
            #scores for disgust
            self.cursor.execute('select document_id, disgust_score from ' + date + "." + sentiment_table)
            categorical_scores['disgust'] = [{'document_id' : x[0], 'score' : x[1]} for x in self.cursor.fetchall()]
        except:
            print("Scores for Disgust not present; replacing with null value")
            categorical_scores['disgust'] = None
            self.connect.rollback()
        try:
            #scores for joy
            self.cursor.execute('select document_id, joy_score from ' + date + "." + sentiment_table)
            categorical_scores['joy'] = [{'document_id' : x[0], 'score' : x[1]} for x in self.cursor.fetchall()]
        except:
            print("Scores for Joy not present; replacing with null value")
            categorical_scores['joy'] = None
            self.connect.rollback()
        try:
            #scores for sadness
            self.cursor.execute('select document_id, sadness_score from ' + date + "." + sentiment_table)
            categorical_scores['sadness'] = [{'document_id' : x[0], 'score' : x[1]} for x in self.cursor.fetchall()]
        except:
            print("Scores for Sadness not present; replacing with null value")
            categorical_scores['sadness'] = None
            self.connect.rollback()
        try:
            # scores for fear
            self.cursor.execute('select document_id, fear_score from ' + date + '.' + sentiment_table)
            categorical_scores['fear'] = [{'document_id' : x[0], 'score' : x[1]} for x in self.cursor.fetchall()]
        except:
            print("Scores for Fear not present; replacing with null value")
            categorical_scores['fear'] = None
            self.connect.rollback()
        return categorical_scores
        

    def __get_metadata (self, date):
        sentiment_table = self.company_name + '_sentiment'
        metadata = {} 
        try:
            #extract the title, retrieved_url, authors, and number of characters from sentiment table
            self.cursor.execute('select title, retrieved_url, authors, num_characters, document_id from ' + date + "." + sentiment_table)
            result = self.cursor.fetchall()
            #iterate through each row and place metadata dictionary 
            md_arr = []
            for col in result: 
                item = {}
                item['article_name'] = col[0]
                item['url'] = col[1]
                item['authors'] =col[2]
                item['num_characters'] =col[3]
                item['document_id'] = col[4]
                md_arr.append(item)
            metadata = md_arr
        except:
            print(f"Schema not present for {sentiment_table}; replace metadata with null values")
            metadata = None
            self.connect.rollback()
        return metadata

    
    def __daterange(self,date1, date2):
        for n in range(int ((date2 - date1).days)+1):
            yield date1 + timedelta(n)



'''
#TEST API 
google = retrieve_data('Amazon', 'apr0920', 'apr1420')
file = open("daily_detailed.json", "w")
temp = google.get_company_data()
print(temp)
file.write(temp)
file = open("historical.json", "w")
temp = google.get_historic_data()
file.write(temp)
'''
