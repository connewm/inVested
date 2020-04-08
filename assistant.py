import configparser
import json
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

class watson_assistant:
  def __init__ (self):
    # read Watson Assistant data from config file
    self.config = configparser.ConfigParser()
    self.config.read('watson_config.ini')

    self.authenticator = IAMAuthenticator(str(self.config['watson']['apikey']))
    self.assistant = AssistantV2(version=str(self.config['watson']['version']), authenticator=self.authenticator)
    self.assistant.set_service_url('https://api.us-south.assistant.watson.cloud.ibm.com/')
    self.assistant_id = str(self.config['watson']['assistant_id'])
    self.session_id  = self.assistant.create_session(assistant_id=self.assistant_id).get_result()['session_id']

  def get_watson_response(self, message):
    response = self.assistant.message(assistant_id=self.assistant_id, session_id=self.session_id,
        input={
            'message_type': 'text',
            'text': message
        }
    ).get_result()

    return response

#authenticator = IAMAuthenticator('CYb3yvcTH_ocW0Yxx1u4W95Y8wZLbY3Kzn3j7NAy45nd')

#assistant = AssistantV2(
#    version='2020-04-01',
#    authenticator=authenticator
#)

#assistant.set_service_url('https://api.us-south.assistant.watson.cloud.ibm.com/')
#assist_id='3cd99d9c-369e-45ce-8d66-ac0756f5cc74'
#
#session_id  = assistant.create_session(assistant_id=assist_id).get_result()['session_id']

#response = assistant.message(assistant_id='3cd99d9c-369e-45ce-8d66-ac0756f5cc74', session_id=str(session_id),
#    input={
#        'message_type': 'text',
#        'text': 'hello'
#    }
#).get_result()

#print(json.dumps(response, indent=2))

# TEST WATSON ASSISTANT
# assistant = watson_assistant()
# assistant.get_watson_response("hello")