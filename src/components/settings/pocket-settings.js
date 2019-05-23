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

    convertTime(unixTimeStamp){
        let time = +unixTimeStamp*1000
        time = format(time, 'MMM Do, YYYY - hh:mma')
        return time
    }

    syncPocket = (e) => {
        e.preventDefault()
        //start spinning wheel or something... 
        console.log(this.props.store.user.userData.id)
        this.props.syncPocketList(this.props.store.user.userData.id)
    }

    clickHandler = (e) => {
        e.preventDefault();
    }

    render(){        
        return(
            <PocketSettingsDiv className="subSetting" style={{background: "lightgreen"}}> 
                {this.props.store.user.userData.pocket 
                    ?   <React.Fragment>
                            <h3>Pocket is connected!</h3>
                            <p>Your pocket saves will automatically be synced, and will be displayed in the blue menu to the right. (It will take a few minutes.)</p>
                            <p>Use the blue menu to the right to view your list and attach pocket items to your notes!</p>
                            {/* <button onClick={this.clickHandler}>Revoke access</button> */}
                            {this.props.store.pocket.fetchingPocketList 
                                ?   <Loading />
                                :   <button name="list" onClick={(e) => this.syncPocket(e)}>Refresh Notes</button>
                            }
                            {this.props.store.pocket.pocketSettings
                                ?   <div>
                                        <p><strong>Last Update: </strong>{ this.convertTime(this.props.store.pocket.pocketSettings.last_accessed)}</p>
                                        <p><strong>Connected as: </strong> {this.props.store.pocket.pocketSettings.pocket_username}</p>
                                    </div>
                                : null
                            }
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
               
                {/* what I eventually want here is a sample pocket note that the user can select what is and isn't on the note. like the title or time read..., or delete button.  */}
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
    /* border: 1px solid green; */
    /* background: white; */
    /* padding: 2px; */
    /* margin: 2px; */
    /* margin-top: 0; */
`