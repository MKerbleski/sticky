import React , { Component } from 'react'
import styled from 'styled-components'

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
`