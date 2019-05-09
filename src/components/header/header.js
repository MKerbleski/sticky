import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { 
    logout
} from '../../actions'

import { 
    flexCenter,
    border
} from '../../styles/styl-utils.js'

import { 
    turquise,
} from '../../styles/colors.js'

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
                    ?   <div className="linkss">
                            <h3>
                                {`Hello ${localStorage.getItem('username')},`}
                            </h3>
                            <div className="headerLink" onClick={this.logout} >
                                Logout
                            </div> 
                        </div> 
                    :   <div className="linkss">
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
    background-color: ${turquise};
    /* ${border()} */
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
            ${'' /* border: 1px solid green; */}
            color: black;
            -webkit-text-stroke-width: .1px;
            -webkit-text-stroke-color: black;
            ${'' /* width: 80%; */}
            font-size: 35px;
            margin: 0;
            margin-left: 20px;
            text-decoration: none;
        }
    }
    p {
        margin: 0
    }
    .linkss{
        ${flexCenter()}
        /* ${border()} */
        height: 30px;
        margin: 0;
        .headerLink{
            ${flexCenter()}
            ${border()}
            height: 100%;
            width: 75px;
            color: black;
            text-decoration: none;
            :hover{
                background-color: rgba(0,0,0,.3);
            }
        }
    }
`;