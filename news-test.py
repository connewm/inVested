from newsapi import NewsApiClient
import json

cred_file = open("nlp_cred.txt", "r")
cred_str = cred_file.read()
# read in as JSON
cred_json = json.loads(cred_str)

newsapi = NewsApiClient(api_key=cred_json['news_key'])
# the subject (keyword looked for in title) to filter by
# The '+' means that the word must explicitly be contained in the title
# TODO: allow command line entry of subject string
subject_string = "+amazon"
# TODO: change from and to date to todays date instead of being hard coded
date_from = '2020-02-25'
date_to = '2020-02-25'

all_articles = newsapi.get_everything(qintitle=subject_string, from_param=date_from, to=date_to, language='en')
json_fmt_articles = json.dumps(all_articles)
print(json_fmt_articles)
print(all_articles['totalResults'])