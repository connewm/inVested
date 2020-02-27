from newsapi import NewsApiClient
import json

class news_scraper: 
   
    def __init__ (self, name,start_date, end_date): 
        self.name = name
        self.start_date = start_date
        self.end_date = end_date

    def get_articles(self): 
        cred_file = open("/Users/Swetha/Documents/inVested/nlp_cred.txt", "r")
        cred_str = cred_file.read()
        # read in as JSON
        cred_json = json.loads(cred_str)

        newsapi = NewsApiClient(api_key=cred_json['news_key'])
        # the subject (keyword looked for in title) to filter by
        # The '+' means that the word must explicitly be contained in the title
        # TODO: allow command line entry of subject string
        #subject_string = "+amazon"
        # TODO: change from and to date to todays date instead of being hard coded


        all_articles = newsapi.get_everything(qintitle=self.name, from_param= self.start_date, to= self.end_date, language='en')
        json_fmt_articles = json.dumps(all_articles)
        print(json_fmt_articles)
        print(all_articles['totalResults'])
        return all_articles['articles']

#company_params = news_scraper("+amazon", '2020-02-19', '2020-02-20')
#company_articles =company_params.get_articles()
#print(company_articles)
#for item in company_articles: 
    #print(item['url'])

