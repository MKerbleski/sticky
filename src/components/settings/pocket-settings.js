import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { getPocketSettings } from '../../actions'
import { connect } from 'react-redux';
import format from 'date-fns/format'

class PocketSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            isApiConnected: false
        }
    }
    
    componentDidMount(){
        this.props.getPocketSettings(this.props.store.user.userData.id)
    }

    //This will only ever be called here
    connectPocket = (e) => {
        e.preventDefault();
        let userid = this.props.userData.id
        let redirect_uri = `${process.env.REACT_APP_BACKEND_URL}/api/pocket/incoming/${userid}`
        // let redirect_uri = `${process.env.REACT_APP_FRONTEND_URL}/${localStorage.getItem('username')}/settings`
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/auth/${userid}`).then(res => {
            if(res.data){
                window.open(`https://getpocket.com/auth/authorize?request_token=${res.data}&redirect_uri=${redirect_uri}`)
            } else {
                console.log("did not get code back")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    convertTime(unixTimeStamp){
        let time = +unixTimeStamp*1000
        time = format(time, 'MMM Do, YYYY - hh:mma')
        return time
    }

    getPocketInfo = (e) => {
        e.preventDefault()
        //start spinning wheel or something... 
        // if(localStorage.getItem('JWT')){
        //     const token = localStorage.getItem('JWT')
        //     const authHeader = {
        //         headers: {
        //             Authorization: token, 
        //         }
        //     }
        //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/${e.target.name}`, authHeader).then(res => {
        //         //stop spinning wheel here...
        //         console.log(res.data)
        //     }).catch(err => {
        //         console.log("error!")
        //     })
        // } else {
        //     console.log("no token found.")
        // }
    }

    clickHandler = (e) => {
        e.preventDefault();
    }

    render(){ 
        console.log(this.props)
        //need a status button that says saving everything to server while it is initializing
        
        return(
            <PocketSettingsDiv> 
                {this.props.store.user.userData.pocket 
                    ?   <div>
                            <p style={{background: "lightgreen"}}>Pocket is connected!</p>
                            <p>Use the blue menu to the right to view your list and attach your notes!</p>
                            {/* <button onClick={this.clickHandler}>Revoke access</button>
                            <button name="list" onClick={this.getPocketInfo}>Refresh Notes</button> */}
                            {this.props.store.pocket.pocketSettings
                                ?   <div>
                                        <p>Pocket List last accessed at: { this.convertTime(this.props.store.pocket.pocketSettings.last_accessed)}</p>
                                        <p>Connected as: {this.props.store.pocket.pocketSettings.pocket_username}</p>
                                    </div>
                                : null
                            }
                        </div> 
                    :   <div>
                            <p>pocket is NOT connected</p>
                            <button onClick={this.connectPocket}>Connect to Pocket</button>
                        </div>
                }

                {/* what I want here is a sample pocket note that the user can select what is and isn't on the note. like the title or time read... */}
            </PocketSettingsDiv>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    getPocketSettings,
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketSettings)

const PocketSettingsDiv = styled.div`
    border: 1px solid green;
    background: white;
    padding: 2px;
    margin: 2px;
    margin-top: 0;
`