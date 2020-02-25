from newsapi import NewsApiClient
import json

newsapi = NewsApiClient(api_key='692ca85daa144ef3bda94bfe165d5aa5')

all_articles = newsapi.get_everything(qintitle='+google', from_param='2020-02-25', to='2020-02-25', language='en')
json_fmt_articles = json.dumps(all_articles)
print(json_fmt_articles)
print(all_articles['totalResults'])