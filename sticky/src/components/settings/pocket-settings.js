import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios';

export default class PocketSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            isApiConnected: false
        }
    }
    
    componentDidMount(){
        if(this.props.userData.pocket){
            this.setState({
                isApiConnected: true,
            })
        }
    }

    connectPocket = (e) => {
        e.preventDefault();
        console.log('connect to pocket')
        let userid = this.props.userData.id
        let redirect_uri = `http://localhost:3333/api/pocket/incoming/${userid}`
        axios.get(`http://localhost:3333/api/pocket/auth/${userid}`).then(res => {
            console.log("front end res", res)
            if(res.data){
                window.open(`https://getpocket.com/auth/authorize?request_token=${res.data}&redirect_uri=${redirect_uri}`)
            } else {
                console.log("did not get code back")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render(){ 
        return(
            <PocketSettingsDiv> 
                <h5>Pocket!</h5>
                {this.state.isApiConnected ?
                    <div>
                        <p>pocket is connected </p><button onClick={this.clickHandler}>revoke access button goes here eventually </button>
                    </div> : 
                    <div>
                        <p>pocket is NOT connected</p><button onClick={this.connectPocket}>Connect to Pocket</button>
                    </div>}
            </PocketSettingsDiv>
        )
    }
}

const PocketSettingsDiv = styled.div`
    border: 1px solid red;
    padding: 2px;
`