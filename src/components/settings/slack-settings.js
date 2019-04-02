import React , { Component } from 'react'
import styled from 'styled-components'
// import axios from 'axios';
import { connect } from 'react-redux';
import { getSlackSettings, getUserData , syncSlack} from '../../actions'
import format from 'date-fns/format'

class SlackSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            refresh: false
        }
    }

    componentDidMount(){
        this.props.getSlackSettings(this.props.store.user.userData.id)
    }

    connectSlack = (e) => {
        e.preventDefault();
        // console.log('connect to slack', this.props.userData.id)
        let client_id = '465374768868.465546770546'
        let scope = 'stars:read stars:write'
        let userid = this.props.userData.id
        let redirect_uri = `${process.env.REACT_APP_BACKEND_URL}/api/slack/auth/${userid}`
        let codeRequestUrl = `https://slack.com/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${userid}`
        window.open(codeRequestUrl)
        this.setState({
            refresh: true
        })
    }

    getSlackInfo = (e) => {
        e.preventDefault()
        this.props.syncSlack()
        // if(localStorage.getItem('JWT')){
        //     const token = localStorage.getItem('JWT')
        //     const authHeader = {
        //       headers: {
        //         Authorization: token, 
        //       }
        //     }
        //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/slack/${e.target.name}`, authHeader)
        //       .then(res => {
        //       console.log(res.data)
        //     })
        //       .catch(err => {
        //       console.log("error!", err)
        //     })
        // } else {
        //     console.log("no token found.")
        // }
    }

    convertTime(unixTimeStamp){
        let time = +unixTimeStamp
        time = format(time, 'MMM Do, YYYY - hh:mm a')
        return time
    }

    clickHandler = (e) => {
        e.preventDefault();
    }

    render(){
        return(
            <SlackSettingsDiv> 
                {this.props.store.user.userData.slack
                    ?   <div style={{background: "lightgreen"}}>
                            <h3>Slack is connected!</h3>
                            {this.props.store.slack.slackSettings 
                                ?   <div>
                                        <p>
                                            <strong>Last Updated: </strong> 
                                            {this.convertTime(this.props.store.slack.slackSettings.last_updated)}
                                        </p>
                                        <p>
                                            <strong>Workplace connected: </strong> 
                                            {this.props.store.slack.slackSettings.slack_team_name}
                                        </p>
                                    </div>
                                :   null
                            }
                            <p>Rules</p>
                            <li>Check out the blue menu to the right to see your pinned and starred messages</li>
                            <li>All starred messages will show up regardless of what the channel they are in.</li>
                            <li>Any messages starred in a Private or DM channel will be in a 'Private Channel or DM' container.</li>
                            <li>Sticky will show pinned messages from channels that you have <strong>starred</strong>.</li>
                            <br></br>
                                <label>Slack will sync automatically. If things havn't synced and it has been more than a minute, click manual sync</label><button name="sync" onClick={this.getSlackInfo}>Manually Sync Slack</button>
                            {/* <div>
                                <p>team -> channels -> users -> </p>
                                <button name="team" onClick={this.getSlackInfo}>team</button>
                                <button name="channels" onClick={this.getSlackInfo}>channels</button>
                                <button name="users" onClick={this.getSlackInfo}>users</button>
                                <p>sync is combo of above 3</p>
                                <p>stars include channels so that must come before pins</p>
                                <button name="stars" onClick={this.getSlackInfo}>stars</button>
                                <p>pins cannot be channels so that comes second</p>
                                <button name="pins" onClick={this.getSlackInfo}>pins</button>
                                <p>list is what gets rendered in blue menu</p>
                                <button name="list" onClick={this.getSlackInfo}>list</button>
                            </div> */}
                        </div> 
                    :   <div>
                            <p> Sticky gives you the ability to acces slack notes that have been starred or pinned in your workplace. Click the link below to add the app to your slack workplace.</p> 
                            <a href="https://slack.com/oauth/authorize?client_id=465374768868.465546770546&scope=stars:read,pins:read,channels:read,users:read,team:read,im:read">
                                <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />    
                            </a>
                            <p>App already on workplace? You will need to give permissions to view your messages.</p>
                            <button onClick={(e) => {
                                this.connectSlack(e)
                            }}>Connect to Slack</button>
                            {this.state.refresh
                                ?   <button 
                                        name="sync" 
                                        onClick={(e) => {
                                            // this.getSlackInfo(e)
                                            this.props.getUserData()}}
                                    >
                                        Success?
                                    </button>
                                :   null}

                               
                        </div>
                }

            </SlackSettingsDiv>
        )
    }
}

const mapStateToProps = store => {
    return { store: store };
}

const mapDispatchToProps = {
    getSlackSettings,
    getUserData,
    syncSlack
}

export default connect(mapStateToProps, mapDispatchToProps)(SlackSettings)


const SlackSettingsDiv = styled.div`
    border: 1px solid red;
    background: white;
    padding: 2px;
    margin: 2px;
    margin-top: 0;
    
`