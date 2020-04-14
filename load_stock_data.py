# loads the stock data and filters it down, returning one entry per half hour

import urllib.request
import json
import ssl
import math

def get_half_hour_stock_data(ticker, api_token, keyword="intraday-prices"):
    context = ssl._create_unverified_context()
    contents = urllib.request.urlopen(f"https://cloud.iexapis.com/stable/stock/{ticker}/{keyword}?token={api_token}", context = context)

    response_body = contents.read().decode('utf-8')
    response_format = json.loads(response_body)

    # cycle through formatted response and pull every thrirty entries since they are minute by minute
    # instead of single data point we want summary data for each half hour
    # this means we have to hand construct the JSON responses to be sent back to the
    # the db queryer
    count = 0
    number_entries_in_interval = 1
    responses_to_store = []
    summary_response = {'high':0, 'low':math.inf, 'average': 0, 'volume': 0, 'numberOfTrades': 0}
    # boolean determining if new open_value should be stored
    needs_next_open_val = True
    for i in range(0, len(response_format)):
        # logic for setting high point in this 30 minute interval
        if ((response_format[i]['high'] is not None) and summary_response['high'] < response_format[i]['high']):
            summary_response['high'] = response_format[i]['high']
        # logic for setting the low in this 30 minute interval
        if ((response_format[i]['low'] is not None) and summary_response['low'] > response_format[i]['low']):
            summary_response['low'] = response_format[i]['low']
        # logic for setting the open value (only set on the first object of the interval)
        if (needs_next_open_val and (response_format[i]['open'] is not None)):
            summary_response['open'] = response_format[i]['open']
            needs_next_open_val = False
        # the close value can be set in the if blocks below that end the interval
        # add to the average value. before storing the interval data point we'll divide avg by variable count
        if (response_format[i]['average'] is not None):
            summary_response['average'] += response_format[i]['average']
        # add to the total volume for this interval
        if (response_format[i]['volume'] is not None):
            summary_response['volume'] += response_format[i]['volume']
        # add to total number of trades for this interval
        if (response_format[i]['numberOfTrades'] is not None):
            summary_response['numberOfTrades'] += response_format[i]['numberOfTrades']

        if (((count % 30) == 0) or (i == len(response_format)-1)):
            if (response_format[i]["high"] is not None):
                # set the close value before storing
                summary_response['close'] = response_format[i]['close']
                # get the average for the interval
                summary_response['average'] /= number_entries_in_interval
                # set the minute
                summary_response['label'] = response_format[i]['label']
                responses_to_store.append(summary_response)

                # reset the summary stats for the next interval
                summary_response = {'high':0, 'low':math.inf, 'average': 0, 'volume': 0, 'numberOfTrades': 0}
                needs_next_open_val = True
                number_entries_in_interval = 0
            elif (i < len(response_format)-1):
                shift_by = 1
                while(((i+shift_by) < (len(response_format)-1)) and (response_format[i+shift_by]["high"] is None)):
                    shift_by += 1
                    print("here")
                    print(response_format[i+shift_by])
                # set the close value before storing
                summary_response['close'] = response_format[i+shift_by]['close']
                # get the average for the interval
                summary_response['average'] /= number_entries_in_interval
                # set the minute
                summary_response['label'] = response_format[i+shift_by]['label']
                responses_to_store.append(summary_response)

                 # reset the summary stats for the next interval
                summary_response['high'] = 0
                summary_response['low'] = math.inf
                needs_next_open_val = True
                summary_response['average'] = 0
                summary_response['volume'] = 0
                summary_response['numberOfTrades'] = 0
                number_entries_in_interval = 0
        count += 1
        number_entries_in_interval += 1
    return responses_to_store