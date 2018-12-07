import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios';

export default class SlackSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            isApiConnected: this.props.name
        }
    }

    componentDidMount(){
        if(this.props.userData.slack){
            this.setState({
                isApiConnected: true,
            })
        }
    }

    connectSlack = (e) => {
        e.preventDefault();
        // console.log('connect to slack')
        let client_id = '465374768868.465546770546'
        let scope = 'stars:read stars:write'
        let userid = this.props.userData.id
        let redirect_uri = `http://localhost:3333/api/slack/auth/${userid}`
        let codeRequestUrl = `https://slack.com/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${userid}`
        window.open(codeRequestUrl)
        //every second check and see if the user thing is true
    }

    getSlackInfo = (e) => {
        e.preventDefault()
        console.log("getSlackInfo")
        if(localStorage.getItem('JWT')){
            const token = localStorage.getItem('JWT')
            const authHeader = {
              headers: {
                Authorization: token, 
              }
            }
            axios.get(`http://localhost:3333/api/slack/${e.target.name}`, authHeader)
              .then(res => {
              console.log(res.data)
            })
              .catch(err => {
              console.log("error!")
            })
          } else {
            console.log("no token found.")
          }
    }

    clickHandler = (e) => {
        e.preventDefault();
        console.log(e.target.name)
    }

    render(){
        return(
            <SlackSettingsDiv> 
                <h5>Slack</h5>
                {this.state.isApiConnected ?
                     <div>
                        <h3>slack is connected!</h3>
                        <button name="revokeAccess" onClick={this.clickHandler}>revoke access button goes here eventually </button>
                        <button name="pins" onClick={this.getSlackInfo}>Console.log list of pins</button>
                        <button name="channels" onClick={this.getSlackInfo}>Console.log list of channels</button>
                        <button name="users" onClick={this.getSlackInfo}>Console.log list of users</button>
                    </div> :
                    <div>
                        <p>slack is NOT connected</p><button onClick={this.connectSlack}>Connect to Slack</button>
                    </div>}
            </SlackSettingsDiv>
        )
    }
}

const SlackSettingsDiv = styled.div`
    border: 1px solid red;
    padding: 2px;
`