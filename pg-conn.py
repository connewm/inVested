import psycopg2

try:
    connect = psycopg2.connect(database="postgres", user="postgres", password="CapStoneRDS", 
    host="database-1.ciomlblnrvsp.us-east-2.rds.amazonaws.com", port='5432')
except:
    print("no good")

cursor = connect.cursor()
print("here")
cursor.execute("CREATE TABLE public.test_remote (col1_test int, col2_test varchar(25));")
connect.commit()