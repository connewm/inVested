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

# TEST WATSON ASSISTANT
# assistant = watson_assistant()
# assistant.get_watson_response("hello")