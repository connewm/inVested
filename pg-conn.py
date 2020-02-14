import psycopg2

try:
    connect = psycopg2.connect(database="postgres", user="postgres", password="CapStoneRDS", 
    host="database-1.ciomlblnrvsp.us-east-2.rds.amazonaws.com", port='5432')
except:
    print("no good")

cursor = connect.cursor()
print("here")
# create necessary tables to support information
query = "CREATE TABLE public.meta_no_url (document_id int primary key, title varchar(100), link varchar(100), pub_date varchar(50), num_characters int);"
cursor.execute(query)
query = "CREATE TABLE public.sentiment_and_emotion_no_url (document_id int primary key, sent_score numeric, sent_label varchar(50), sadness_score numeric, joy_score numeric, fear_score numeric, disgust_score numeric, anger_score numeric);"
cursor.execute(query)
query = "create table public.meta_with_url (document_id int primary key, title text, retrieved_url text, pub_date text, attached_feeds text[], authors text[], num_characters int)"
cursor.execute(query)
query = "CREATE TABLE public.sentiment_and_emotion_with_url (document_id int primary key, sent_score numeric, sent_label varchar(50), sadness_score numeric, joy_score numeric, fear_score numeric, disgust_score numeric, anger_score numeric);"
cursor.execute(query)
# create tables for data found when passing a url to the nlp call

connect.commit()