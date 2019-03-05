import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { flex, menu } from '../../styles/styl-utils.js'
import DeleteTarget from './delete-target.js';


export default class LeftMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			allNotesSelected: false,
			createNoteSelected: false,
		}
	}

	clickHandler = (name) => {
		switch(name){
			case "home":
				console.log('hey', name)
				this.props.redirect(`/${this.props.username}`)
				break;
			case "trash":
				this.props.redirect(`/${this.props.username}/deleted`)
				break;
			case "settings":
				this.props.redirect(`/${this.props.username}/settings`)
				break;
			default:
				console.log("no name")
		}
	}

	render(){
		return (
			<LeftMenuDiv>
				<div className='leftMenuTop'>
					<Link 
						className={this.state.allNotesSelected 
							? "current menu-item" 
							: "menu-item"}  
						// onClick={() => this.clickHandler("home")}
						style={this.props}
						to={`/${this.props.username}`}>
						{/* // onClick={() => this.clickHandler("trash")}> */}
						<i className="fab fa-stack-overflow"></i>

					</Link>
					<div 
						onClick={this.props.toggleNewNote} 
						className="menu-item">
						<i className="fas fa-plus-square"></i>
					</div>
					<div className="menu-item">
						<i className="fas fa-tv"></i>
					</div>
					<div className="menu-item">
						<i className="fas fa-book-open"></i>
					</div>
				</div>
				<div className="leftMenuBottom">
					<Link 
						to={`/${this.props.username}/trash`}
						>
						
						{/* // onClick={() => this.clickHandler("trash")}> */}
						<DeleteTarget
							type='deleteBin' 
							className="menu-item red" />
					</Link>
					<Link 
						to={`/${this.props.username}/settings`}
						// onClick={() => this.clickHandler("settings")}
						// onClick={this.props.hideDetailMenu} 
						 
						className="menu-item">
						<i className="fas fa-cogs"></i>
					</Link>
							
				</div>
			</LeftMenuDiv>
		)
	}
}

const LeftMenuDiv = styled.div`
    ${ menu() }
    color: white;
    width: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .menu-item{
        ${'' /* border: 1px solid red; */}
        height: 50px;
        text-align: center;
        text-decoration: none;
        color: black;
        font-weight: bold;
        margin: 10px;
        font-size: 22px;
        ${ flex('row') }
        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
    .current {
        background-color: orange;
    }
    .red {
        background-color: red;
        color: black;
        height: 200px;
    }
`;