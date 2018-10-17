import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { flex } from '../../styles/styl-utils.js'


export default class Header extends Component{
    render(props){
        return(
            <HeaderDiv>
                    <h1 className="headerTitle">Stic.ky</h1>
                    {localStorage.getItem('username') ?
                        <div className="linkss">
                            <h3>{` Hello ${localStorage.getItem('username')},`}</h3>
                            <div className="headerLink" onClick={this.props.logout} >Logout</div> 
                        </div> :

                        <div className="linkss">
                            <Link className="headerLink" to="/welcome/login" >Login</Link>
                            <Link className="headerLink" to="/welcome/register" >Register</Link>
                        </div>
                    }
            </HeaderDiv>
        )
    }
}

const HeaderDiv = styled.div`
    ${'' /* border: 1px solid red; */}
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 0 auto;
    padding: 0;
    background-color: rgba(0,0,0,.25);
    .headerTitle{
        ${'' /* border: 1px solid green; */}
        color: white;
        -webkit-text-stroke-width: .1px;
        -webkit-text-stroke-color: white;
        ${'' /* width: 80%; */}
        font-size: 35px;
        margin: 0;
        margin-left: 20px;
        
    }
    .linkss{
        ${'' /* border: 1px solid green; */}
        ${'' /* width: 100px; */}
        height: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 0;
        .headerLink{
            ${'' /* border: 1px solid blue; */}
            ${'' /* padding: 15px; */}
            height: 100%;
            width: 75px;
            color: white;
            ${'' /* background-color: rgba(0,0,0,.1); */}
            text-decoration: none;
            ${flex()}
            :hover{
                background-color: rgba(0,0,0,.3);
            }
        }
    }

`;