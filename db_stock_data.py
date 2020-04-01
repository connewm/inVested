# create tables for stock data in current (todays) schema and load stock data into the tables

import psycopg2
import load_stock_data as loader
import json
import configparser

class stock_data:

    # this is a map from company name to their stock symbol
    def __init__ (self, companies_tickers, start_date):
        self.comp_tick = companies_tickers
        self.schema_name = start_date.strftime('%b%d%y')

        # tickers is array of all stock tickers
    def create_insert_stock_data(self):
        # read db from config file
        config = configparser.ConfigParser()
        config.read('config.ini')
        #database connection
        try:
            connect = psycopg2.connect(database=config['postgresDB']['database'], user=config['postgresDB']['user'], 
                password=config['postgresDB']['password'], host=config['postgresDB']['host'], port='5432')
        except:
            print("Database connection unsuccessful")
            exit()
        cursor = connect.cursor()

        # read in all credentials
        cred_file = open("./nlp_cred.txt", "r")
        cred_str = cred_file.read()
        # read in as JSON
        cred_json = json.loads(cred_str)

        # create a table for all tickers in current schema
        
        for comp_name, comp_sym in self.comp_tick.items():
            table_name = comp_name + '_stock'
            cursor.execute("create table if not exists " + self.schema_name + "." + table_name + "(stock_id integer, company_name varchar, stock_symbol varchar, minute varchar, high_pt decimal, low_pt decimal, open_value decimal, close_value decimal, \
             average_value decimal, volume integer, num_trades integer)")

            api_key = cred_json['IEX_key']
            stock_json = loader.get_half_hour_stock_data(comp_sym, api_key)
            stock_id = 0
            for entry in stock_json:
                cursor.execute("insert into " + self.schema_name + "." + table_name + " (stock_id, company_name, stock_symbol, minute, high_pt, low_pt, open_value, close_value, average_value, volume, num_trades) \
                values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (
                    stock_id,
                    comp_name,
                    comp_sym,
                    entry["label"],
                    entry["high"],
                    entry["low"],
                    entry["open"],
                    entry["close"],
                    entry["average"],
                    entry["volume"],
                    entry["numberOfTrades"]
                ))

                stock_id += 1
        connect.commit()
        connect.close()
