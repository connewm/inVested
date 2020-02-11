# app.py
import json
from flask import Flask, Response
app = Flask(__name__)

@app.route("/")
def index():
    return "Hello world..."

@app.route('/stock', methods=["GET"])
def user():
    resp_dict = {"stock_name": "Amazon", "stock_id": "AMZN"}
    response = Response(json.dumps(resp_dict), 200)
    return response

# for local dev ONLY
if __name__ == '__main__':
    app.run()