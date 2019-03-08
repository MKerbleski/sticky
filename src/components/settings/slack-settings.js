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
        let redirect_uri = `${process.env.REACT_APP_BACKEND_URL}/api/slack/auth/${userid}`
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
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/slack/${e.target.name}`, authHeader)
              .then(res => {
              console.log(res.data)
            })
              .catch(err => {
              console.log("error!", err)
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
                {this.state.isApiConnected 
                    ?   <div style={{background: "lightgreen"}}>
                            <h3>slack is connected!</h3>
                            <h3>should have huge button saying initialize workplace or a redux event or dispatch that triggers in on sucessful authorization</h3>
                            {/* <button name="sync" onClick={this.getSlackInfo}>Initilize</button> */}
                            <p>team -> channels -> users -> </p>
                            <button name="team" onClick={this.getSlackInfo}>team</button>
                            <button name="channels" onClick={this.getSlackInfo}>channels</button>
                            <button name="users" onClick={this.getSlackInfo}>users</button>
                            <p>sync is combo of above 3</p>
                            <button name="sync" onClick={this.getSlackInfo}>sync</button>
                            {/* <button name="revokeAccess" onClick={this.clickHandler}>revoke access button goes here eventually </button> */}
                            <p>stars include channels so that must come before pins</p>
                            <button name="stars" onClick={this.getSlackInfo}>stars</button>
                            <p>pins cannot be channels so that comes second</p>
                            <button name="pins" onClick={this.getSlackInfo}>pins</button>
                            <p>list is what gets rendered in blue menu</p>
                            <button name="list" onClick={this.getSlackInfo}>list</button>
                        </div> 
                    :   <div>
                            <p>slack is NOT connected</p>
                            <button onClick={this.connectSlack}>Connect to Slack</button>
                        </div>
                }
            </SlackSettingsDiv>
        )
    }
}

const SlackSettingsDiv = styled.div`
    border: 1px solid red;
    background: white;
    padding: 2px;
    margin: 2px;
    margin-top: 0;
`