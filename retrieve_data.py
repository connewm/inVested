# API for getting stock, article metadata, positive/negative sentiment and categorical sentiment data

class retrieve_data:

    def __init__ (self, company_name):
        self.company_name = company_name
        self.stock = [] # array of JSON objects for stock
        self.pos_neg_sentiment = [] # array of JSON objects for pos/neg
        self.categorical_sentiment = [] # array of JSON objects for categorical
        self.metadata = [] # array of JSON obecjts with article metadata

    def __get_stock_data(self):

    def __get_pos_neg(self):

    def __get_categorical(self):
    
    def __get_metadata(self):

    def get_company_data(self):
        self.__get_stock_data()
        self.__get_pos_neg()
        self.__get_categorical()
        self.__get_metadata()