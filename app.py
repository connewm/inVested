# app.py
import json

from flask import Flask
from flask import request, render_template, jsonify, g

import sys
import os

from retrieve_data import *
from assistant import *

vested_assistant = watson_assistant()

# Temp folder locations for development, TODO: replace locations in production (after __init__.py is created and finished)
app = Flask(__name__, static_folder="./React/vested/build/static", template_folder="./React/vested/build")

# TODO: Remove routes below, keeping them in routes.py
# base path, render according to react-generated html file
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# catch all route to keep users on react single page
@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')

@app.route("/api/get_watson_response", methods=["POST"])
def get_watson_response():
  # get the request from the POST in JSON format
  incoming = request.get_json()

  # extract the message from the JSON
  message = incoming.get('message')

  # call Watson Assistant API (message)
  response = vested_assistant.get_watson_response(message)

  # return Watson response
  return (response)

# route to fetch company data from the API
@app.route("/api/get_company_data", methods=["POST"])
def get_company_data():
    # get the request from the POST in JSON format
    incoming = request.get_json()

    # extract the company from the JSON
    comp = incoming.get('company')

    # create data retrieval object for company
    google = retrieve_data(comp, 'apr0120', 'apr0720')

    # get data for company
    data = google.get_company_data()

    # serialize obj to JSON
    data = json.loads(data)

    return(jsonify(data))

print('Starting Flask!')

app.debug=True
app.run()

# # for local dev ONLY
# if __name__ == '__main__':
#     app.run()
