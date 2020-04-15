import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import get_watson_response from '../Utils/get_watson_response';

class Chat extends Component {
 
  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }
 
  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    // Route, post message
    get_watson_response(message.data.text).then(result => {
      console.log("Watson response:");
      // TODO: comment/remove debug utilities
      // DEBUG: Log the received data
      // console.log(result.data.output);
      console.log(result.data.output.generic);
      if(result.data.output.generic){
        result.data.output.generic.forEach(element => {
          this._sendMessage(element.text);
        });
      }
    })
  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
    console.log("SEND MESSAGE");
  }
 
  render() {
    return (
    <div className="chat-window">
      <Launcher
        agentProfile={{
          teamName: 'VestEd Assistant',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>
    )
  }
}

export default Chat;