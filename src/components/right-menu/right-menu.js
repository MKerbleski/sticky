import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { RightMenuDetails } from './index'

import { AAA } from '../../helpers/availbleApis'

import { 
	rightArrow, 
	leftArrow,
} from '../../img'

import { 
} from '../../actions'

import { 
	flexCenter
} from '../../styles/styl-utils.js'

class RightMenu extends Component {
    state = {
        selectedApp: null,
        openDetails: false,
		slack: this.props.store.user.userData.slack,
		pocket: this.props.store.user.userData.pocket,
    }

    // componentDidMount(){
	// 	this.setState({
	// 		slack: this.props.store.user.userData.slack,
	// 		pocket: this.props.store.user.userData.pocket,
	// 	})
	// }
	
	componentWillReceiveProps(nextProps){
        if(this.props.store.user.userData.slack_initial_sync !== nextProps.store.user.userData.slack_initial_sync){
            this.setState({
				slack: nextProps.store.user.userData.slack_initial_sync,
			})
        }
        if(this.props.store.user.userData.pocket_initial_sync !== nextProps.store.user.userData.pocket_initial_sync){
            this.setState({
				pocket: nextProps.store.user.userData.pocket_initial_sync,
			})
        }
    }

    eventHandler = (e) => {
        e.preventDefault();
        switch(e.target.name){
			case "leftArrow": 
				this.setState({
					openDetails: true,
					selectedApp: this.props.store.user.userData.pocket 
						? 	'pocket' 
						: 	this.props.store.user.userData.slack 
							? 	'slack' 
							: 	null
				})
				break;
			case "rightArrow":
				this.setState({
					openDetails: false,
					selectedApp: null
				})
				break;
			case "slack":
				this.setState({
					openDetails: !this.state.openDetails,
					selectedApp: "slack"
				})
				break;
			case "pocket":
				this.setState({
					openDetails: !this.state.openDetails,
					selectedApp: "pocket"
				})
				break;
			default:
				this.setState({
					openDetails: true,
					selectedApp: e.target.name
				})    
        }
    }

    render(){
		return (
			<RightMenuDiv>
				{this.state.openDetails 
					?	<RightMenuDetails 
							selectedApp={this.state.selectedApp} 
							onDrop={this.props.onDrop}
							/>
					: 	null
				}
				
				<div className="right-menu-preview">
					{ AAA.map(apiName => {
						if(this.state[apiName.name]){
							return (
								<img 
									alt={apiName.alt} 
									key={apiName.name} 
									name={apiName.name} 
									src={apiName.icon} 
									onClick={this.eventHandler} 
									className="menu-item" 
								/>
							)
						} else {
							return null
						}
					})}

					{this.state.openDetails 
						?	<img 
								alt="rightArrow-logo" 
								name="rightArrow" 
								onClick={this.eventHandler} 
								className="menu-item" 
								src={rightArrow} 
							/>
						:	<img 
								alt="leftArrow" 
								name="leftArrow" 
								onClick={this.eventHandler} 
								className="menu-item" 
								src={leftArrow} 
							/>
					}
				</div>
			</RightMenuDiv>
		)
    }
}

const mapStateToProps = store => {
  	return {store: store};
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)

const RightMenuDiv = styled.div`
	border: 2px solid black;
	background: lightblue;
	box-sizing: border-box;
	${flexCenter()}
	.right-menu-preview{
		display: flex;
		flex-direction: column;
		justify-content: center;
		.menu-item{
			${ flexCenter('row') }
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
`;