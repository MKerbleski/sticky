import React , { Component } from 'react'
import styled from 'styled-components'
import { availibleApis } from '../../helpers/availbleApis'

export default class ApiSettings extends Component {
    constructor(props){
        super(props)
        this.state = {

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

    clickHandler = (e) => {
        e.preventDefault();
        console.log('but it doesnt do nothing right now')
      }

    render(){
        console.log(availibleApis)
        return(
            <ApiSettingsDiv> 
                <h1>Api Settings app</h1>
                <div>
                    <div className="settingApiTabs">
                        {availibleApis.map(api => {
                            return (
                                <div>
                                    <h5>{api.name}</h5>
                                    <img className="menu-item" src={api.thumbnail} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <ul>
                        <li>slack -- 
                            {this.props.userData.connected_apis == 'slack' ?
                                  <button onClick={this.clickHandler}>revoke access button goes here eventually </button>
                              :
                              <button onClick={this.connectSlack}>Connect to Slack</button>
                            }
                        </li> 
                        <li>pocket -- 
                            {this.props.userData.connected_apis == 'pocket' ?
                                  <button onClick={this.clickHandler}>revoke access button goes here eventually </button>
                              :
                              <button onClick={this.connectSlack}>Connect to Pocket</button>
                            }
                        </li> 
                    </ul>
            </ApiSettingsDiv>
        )
    }
}

const ApiSettingsDiv = styled.div`
    border: 1px solid red;
    .menu-item{
          text-align: center;
          text-decoration: none;
          color: black;
          font-weight: bold;
          font-size: 35px;
          max-width: 30px;
          overflow: hidden;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
      }
`