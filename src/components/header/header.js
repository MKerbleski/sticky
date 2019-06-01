import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import { 
    logout
} from '../../actions'

import { 
    flexCenter,
    border,
    mainThemePrimary

} from '../../styles'

class Header extends Component{

    logout = (e) => {
        e.preventDefault();
        this.props.logout();
        this.props.redirect('/welcome')
    }
    
    render(){
        return(
            <HeaderDiv>
                <Link 
                    className="headerTitle-link"
                    to={localStorage.getItem('JWT') 
                        ?   `/${localStorage.getItem('username')}` 
                        :   '/welcome'} 
                >
                    <h1 className="headerTitle">Stic.ky</h1>
                </Link>
                {localStorage.getItem('username') && this.props.store.notes.status 
                    ? this.props.store.notes.status 
                    : this.props.store.user.status 
                        ? this.props.store.user.status
                        : null}
                {localStorage.getItem('username') 
                    ?   <div className="headerLinks">
                            <h3>
                                {`Hello ${localStorage.getItem('username')},`}
                            </h3>
                            <div className="headerLink" onClick={this.logout} >
                                Logout
                            </div> 
                        </div> 
                    :   <div className="headerLinks">
                            <Link className="headerLink" to="/welcome/login" >
                                Login
                            </Link>
                            <Link className="headerLink" to="/welcome/register">
                                Register
                            </Link>
                        </div>
                }
            </HeaderDiv>
        )
    }
}

const mapStateToProps = store => {
    return { store: store };
}
  
const mapDispatchToProps = {
    logout
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Header)

const HeaderDiv = styled.div`
    /* ${border()} */
    background-color: ${mainThemePrimary};
    ${flexCenter()}
    justify-content: space-between;
    width: 100%;
    padding: 0;
    .headerTitle-link {
        text-decoration: none;
        :active {
            text-decoration: none;
        }
        :visited {
            color: black;
            text-decoration: none;
        }
        .headerTitle {
            /* ${border()} */
            color: black;
            -webkit-text-stroke-width: .1px;
            -webkit-text-stroke-color: black;
            font-size: 35px;
            margin: 0;
            margin-left: 20px;
            text-decoration: none;
        }
    }
    p {
        margin: 0
    }
    .headerLinks {
        ${flexCenter()}
        /* ${border()} */
        height: 30px;
        margin: 0;
        .headerLink {
            ${flexCenter()}
            /* ${border()} */
            height: 100%;
            width: 75px;
            color: black;
            text-decoration: none;
            :hover{
                text-decoration: underline;
                /* background-color: rgba(0,0,0,.3); */
            }
        }
    }
`;