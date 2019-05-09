import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {connect} from 'react-redux';

import DeleteTarget from './delete-target.js';
import { 
	toggleNewNote
 } from '../../actions'
import {
	scrollBar,
	flexCenter,
	border
} from '../../styles/styl-utils.js'
import {
	turquise,
} from '../../styles/colors.js'

class LeftMenu extends Component {
	constructor(props){
		super(props);
		this.state = {
			allNotesSelected: false,
			createNoteSelected: false,
		}
	}

	clickHandler = (name) => {
		switch(name){
			case "newNote":
				this.props.toggleNewNote();
				break;
			default:
				console.log("no name in left menu")
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
						style={this.props}
						to={`/${this.props.username}`}>
						<i className="fab fa-stack-overflow"></i>

					</Link>
					<div 
						onClick={() => this.clickHandler("newNote")} 
						className="menu-item">
						<i className="fas fa-plus-square"></i>
					</div>
					{/* <div className="menu-item">
						<i className="fas fa-tv"></i>
					</div>
					<div className="menu-item">
						<i className="fas fa-book-open"></i>
					</div>
					<div className="menu-item">
						<i className="fas fa-list-ul"></i>
					</div> */}
				</div>
				<div className="leftMenuBottom">
					{this.props.location.pathname === `${this.props.match.url}/trash`
						? 	<Link 
								to={`/${this.props.username}/`}>
								<DeleteTarget
									type='deleteBin' 
									className="menu-item red" />
							</Link>
						: 	<Link 
								to={`/${this.props.username}/trash`}>
								<DeleteTarget
									type='deleteBin' 
									className="menu-item red" />
							</Link>
					}
					<Link 
						to={`/${this.props.username}/settings`}
						className="menu-item">
						<i className="fas fa-cogs"></i>
					</Link>
					<Link 
						to={`/bugs`}
						className="menu-item">
						<i className="fas fa-bug"></i>
					</Link>
				</div>
			</LeftMenuDiv>
		)
	}
}

const mapStateToProps = store => {
	return {store: store};
}

const mapDispatchToProps = {
	toggleNewNote
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu)

const LeftMenuDiv = styled.div`
	${flexCenter('column')}
	${scrollBar()};
	overflow-x: hidden;
    color: white;
    width: 5%;
	min-width: 40px;
    justify-content: space-between;
	background-color: ${turquise};
    .menu-item{
        ${flexCenter()}
		/* ${border()} */
        height: 50px;
        text-align: center;
        text-decoration: none;
        color: black;
        font-weight: bold;
        margin: 10px;
        font-size: 22px;
        &:hover {
            cursor: pointer;
            text-decoration: underline;
        }
    }
	/* I DONT CURRENTLY KNOW WHAT THIS IS DOING */
    .current {
        background-color: orange;
    }
	/* THIS IS FOR THE DELETE BIN WHEN IT TURNS RED */
    .red {
        background-color: red;
        color: black;
        height: 200px;
    }
`;