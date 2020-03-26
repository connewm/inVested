# loads the stock data and filters it down, returning one entry per half hour

import urllib.request
import json

def get_half_hour_stock_data(ticker, api_token, keyword="intraday-prices"):
    contents = urllib.request.urlopen(f"https://cloud.iexapis.com/stable/stock/{ticker}/{keyword}?token={api_token}")

    response_body = contents.read().decode('utf-8')
    response_format = json.loads(response_body)

    # cycle through formatted response and pull every thrirty entries since they are minute by minute
    count = 0
    responses_to_store = []
    for i in range(0, len(response_format)):
        if ((count % 30) == 0):
            if (response_format[i]["high"] is not None):
                responses_to_store.append(response_format[i])
            elif (i < len(response_format)-1):
                shift_by = 1
                while(((i+shift_by) < (len(response_format)-1)) and (response_format[i+shift_by]["high"] is None)):
                    shift_by += 1
                    print("here")
                    print(response_format[i+shift_by])
                responses_to_store.append(response_format[i+shift_by])
        count += 1
    return responses_to_store