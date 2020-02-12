import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, CategoriesOptions
import articleScraper as feed

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
response_items = {} # a hash from title => response_json
meta_data_items = {} # a hash from title => meta_data
for item in results:
    response = natural_language_understanding.analyze(
        text = item.title + item.content
        features=
    )    
    print(response)
    break

