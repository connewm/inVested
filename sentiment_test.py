import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, CategoriesOptions, EmotionOptions, SentimentOptions, MetadataOptions
import article_scrapper as feed
import psycopg2

try:
    connect = psycopg2.connect(database="postgres", user="postgres", password="CapStoneRDS", 
    host="database-1.ciomlblnrvsp.us-east-2.rds.amazonaws.com", port='5432')
except:
    print("no good")

cursor = connect.cursor()

# read in my credentials, parse api key
cred_file = open("nlp_cred.txt", "r")
cred_str = cred_file.read()
# read in as JSON
cred_json = json.loads(cred_str)

auth = IAMAuthenticator(cred_json['apikey'])
natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2019-07-12',
    authenticator=auth
)

natural_language_understanding.set_service_url(cred_json['url'])

# now create an rss reader and analyze the concatneation of title and content from feed
# TODO: can also just input the url from the rss feed and have it parse 
#   the html (content) returned from the url
cnn_scrape = feed.scraperRSS('http://rss.cnn.com/rss/money_news_companies.rss')
results = cnn_scrape.parseRSS()

# for every result, analyze the content cat with the title
document_id = 0
for item in results:
    response = natural_language_understanding.analyze(
        text = item.title + item.content,
        features= Features(emotion=EmotionOptions(), sentiment=SentimentOptions())
    ).get_result()
    # collect meta data and create query
    num_char = response["usage"]["text_characters"]
    # replace all potential pg confusing characters from strings
    title = item.title.replace("'", "")
    print(title)
    cursor.execute("insert into public.meta_no_url (document_id, title, link, pub_date, num_characters) values (%s, %s, %s, %s, %s)",
        (
            document_id,
            title,
            item.link,
            item.date,
            num_char
        )
    )
    # gather sentiment and emotion data and creat query for it
    sentiment_score = response["sentiment"]["document"]["score"]
    sentiment_label = response["sentiment"]["document"]["label"]

    sad_score = response["emotion"]["document"]["emotion"]["sadness"]
    joy_score = response["emotion"]["document"]["emotion"]["joy"]
    fear_score = response["emotion"]["document"]["emotion"]["fear"]
    disgust_score = response["emotion"]["document"]["emotion"]["disgust"]
    anger_score = response["emotion"]["document"]["emotion"]["anger"]

    cursor.execute("insert into public.sentiment_and_emotion_no_url (document_id, sent_score, sent_label, sadness_score, joy_score, fear_score, disgust_score, anger_score) values (%s, %s, %s, %s, %s, %s, %s, %s)", 
        (
            document_id,
            sentiment_score,
            sentiment_label,
            sad_score,
            joy_score,
            fear_score,
            disgust_score,
            anger_score
        )
    )

    # make calls with the same document using the url instead
    # see what different information that will return
    response_w_url = natural_language_understanding.analyze(
        url = item.link,
        features= Features(metadata=MetadataOptions(), emotion=EmotionOptions(), sentiment=SentimentOptions())
    ).get_result()
    title = response_w_url["metadata"]["title"]
    # make title palatable for postgres
    title = title.replace("'", "")
    retrieved_url = response_w_url["retrieved_url"]
    pub_date = response_w_url["metadata"]["publication_date"]
    attached_feeds = [feed["link"] for feed in response_w_url["metadata"]["feeds"]]
    authors = [author["name"] for author in response_w_url["metadata"]["authors"]]
    num_char = response_w_url["usage"]["text_characters"]
    cursor.execute("insert into public.meta_with_url (document_id, title, retrieved_url, pub_date, attached_feeds, authors, num_characters) values (%s, %s, %s, %s, %s, %s, %s)", 
        (
            document_id,
            title,
            retrieved_url,
            pub_date,
            attached_feeds,
            authors,
            num_char
        )
    )

    # gather the information for the sentiment and emotion scores again
    # we want to see if they're different using this method
    sentiment_score = response_w_url["sentiment"]["document"]["score"]
    sentiment_label = response_w_url["sentiment"]["document"]["label"]

    sad_score = response_w_url["emotion"]["document"]["emotion"]["sadness"]
    joy_score = response_w_url["emotion"]["document"]["emotion"]["joy"]
    fear_score = response_w_url["emotion"]["document"]["emotion"]["fear"]
    disgust_score = response_w_url["emotion"]["document"]["emotion"]["disgust"]
    anger_score = response_w_url["emotion"]["document"]["emotion"]["anger"]
    
    cursor.execute("insert into public.sentiment_and_emotion_with_url (document_id, sent_score, sent_label, sadness_score, joy_score, fear_score, disgust_score, anger_score) values (%s, %s, %s, %s, %s, %s, %s, %s)", 
        (
            document_id,
            sentiment_score,
            sentiment_label,
            sad_score,
            joy_score,
            fear_score,
            disgust_score,
            anger_score
        )
    )


    document_id += 1

connect.commit()
    