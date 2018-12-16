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
        // console.log('connect to pocket')
        let userid = this.props.userData.id
        let redirect_uri = `http://localhost:3333/api/pocket/incoming/${userid}`
        axios.get(`http://localhost:3333/api/pocket/auth/${userid}`).then(res => {
            // console.log("front end res", res)
            if(res.data){
                window.open(`https://getpocket.com/auth/authorize?request_token=${res.data}&redirect_uri=${redirect_uri}`)
            } else {
                console.log("did not get code back")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getPocketInfo = (e) => {
        e.preventDefault()
        console.log("getPocketInfo")
        if(localStorage.getItem('JWT')){
            const token = localStorage.getItem('JWT')
            const authHeader = {
              headers: {
                Authorization: token, 
              }
            }
            axios.get(`http://localhost:3333/api/pocket/${e.target.name}`, authHeader)
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
            <PocketSettingsDiv> 
                {this.state.isApiConnected ?
                    <div style={{background: "lightgreen"}}>
                        <p>pocket is connected </p><button onClick={this.clickHandler}>revoke access button goes here eventually </button>
                        <button name="notes" onClick={this.getPocketInfo}>notes</button>
                        {/* <button name="stars" onClick={this.getSlackInfo}>stars</button> */}
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