from datetime import datetime
from datetime import timedelta
from datetime import date
import psycopg2
import sentiment_test as sentiment
import db_stock_data as stock_loader
import configparser

#connection 
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

cursor = connect.cursor()
#companies of interest
# TODO: type in company name from website to pull data
companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Tesla', 'Zoom', 'Uber', 'Lyft']
# create dictionary from company name to stock symbol
company_dict = {}
company_dict['Google'] = 'GOOGL'
company_dict['Amazon'] = 'AMZN'
company_dict['Microsoft'] = 'MSFT'

#get dates 
current_date = date.today() 
drop_date = current_date - timedelta(days = 7)

#get list of all schemas
cursor.execute('select schema_name from information_schema.schemata where schema_owner = \'postgres\' and schema_name != \'historical\'')
myschemas = [ x[0] for x in cursor.fetchall()]

#drop appropriate schemas
# TODO: what is this error?
for schema_date in myschemas: 
    if datetime.strptime(schema_date, '%b%d%y').date() <= drop_date:
       cursor.execute('DROP SCHEMA if exists ' + schema_date + ' cascade')

#create schema for the day 
cursor.execute('DROP SCHEMA if exists ' + current_date.strftime('%b%d%y') + ' cascade') 
cursor.execute('CREATE SCHEMA if not exists ' + current_date.strftime('%b%d%y')) 


connect.commit()
connect.close()

# insert the stock data
load_stocks = stock_loader.stock_data(company_dict, current_date)
load_stocks.create_insert_stock_data()

#process sentiment
get_sentiment = sentiment.sentiment_analysis(companies, current_date)
get_sentiment.process_sentiment()




