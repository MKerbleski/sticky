import React , { Component } from 'react'
import styled from 'styled-components'
import { availibleApis } from '../../helpers/availbleApis'
import  SlackSettings  from './slack-settings'
import  PocketSettings  from './pocket-settings'

export default class ApiSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedApp: null,
        }
    }

    clickHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectedApp: e.target.name
        })
    }

    whichApp = () => {
        if(this.state.selectedApp == "slack"){
            return <SlackSettings

                    />
        } else if(this.state.selectedApp == "pocket"){
            return <PocketSettings />
        } else {
            return null;
        }
    }

    render(){
        console.log(this.props)
        return(
            <ApiSettingsDiv> 
                <div className="settingApiTabs">
                    {availibleApis.map(api => {
                        return (
                            <button 
                                key={api.name}
                                name={api.name} 
                                onClick={this.clickHandler}
                                className="settingApiTab">
                                <h5>{api.name}</h5>
                                <img  className="menu-item" src={api.thumbnail} />
                            </button>
                        )
                    })}
                </div>
                <div className="settingApiDetails">
                    {this.state.selectedApp != null ? (this.whichApp()) : null}    
                </div>               
            </ApiSettingsDiv>
        )
    }
}

const ApiSettingsDiv = styled.div`
    border: 1px solid red;
    .settingApiTabs{
        border: 1px solid blue;
        background: lightgray;
        display: flex;
        flex-direction: row;
        .settingApiTab{
            margin: 2px;
            border: 2px solid green;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover{
                background: white;
            }
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
      }
    }
    
`