from datetime import datetime
from datetime import date
import psycopg2
import sentiment_test as sentiment

try:
    connect = psycopg2.connect(database="postgres", user="postgres", password="CapStoneRDS", 
    host="database-1.ciomlblnrvsp.us-east-2.rds.amazonaws.com", port='5432')
except:
    print("no good")

cursor = connect.cursor()

#get the last date that the schema was generated 
generated_date_query = "select * from last_generated_date"
cursor.execute(generated_date_query)
records = cursor.fetchall()
generated_date = datetime.strptime(records[len(records)-1][0], '%Y-%m-%d').date()
print(generated_date)
#get today's date
current_date = date.today()
print(current_date)
companies = ['Google']

#check the difference in dates 
if ((abs(current_date - generated_date).days) >= 7):
    cursor.execute('DROP SCHEMA if exists current_week cascade')
    connect.commit()
    str_date = current_date.strftime('%Y-%m-%d')
    print(str_date)
    cursor.execute("insert into last_generated_date (date) values (%s) ", (str_date,))
    cursor.execute('CREATE SCHEMA current_week') 
    connect.commit()
    get_sentiment = sentiment.sentiment_analysis(companies, current_date, current_date)
else: 
    get_sentiment = sentiment.sentiment_analysis(companies, generated_date, current_date)

get_sentiment.process_sentiment()




