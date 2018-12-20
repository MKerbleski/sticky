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
        console.log('connect to slack', this.props.userData.id)
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
    }

    render(){
        return(
            <SlackSettingsDiv> 
                {this.state.isApiConnected ?
                     <div style={{background: "lightgreen"}}>
                        <h3>slack is connected!</h3>
                        <h3>should have huge button saying initialize workplace or a redux event or dispatch that triggers in on sucessful authorization</h3>
                        <button name="revokeAccess" onClick={this.clickHandler}>revoke access button goes here eventually </button>
                        <button name="pins" onClick={this.getSlackInfo}>pins</button>
                        <button name="channels" onClick={this.getSlackInfo}>channels</button>
                        <button name="users" onClick={this.getSlackInfo}>users</button>
                        <button name="stars" onClick={this.getSlackInfo}>stars</button>
                        <button name="team" onClick={this.getSlackInfo}>team</button>
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