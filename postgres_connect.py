
def connect():
    try:
        connect = psycopg2.connect(database="postgres", user="postgres", password="CapStoneRDS", 
        host="database-1.ciomlblnrvsp.us-east-2.rds.amazonaws.com", port='5432')
        return connect
    except:
        print("no good")