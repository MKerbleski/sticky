import React , { Component } from 'react'
import styled from 'styled-components'

export default class AboutPage extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <AboutPageDiv> 
                <h2>About Page</h2>
                <h4>This is Sticky's about page!</h4>
                <p>lambda school link</p>
                <a href="http://fbuy.me/mi5Gf">Lambda School</a>
                <p> Sticky gives you the ability to access slack notes that have been starred or pinned in your workplace. Click the link below to add the app to your slack workplace.</p>
                <a href="https://slack.com/oauth/authorize?client_id=465374768868.465546770546&scope=stars:read,pins:read,channels:read,users:read,team:read,im:read">
                    <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />    
                </a>
            </AboutPageDiv>
        )
    }
}

const AboutPageDiv = styled.div`
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 100%;
`