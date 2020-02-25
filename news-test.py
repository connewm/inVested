from newsapi import NewsApiClient
import json

newsapi = NewsApiClient(api_key='692ca85daa144ef3bda94bfe165d5aa5')

all_articles = newsapi.get_everything(q='google', from_param='2020-02-25', to='2020-02-25', language='en', sort_by='relevancy')
all_articles = json.dumps(all_articles)
print(all_articles)