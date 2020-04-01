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
        self.end_date = end_date
        self.company_name = company_name
        self.response = []
    
    def __get_stock_data (self, date): 
        #TODO: get the stock data
        stock_data = {}
        stock_schema = self.company_name + '_stock'
        try:
            self.cursor.execute('select * from ' + date + '.' + stock_schema)
            result = self.cursor.fetchall()

            # loop through columns in the entry
            for col in result:
                stock_data['company_name'] = col[1]
                stock_data['stock_symbol'] = col[2]
                stock_data['minute'] = col[3]
                stock_data['high_pt'] = col[4]
                stock_data['low_pt'] = col[5]
                stock_data['open_value'] = col[6]
                stock_data['close_value'] = col[7]
                stock_data['average_value'] = col[8]
                stock_data['volume'] = col[9]
                stock_data['num_trades'] = col[10]
        except:
            print(f"Schema {stock_schema} does not exist; replace with null values")
            stock_data = None
            self.connect.rollback()
        return stock_data
    
    def __get_pos_neg (self, date):
        sentiment_table = self.company_name + '_sentiment'
        sentiments = []
        try:
            self.cursor.execute('select sent_score from ' + date + "." + sentiment_table)
            sentiments = [ x[0] for x in self.cursor.fetchall()]
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
            self.cursor.execute('select anger_score from ' + date + "." + sentiment_table)
            categorical_scores['anger'] = [x[0] for x in self.cursor.fetchall()]
        except:
            print("Scores for Anger not present; replacing with null value")
            categorical_scores['anger'] = None
            self.connect.rollback()
        try:
            #scores for disgust
            self.cursor.execute('select disgust_score from ' + date + "." + sentiment_table)
            categorical_scores['disgust'] = [x[0] for x in self.cursor.fetchall()]
        except:
            print("Scores for Disgust not present; replacing with null value")
            categorical_scores['disgust'] = None
            self.connect.rollback()
        try:
            #scores for joy
            self.cursor.execute('select joy_score from ' + date + "." + sentiment_table)
            categorical_scores['joy'] = [x[0] for x in self.cursor.fetchall()]
        except:
            print("Scores for Joy not present; replacing with null value")
            categorical_scores['joy'] = None
            self.connect.rollback()
        try:
            #scores for sadness
            self.cursor.execute('select sadness_score from ' + date + "." + sentiment_table)
            categorical_scores['sadness'] = [x[0] for x in self.cursor.fetchall()]
        except:
            print("Scores for Sadness not present; replacing with null value")
            categorical_scores['sadness'] = None
            self.connect.rollback()
        try:
            # scores for fear
            self.cursor.execute('select fear_score from ' + date + '.' + sentiment_table)
            categorical_scores['fear'] = [x[0] for x in self.cursor.fetchall()]
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
            self.cursor.execute('select title, retrieved_url, authors, num_characters from ' + date + "." + sentiment_table)
            result = self.cursor.fetchall()
            doc_id = 0
            #iterate through each row and place metadata dictionary 
            for col in result: 
                metadata[doc_id] = {}
                metadata[doc_id]['article_name'] = col[0]
                metadata[doc_id]['url'] = col[1]
                metadata[doc_id]['authors'] =col[2]
                metadata[doc_id]['num_characters'] =col[3]
                doc_id +=1
        except:
            print(f"Schema not present for {sentiment_table}; replace metadata with null values")
            metadata = None
            self.connect.rollback()
        return metadata


    def get_company_data(self):
       
       #date formatting 
        start_date_format = datetime.strptime(self.start_date, '%b%d%y').date() - timedelta(days = 1)
        end_date_format = datetime.strptime(self.end_date, '%b%d%y').date()

        #create a dictionary object to work 
        data_dict =  {'company_name': self.company_name}

        #TODO: Create a dictionary for growth 


        dates_dict = {}
        while start_date_format != end_date_format:
            #date formatting
            start_date_format += timedelta(days =1)
            start_date_str = datetime.strftime(start_date_format,'%b%d%y')
            #create dictionary for the current day 
            current_date_dict = {}
            current_date_dict['stock_data'] =  self.__get_stock_data(start_date_str)
            current_date_dict['pos_neg'] =  self.__get_pos_neg(start_date_str)
            current_date_dict['categorical'] = self.__get_categorical(start_date_str)
            current_date_dict['metadata'] = self.__get_metadata(start_date_str)
            #append created dictionary into the dates dictionary
            dates_dict[start_date_str] = current_date_dict
        data_dict['dates'] = dates_dict
        self.response = json.dumps(data_dict, cls=DjangoJSONEncoder, indent=2)
        return json.dumps(data_dict, cls=DjangoJSONEncoder, indent=2)


#TEST API 
google = retrieve_data('google', 'mar2820', 'apr0120')
file = open("out.json", "w")
temp = google.get_company_data()
file.write(temp)