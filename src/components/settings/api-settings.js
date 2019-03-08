import React , { Component } from 'react'
import styled from 'styled-components'
import { AAA } from '../../helpers/availbleApis'
import { 
    SlackSettings,
    PocketSettings
} from '../settings'

export default class ApiSettings extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedApp: "slack",
        }
    }

    clickHandler = (e) => {
        e.preventDefault();
        this.setState({
            selectedApp: e.target.name
        })
    }

    renderSelectedApp = () => {
        switch(this.state.selectedApp){
            case "slack":
                return <SlackSettings userData={this.props.userData} />
            case "pocket":
                return <PocketSettings userData={this.props.userData} />
            default:
                return null;
        }
    }

    render(){
        return(
            <ApiSettingsDiv> 
                <div className="settingApiTabs">
                    {AAA.map(api => {
                        return (
                            <button 
                                style={{background: this.state.selectedApp === api.name ? "white" : "gray"}}
                                key={api.name}
                                name={api.name} 
                                onClick={this.clickHandler}
                                className="settingApiTab">
                                <h4>{api.title}</h4>
                                <img alt={api.alt} className="menu-item" src={api.icon} />
                            </button>
                        )
                    })}
                </div>
                <div className="settingApiDetails">
                    {this.state.selectedApp != null 
                        ?   (this.renderSelectedApp()) 
                        :   null}    
                </div>               
            </ApiSettingsDiv>
        )
    }
}

const ApiSettingsDiv = styled.div`
    border: 1px solid red;
    padding: 10px;
    background: lightgray;
    .settingApiTabs{
        border: 1px solid blue;
        margin: 2px;
        margin-bottom: 0;
        background: lightgray;
        display: flex;
        flex-direction: row;
        .settingApiTab{
            /* margin: 2px; */
            margin-bottom: 0;
            /* border: 2px solid green; */
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