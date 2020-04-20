import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Launcher} from 'react-chat-window'
import get_watson_response from '../Utils/get_watson_response';
import doginvest from './img/doginvest.jpg';
import {Parallax,Background} from 'react-parallax';
import {HeroComponent} from './HeroComponent/HeroComponent'
import {FeaturesComponent} from './FeaturesComponent/FeaturesComponent'
import {CallToActionComponent} from './CallToActionComponent/CallToActionComponent'
import {TeamComponent} from './TeamComponent/TeamComponent'
import {FooterComponent} from './FooterComponent/FooterComponent'


/**
 * Component: Home
 * Description: Component Home will display the landing page for the vestEd website.
 * Contents:
 * - Text descriptions of the site's functionality
 * - Abbreviated "About" section
 * - Appropriate in-content links to individual pages
 */
class Home extends Component{
    constructor(props){
        super(props);
        this.state={};
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
      }
    
      componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }
    
      handleScroll(event){
        const domNode = ReactDOM.findDOMNode(this.navEl);
        const nbs = window.pageYOffset>100 ? "navbar-shrink" : "";
        this.setState({navBarShrink:nbs});
      }

      render() {
        
        return (
        <div className = "home-parent">
            <div className = "HeroComponent">
                <HeroComponent />
            </div>
            <div className = "FeaturesComponent" >
                <FeaturesComponent />
            </div>    
            <div className = "CallToActionComponent">
                <CallToActionComponent />
            </div>
            <div className = "FooterComponent" >
                <TeamComponent/>
                <FooterComponent />
            </div>
        </div>
        );
      }

}

export default Home;