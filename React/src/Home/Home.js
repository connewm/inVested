import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import get_watson_response from '../Utils/get_watson_response';

/**
 * Component: Home
 * Description: Component Home will display the landing page for the vestEd website.
 * Contents:
 * - Text descriptions of the site's functionality
 * - Abbreviated "About" section
 * - Appropriate in-content links to individual pages
 */

class Home extends Component {
  constructor() {
    super();
    this.state = {
      messageList: []
    };
  }
  render(){
    return(
      <div className="content">
        <p>Welcome to the VestEd home page.  TODO: fill in with descriptive panels about our features and inline links.</p>
      </div>
    );
  }
}

export default Home;