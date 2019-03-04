import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { flex, menu } from '../../styles/styl-utils.js'
import { logout } from '../../actions'
import { connect } from 'react-redux';

class Header extends Component{

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('JWT');
        localStorage.removeItem('username');
        localStorage.removeItem('sticky_user_id');
        this.props.logout();
        this.props.redirect('/welcome')
      }
    
    render(){
        return(
            <HeaderDiv>
                <Link 
                    to={localStorage.getItem('JWT') 
                        ?   `/${localStorage.getItem('username')}` 
                        :   '/welcome'} 
                    className="headerTitle-link">
                    <h1 className="headerTitle">Stic.ky</h1>
                </Link>
                {this.props.store.notes.status ? this.props.store.notes.status : <p>status</p>}
                {localStorage.getItem('username') 
                    ?   <div className="linkss">
                            <h3>{` Hello ${localStorage.getItem('username')},`}</h3>
                            <div className="headerLink" onClick={this.logout} >Logout</div> 
                        </div> 
                    :   <div className="linkss">
                            <Link className="headerLink" to="/welcome/login" >Login</Link>
                            <Link className="headerLink" to="/welcome/register">Register</Link>
                        </div>}
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
    ${'' /* border: 1px solid red; */}
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 5vh;
    padding: 0;
    ${menu()}
    .headerTitle-link {
        text-decoration: none;
        :active {
            text-decoration: none;
            }
        :visited {
            color: black;
            text-decoration: none;
        }
        .headerTitle{
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
    .linkss{
        ${'' /* border: 1px solid green; */}
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
            color: black;
            ${'' /* background-color: rgba(0,0,0,.1); */}
            text-decoration: none;
            ${flex()}
            :hover{
                background-color: rgba(0,0,0,.3);
            }
        }
    }
`;