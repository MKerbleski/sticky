import React , { Component } from 'react'
import styled from 'styled-components'

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
        let userid = localStorage.getItem('userId')
        let redirect_uri = `http://localhost:3333/api/slack/auth/${userid}`
        let codeRequestUrl = `https://slack.com/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${userid}`
        window.open(codeRequestUrl)
        //every second check and see if the user thing is true
    }

    render(){
        return(
            <SlackSettingsDiv> 
                <h5>Slack!</h5>
                {this.state.isApiConnected ?
                     <div>
                        <p>slack is connected </p><button onClick={this.clickHandler}>revoke access button goes here eventually </button>
                    </div> :
                    <div>
                        <p>slack is NOT connected</p><button onClick={this.connectSlack}>Connect to Slack</button>
                    </div>}
                 {/* <ul>
                        <li>slack -- 
                            {this.props.state.connectedApis.includes('slack') ?
                                  
                              :
                             
                            }
                        </li> 
                        <li>pocket -- 
                            {this.props.userData.connected_apis == 'pocket' ?
                                  <button onClick={this.clickHandler}>revoke access button goes here eventually </button>
                              :
                              <button onClick={this.connectSlack}>Connect to Pocket</button>
                            }
                        </li> 
                    </ul> */}
            </SlackSettingsDiv>
        )
    }
}

const SlackSettingsDiv = styled.div`
    border: 1px solid red;
`