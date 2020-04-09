from newsapi import NewsApiClient
import json

class news_scraper: 
   
    def __init__ (self, name,start_date): 
        self.name = name
        self.start_date = start_date

    def get_articles(self): 
        cred_file = open("./nlp_cred.txt", "r")
        cred_str = cred_file.read()
        # read in as JSON
        cred_json = json.loads(cred_str)

        newsapi = NewsApiClient(api_key=cred_json['news_key'])

        all_articles = newsapi.get_everything(qintitle=self.name, from_param= self.start_date, to= self.start_date, language='en')
        return all_articles['articles']