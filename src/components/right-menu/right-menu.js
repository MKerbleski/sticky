import React, { Component } from 'react';
import styled from 'styled-components';
import { flex } from '../../styles/styl-utils.js'
import { connect } from 'react-redux';
import { AAA } from '../../helpers/availbleApis'
import { RightMenuDetails } from './index'
import { 
	rightArrow, 
	leftArrow,
} from '../../img'
import { getConnectedApis } from '../../actions'

class RightMenu extends Component {
    state = {
        selectedApp: null,
        openDetails: false,
		slack: this.props.store.user.userData.slack,
		pocket: this.props.store.user.userData.pocket,
    }

    componentDidMount(){
		// this.props.getConnectedApis()
		// console.log(this.props.store.user.userData)
		// console.log(this.props.store.user.userData)
		// this.setState({
		// 	connectedApis: 
		// })
    }

    eventHandler = (e) => {
        e.preventDefault();
        switch(e.target.name){
			case "leftArrow": 
				let fallback = this.props.store.user.userData.pocket ? 'pocket' : this.props.store.user.userData.slack ? 'slack' : null
				this.setState({
					openDetails: true,
					selectedApp: fallback
				})
				break;
			case "rightArrow":
				this.setState({
					openDetails: false,
					selectedApp: null
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
    //   console.log(this.props.store.user.connectedApis)
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
							return <img 
							alt={apiName.alt} 
							key={apiName.name} 
							name={apiName.name} 
							src={apiName.icon} 
							onClick={this.eventHandler} 
							className="menu-item" />
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
								src={rightArrow} />
						:	<img 
								alt="leftArrow" 
								name="leftArrow" 
								onClick={this.eventHandler} 
								className="menu-item" 
								src={leftArrow} />
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
  	getConnectedApis,
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)

const RightMenuDiv = styled.div`
	border: 2px solid black;
	box-sizing: border-box;
	background: lightblue;
	display: flex;
	flex-direction: row;
	align-items: center;
	.right-menu-preview{
		display: flex;
		flex-direction: column;
		justify-content: center;
		.menu-item{
			${ flex('row') }
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