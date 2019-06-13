import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { connect } from 'react-redux';
import format from 'date-fns/format'

import { 
    Loading 
} from '../loading'

import { 
    getPocketSettings, 
    getUserData, 
    syncPocketList 
} from '../../actions'

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

        let userid = this.props.store.user.userData.id
        let redirect_uri = `${process.env.REACT_APP_BACKEND_URL}/api/pocket/incoming/${userid}`
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/pocket/auth/${userid}`).then(res => {

            if(res.data){
                window.open(`https://getpocket.com/auth/authorize?request_token=${res.data}&redirect_uri=${redirect_uri}`)
                this.setState({
                    refresh: true
                })
                this.askDb()
                // this.props.getUserData(); 
                // this.props.getPocketSettings(this.props.store.user.userData.id)
                
            } else {
                console.log("did not get code back")
                this.setState({
                    error: true
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.store.user.userData.pocket !== this.props.store.user.userData.pocket){

    //     }
    // }

    // checkForSucess(){
    //     let timeout = 0;
    //     while(this.props.store.user.userData.pocket === false || timeout < 20){
    //         console.log('while loop', timeout)
    //         setTimeout(() => {
    //             timeout++
    //             this.props.getPocketSettings(this.props.store.user.userData.id)
    //         }, 1000)
    //     }
    // }

    convertTime(unixTimeStamp){
        let time = +unixTimeStamp*1000
        time = format(time, 'MMM Do, YYYY - hh:mma')
        return time
    }

    // syncPocket = (e) => {
    //     e.preventDefault()
    //     //start spinning wheel or something...
    //     // console.log(this.props.store.user.userData.id)
    // }
    
    clickHandler = (e) => {
        e.preventDefault();
    }
    
    askDb = () =>{
        let timeout = 0
        if(this.props.store.user.userData.pocket || timeout === 20){
            console.log("pocket connected")
            // this.syncPocket()
            this.props.syncPocketList(this.props.store.user.userData.id)
            this.props.getPocketSettings(this.props.store.user.userData.id)
        } else {
            console.log("pocket NOT connected")
            setTimeout(() => {
                this.props.getUserData(); 
                this.askDb()
                timeout++
            }, 2000)
        }
    }

    render(){
        // this.askDb()
        const isPocketConnected = this.props.store.user.userData.pocket 
        return(
            <PocketSettingsDiv className="subSetting" style={{background: `${isPocketConnected ? 'lightgreen' : 'white'}`}}> 
                {isPocketConnected
                    ?   <React.Fragment>
                            <h3>Pocket is connected!</h3>
                            <p>Your pocket saves will automatically be synced, and will be displayed in the blue menu to the right. (It will take a few minutes.)</p>
                            <p>Use the blue menu to the right to view your list and attach pocket items to your notes!</p>
                            {/* <button onClick={this.clickHandler}>Revoke access</button> */}
                            {/* {this.props.store.pocket.fetchingPocketList 
                                ?   <Loading />
                                :   null
                            } */}
                            {this.props.store.pocket.pocketSettings
                                ?   <div>
                                        {this.props.store.user.userData.pocket_initial_sync ?<div>

                                        <p><strong>Last Update: </strong>{ this.convertTime(this.props.store.pocket.pocketSettings.last_accessed)}</p>
                                        <p><strong>Connected as: </strong> {this.props.store.pocket.pocketSettings.pocket_username}</p>
                                        <p><strong>Initial Sync: </strong> {this.props.store.pocket.syncInProgress ? 'Syncing' : 'synced'}</p>
                                        {!this.props.store.pocket.syncInProgress &&this.props.store.user.userData.pocket ?<button onClick={() => this.props.syncPocketList(this.props.store.user.userData.id)}>Sync</button> : null}
                                        </div>
                                        : null}
                                        {this.props.store.pocket.syncInProgress ? <div><Loading /><h1>Syncing</h1></div> : null}
                                    </div>
                                : null
                            }
                            {/* what I eventually want here is a sample pocket note that the user can select what is and isn't on the note. like the title or time read..., or delete button.  */}
                        </React.Fragment>
                    :   <React.Fragment>
                            <p>pocket is NOT connected</p>
                            <button onClick={this.connectPocket}>Connect to Pocket</button>
                            {this.state.err
                                ?   <p>error connectiong, please try again later</p>
                                :   null
                            }
                            {this.state.refresh
                                ?   <button 
                                        name="sync"
                                        onClick={(e) => {
                                            this.props.getUserData(); 
                                            this.props.getPocketSettings(this.props.store.user.userData.id)
                                            // this.syncPocket(e);
                                        }}
                                    >
                                    Success?
                                    </button>
                                :   null
                            }
                        </React.Fragment>
                }

            </PocketSettingsDiv>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    getPocketSettings,
    getUserData,
    syncPocketList
}

export default connect(mapStateToProps, mapDispatchToProps)(PocketSettings)

const PocketSettingsDiv = styled.div`
    border: 1px solid black;
    /* background: white; */
    /* padding: 2px; */
    /* margin: 2px; */
    /* margin-top: 0; */
`