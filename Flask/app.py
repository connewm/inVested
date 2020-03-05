# app.py
import json
from flask import Flask, Response, current_app, send_from_directory
app = Flask(__name__, static_url_path="", static_folder="static")

@app.route("/about")
def serve_about():
    return app.send_static_file('About/index.html')

@app.route('/graph')
def serve_graph():
    return app.send_static_file("Graph/index.html")

# Sample for data exchange between DB and frontend 
@app.route('/stock/<id>', methods=["GET"])
def stock(id):
    resp_dict = {"stock_name": "Amazon", "stock_id": "AMZN"}
    response = Response(json.dumps(resp_dict), 200)
    return response

# Sample for data exchange between DB and frontend 
@app.route('/stock/<id>/prices', methods=["GET"])
def price_history(id):
    resp_dict = {"dates": ["3/2", "3/3", "3/4"], "prices": ["1897.00", "1983.37", "1949.69"]}
    response = Response(json.dumps(resp_dict), 200)
    return response

# for local dev ONLY
if __name__ == '__main__':
    app.run()