import React, { Component } from 'react';
import styled from 'styled-components';
// import { getUserData } from '../actions'
import { connect } from 'react-redux';
import { ApiSettings } from '../components/settings';
import { Loading } from '../components/loading'

class SettingsPage extends Component {

	render() {
		const { userData } = this.props.store.user
		return (
			<SettingsPageDiv>
				<h1>Settings</h1>
				{userData 
					? 	<div>
							<p><strong>username: </strong><span>{userData.username}</span></p>
							<p><strong>first: </strong><span>{userData.firstname}</span></p>
							<p><strong>last: </strong><span>{userData.lastname}</span></p>
							<p><strong>email: </strong>s<span>{userData.email}</span></p>
							<h4>Apps</h4>
							<ApiSettings userData={userData} /> 
						</div>
					:	<Loading />
				}
				{/* <p>by default api items will be redundent, they can appear on multiple notes and will remain in the list. click button to turn off redudency and each note will be only appear throughout sticky once. There will be a flag on the note that says whether it is used or not.</p> */}
				{/* <button>toggle redundency</button> */}
			</SettingsPageDiv>
		)
	}
}

const mapStateToProps = store => {
  	return {store: store};
}

const mapDispatchToProps = {
  	// getUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)

const SettingsPageDiv = styled.div`
	border: 1px solid green;
	display: flex;
	flex-direction: column;
	padding: 25px;
	width: 100%;
	/* height: 100vh; */
`;