import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { flex } from '../../styles/styl-utils.js'


export default class Header extends Component{
    render(props){
        return(
            <HeaderDiv>
                    <h1>Stic.ky</h1>
                    <div className="links">
                        <Link to="/welcome/login" >Login</Link>
                        <Link to="/welcome/register" >Register</Link>
                    </div>
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
    h1{
        width: 80%;
    }
    .links{
        ${'' /* border: 1px solid red; */}
        width: 50px;
    }

`;