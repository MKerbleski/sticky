import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { 
	ApiSettings,
	Loading,
	SlackSettings,
	PocketSettings
} from '../components';

import { 
	border
} from '../styles';

class SettingsPage extends Component {

	render() {
		const { userData } = this.props.store.user
		return (
			<SettingsPageDiv>
				<h1>Settings</h1>
				{userData 
					? 	<React.Fragment>
							<div className="subSetting">
								<p>
									<strong>username: </strong>
									<span>{userData.username}</span>
								</p>
								<p>
									<strong>first: </strong>
									<span>{userData.firstname}</span>
								</p>
								<p>
									<strong>last: </strong>
									<span>{userData.lastname}</span>
								</p>
								<p>
									<strong>email: </strong>
									<span>{userData.email}</span>
								</p>
								<h4>Apps</h4>
							</div>
							<PocketSettings userData={this.props.userData} />
							<SlackSettings  userData={this.props.userData} />
							<SlackSettings  userData={this.props.userData} />
							{/* <ApiSettings userData={userData} /> */}
						</React.Fragment> 
					:	<Loading />
				}
				<p>Items from Slack or Pocket will be redundent. They can appear on multiple notes and will remain in the list that they came from. Currently, they are also read-only. Deleting notes from a note will have no effect on the note in slack or pockets website.</p>
				{/* click button to turn off redudency and each note will be only appear throughout sticky once. There will be a flag on the note that says whether it is used or not. */}
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
	${border()}
	display: flex;
	flex-direction: column;
	padding: 25px;
	width: 100%;
	/* max-height: 100%; */
	.subSetting {
		/* THIS CLASS IS ALSO ON 
		POCKET_SETTINGS AND SLACK_SETTING  */
		width: 100%;
		${border('red')}
		padding: 3px;
	}
	/* height: 100vh; */
`;