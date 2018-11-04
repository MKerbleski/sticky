import React, { Component } from 'react';
import styled from 'styled-components';
import { getUserData } from '../../actions'
import { connect } from 'react-redux';

class Settings extends Component {
    constructor(props){
      super(props);
      this.state = {
        hello: false,
      }
    }

    componentDidMount(){
      this.props.getUserData()
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

    render(props) {
      const {userData} = this.props.state
      return (
        <SettingsDiv>
              <h1>settings</h1>
              {userData ? 
                  <div>
                    <p>username: <span>{userData.username}</span></p>
                    <p>first: <span>{userData.firstname}</span></p>
                    <p>last: <span>{userData.lastname}</span></p>
                    {/* this will loop over the connect apps column in the users table eventually */}
                    <h4>Connected Apps</h4>
                    <ul>
                        {userData.slack ?
                          <li>slack -- 
                              <button onClick={this.clickHandler}>revoke access button goes here eventually </button>
                          </li> :
                          <button onClick={this.connectSlack}>Connect to Slack</button>
                        }
                    </ul>
                  </div> :
                  <h6>loading...</h6>
                } 
            </SettingsDiv>
      );
    }
}

const mapStateToProps = store => {
  return {state: store};
}

const mapDispatchToProps = {
  getUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

const SettingsDiv = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  padding: 25px;
  height: 100vh;
`;





  // pocketTokenRequest = (consumer_key, redirect_uri) => {
  //     console.log('this.pocketTokenRequest')
  //     let Header = {
  //       // 'Host': 'getpocket.com',
  //       // 'Content-Type': 'application/x-www-form-urlencoded', 
  //       // 'Access-Control-Allow-Origin': 'http://localhost:4444',
  //       // 'X-Accept': 'application/x-www-form-urlencoded'
  //     }//I dont think this is doing anything now
  //     let pocketToken = axios.post(`https://getpocket.com/v3/oauth/request?consumer_key=${consumer_key}&redirect_uri=${redirect_uri}`, Header).then(res => {
  //         console.log(res, 'res')
  //         let pocketToken = res.data
  //         pocketToken = pocketToken.slice(5);
  //         localStorage.setItem('pocketToken', pocketToken)
  //         console.log(pocketToken, 'next')
        
  //         return pocketToken
  //       }
  //     ).then(res => {
  //       console.log('second then', res)
  //       this.props.history.push('/note/1')
  //     }).then(res => {
  //       console.log('third then ', res)
  //     }).catch(err => 
  //       console.log(err.message)
  //       ) 
  //     return pocketToken
  // }

  // getPocket = async (e) => {
  //   e.preventDefault();
  //   let consumer_key = '81178-6329dec7e9395b38d4e0b3d3';
  //   let redirect_uri = 'http://www.google.com'
    
  //   let pocketToken = await this.pocketTokenRequest(consumer_key, redirect_uri)
  //   this.setState({
  //     hello: true, 
  //     pocketToken: pocketToken, 
  //   })
  //   //  localStorage.getItem('PocketToken')
  //   console.log(pocketToken)
  //   // await window.open()

  // }
