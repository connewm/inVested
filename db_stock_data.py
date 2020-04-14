# create tables for stock data in current (todays) schema and load stock data into the tables

import psycopg2
import load_stock_data as loader
import json
import configparser
import math

class stock_data:

    # this is a map from company name to their stock symbol
    def __init__ (self, companies_tickers, start_date):
        self.comp_tick = companies_tickers
        self.schema_name = start_date.strftime('%b%d%y')
        # read db from config file
        config = configparser.ConfigParser()
        config.read('config.ini')
        #database connection
        try:
            self.connect = psycopg2.connect(database=config['postgresDB']['database'], user=config['postgresDB']['user'], 
                password=config['postgresDB']['password'], host=config['postgresDB']['host'], port='5432')
        except:
            print("Database connection unsuccessful")
            exit()
        self.cursor = self.connect.cursor()

    # creates a historical entry for the daily stock data of that company
    def __process_historical(self, company, symbol, stock_json):
        # first thing, try to create the table in case it was somehow deleted
        try:
            self.cursor.execute("create table if not exists historical.historic_stock_data (date varchar(25), company_name varchar(25), high_pt numeric, low_pt numeric, open_value numeric, close_value numeric, average_value numeric, volume integer, num_trades integer, symbol varchar(25));")
        except:
            print("Error connecting to historic schema")

        # make sure that this isn't the second historical has been run
        row_count = self.cursor.execute('select count(*) from historical.historic_stock_data where date =  %s and company_name = %s', (self.schema_name, company))

        if (self.cursor.fetchall()[0][0] > 0):
            return
        

        # get all responses for today from the db
        try:
            self.cursor.execute("select * from " + self.schema_name + "." + company + "_stock;")
        except:
            print("Could not select from schema")
        results = self.cursor.fetchall()

        # create a dictionary for the historic data for this day
        daily_stock_summary = {
            "company_name": company,
            "stock_symbol": symbol,
            "high_pt": 0,
            "low_pt": math.inf,
            "open_value": results[0][6],
            "close_value": results[len(results)-1][7],
            "average_value": 0,
            "volume": 0,
            "num_trades": 0
        }
        count = 1
        for summary in results:
            # get high_pt for the entire day
            if (summary[4] > daily_stock_summary["high_pt"]):
                daily_stock_summary["high_pt"] = summary[4]
            if (summary[5] < daily_stock_summary["low_pt"]):
                daily_stock_summary["low_pt"] = summary[5]
            daily_stock_summary["average_value"] += summary[8]
            daily_stock_summary["volume"] += summary[9]
            daily_stock_summary["num_trades"] += summary[10]
            count += 1
        # get average value for all results iterated through
        daily_stock_summary["average_value"] /= count

        # insert into the historic stock table
        self.cursor.execute("insert into historical.historic_stock_data (date, company_name, high_pt, low_pt, open_value, close_value, average_value, volume, num_trades, symbol) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (
            self.schema_name,
            daily_stock_summary["company_name"],
            daily_stock_summary["high_pt"],
            daily_stock_summary["low_pt"],
            daily_stock_summary["open_value"],
            daily_stock_summary["close_value"],
            daily_stock_summary["average_value"],
            daily_stock_summary["volume"],
            daily_stock_summary["num_trades"],
            daily_stock_summary["stock_symbol"]
        ))

        self.connect.commit
        

        # tickers is array of all stock tickers
    def create_insert_stock_data(self):
        

        # read in all credentials
        cred_file = open("./nlp_cred.txt", "r")
        cred_str = cred_file.read()
        # read in as JSON
        cred_json = json.loads(cred_str)

        # create a table for all tickers in current schema
        
        for comp_name, comp_sym in self.comp_tick.items():
            table_name = comp_name + '_stock'
            self.cursor.execute("create table if not exists " + self.schema_name + "." + table_name + "(stock_id integer, company_name varchar, stock_symbol varchar, minute varchar, high_pt decimal, low_pt decimal, open_value decimal, close_value decimal, \
             average_value decimal, volume integer, num_trades integer)")
            self.connect.commit()
            api_key = cred_json['IEX_key']
            stock_json = loader.get_half_hour_stock_data(comp_sym, api_key)
            stock_id = 0
            for entry in stock_json:
                self.cursor.execute("insert into " + self.schema_name + "." + table_name + " (stock_id, company_name, stock_symbol, minute, high_pt, low_pt, open_value, close_value, average_value, volume, num_trades) \
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
            self.connect.commit()
            self.__process_historical(comp_name, comp_sym, stock_json)
        self.connect.commit()
        self.connect.close()
