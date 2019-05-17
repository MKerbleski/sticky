import React , { Component } from 'react'
import styled from 'styled-components'

import { 
    AAA
} from '../../helpers/availbleApis'

import { 
    SlackSettings,
    PocketSettings
} from '../settings'

import { 
    border
} from '../../styles'

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

    renderSelectedApp = (app) => {
        switch(app){
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
                {AAA.map(api => {
                    return (
                        <div className="apiSettings">
                            <div className="apiSettingsTitle">
                                <h4>{api.title}</h4>
                                <img 
                                    alt={api.alt} 
                                    className="menu-item" 
                                    src={api.icon} 
                                />
                            </div>
                            <div className="apiSettingsDetails">
                                {this.renderSelectedApp(api.name)}
                            </div>
                        </div>
                    )
                })}
            </ApiSettingsDiv>
        )
    }
}

const ApiSettingsDiv = styled.div`
    border: 1px solid black;
    padding: 10px;
    background: lightgray;
    width: 100%;
    .apiSettings{
        ${border()}
        width: 100%;
        .apiSettingsTitle{
            ${border()}
            /* margin: 2px; */
            margin-bottom: 0;
            /* border: 2px solid green; */
            width: 100%;
            display: flex;
            /* flex-direction: column; */
            padding: 5px;
            border: 1px solid black;
            justify-content: flex-start;
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
        .apiSettingsDetails{
            ${border()}
            width: 100%;
            box-sizing: border-box;
            border: 1px solid black;
            h3{
                margin-top: 0;
            }
        }
    }
    
`