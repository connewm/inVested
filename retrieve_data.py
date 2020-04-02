# API for getting stock, article metadata, positive/negative sentiment and categorical sentiment data
from datetime import datetime
from datetime import timedelta
from datetime import date
from decimal import Decimal
from django.core.serializers.json import DjangoJSONEncoder  
import psycopg2
import json

class retrieve_data:

    def __init__ (self, company_name, start_date, end_date):

        #database connection
        try:
            connect = psycopg2.connect(database="postgres", user="postgres", password="CapStoneRDS", 
            host="database-1.ciomlblnrvsp.us-east-2.rds.amazonaws.com", port='5432')
        except:
            print("no good")
        self.cursor = connect.cursor()
        self.start_date = start_date
        self.end_date = end_date
        self.company_name = company_name
        self.response = []
    
    def __get_stock_data (self, date): 
        #TODO: get the stock data
        return "temp"
    
    def __get_pos_neg (self, date):
        sentiment_table = self.company_name + '_sentiment'
        self.cursor.execute('select sent_score from ' + date + "." + sentiment_table)
        return [ x[0] for x in self.cursor.fetchall()]

    def __get_categorical (self, date):
        sentiment_table = self.company_name + '_sentiment'
        categorical_scores = {}
        #scores for anger
        self.cursor.execute('select anger_score from ' + date + "." + sentiment_table)
        categorical_scores['anger'] = [x[0] for x in self.cursor.fetchall()]
        #scores for disgust
        self.cursor.execute('select disgust_score from ' + date + "." + sentiment_table)
        categorical_scores['disgust'] = [x[0] for x in self.cursor.fetchall()]
        #scores for joy
        self.cursor.execute('select joy_score from ' + date + "." + sentiment_table)
        categorical_scores['joy'] = [x[0] for x in self.cursor.fetchall()]
        #scores for joy
        self.cursor.execute('select sadness_score from ' + date + "." + sentiment_table)
        categorical_scores['sadness'] = [x[0] for x in self.cursor.fetchall()]
        
        return categorical_scores
        

    def __get_metadata (self, date):
        sentiment_table = self.company_name + '_sentiment'
        metadata = {} 
        #extract the title, retrieved_url, authors, and number of characters from sentiment table
        self.cursor.execute('select title, retrieved_url, authors, num_characters from ' + date + "." + sentiment_table)
        result = self.cursor.fetchall()
        doc_id = 0
        #iterate through each row and place metadata dictionary 
        for row in result: 
            metadata[doc_id] = {}
            metadata[doc_id]['article_name'] = row[0]
            metadata[doc_id]['url'] = row[1]
            metadata[doc_id]['authors'] = row[2]
            metadata[doc_id]['num_characters'] = row[3]
            doc_id +=1
       
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
google = retrieve_data('google', 'mar2820', 'mar3020')
print(google.get_company_data())