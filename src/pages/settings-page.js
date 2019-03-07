import React, { Component } from 'react';
import styled from 'styled-components';
import { getUserData } from '../actions'
import { connect } from 'react-redux';
import { ApiSettings } from '../components/settings';

class SettingsPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			hello: false,
		}
	}

	componentDidMount(){
		// this.props.getUserData()
	}    

	componentWillReceiveProps(){
		console.log("settings updated, should eventually rerender and trigger redux action for initializing api")
	}

	render() {
		// console.log("settings", this.props)
		const { userData } = this.props.store.user
		return (
			<SettingsPageDiv>
				<h1>Settings</h1>
				{userData 
					? 	<div>
							<p>username: <span>{userData.username}</span></p>
							<p>first: <span>{userData.firstname}</span></p>
							<p>last: <span>{userData.lastname}</span></p>
							<h4>Apps</h4>
							<ApiSettings userData={userData} /> 
						</div>
					:	<h6>loading...</h6>
				} 
				<p>by default api items will be redundent, they can appear on multiple notes and will remain in the list. click button to turn off redudency and each note will be only appear throughout sticky once. There will be a flag on the note that says whether it is used or not.</p>
				<button>toggle redundency</button>
			</SettingsPageDiv>
		)
	}
}

const mapStateToProps = store => {
  	return {store: store};
}

const mapDispatchToProps = {
  	getUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)

const SettingsPageDiv = styled.div`
	border: 1px solid green;
	display: flex;
	flex-direction: column;
	padding: 25px;
	height: 100vh;
`;

  // pocketTokenRequest = (consumer_key, redirect_uri) => {
  //     console.log('this.pocketTokenRequest')
  //     let Header = {
  //       // 'Host': 'getpocket.com',
  //       // 'Content-Type': 'application/x-www-form-urlencoded', 
  //       // 'Access-Control-Allow-Origin': 'http://localhost:4444',
  //       // 'X-Accept': 'application/x-www-form-urlencoded'
  //     }//I dont think this is doing anything now
  //     let pocketToken = axios.post(`https://getpocket.com/v3/oauth/request?consumer_key=${consumer_key}&redirect_uri=${redirect_uri}`, Header).then(res => {
  //         console.log(res, 'res')
  //         let pocketToken = res.data
  //         pocketToken = pocketToken.slice(5);
  //         localStorage.setItem('pocketToken', pocketToken)
  //         console.log(pocketToken, 'next')
        
  //         return pocketToken
  //       }
  //     ).then(res => {
  //       console.log('second then', res)
  //       this.props.history.push('/note/1')
  //     }).then(res => {
  //       console.log('third then ', res)
  //     }).catch(err => 
  //       console.log(err.message)
  //       ) 
  //     return pocketToken
  // }

  // getPocket = async (e) => {
  //   e.preventDefault();
  //   let consumer_key = '81178-6329dec7e9395b38d4e0b3d3';
  //   let redirect_uri = 'http://www.google.com'
    
  //   let pocketToken = await this.pocketTokenRequest(consumer_key, redirect_uri)
  //   this.setState({
  //     hello: true, 
  //     pocketToken: pocketToken, 
  //   })
  //   //  localStorage.getItem('PocketToken')
  //   console.log(pocketToken)
  //   // await window.open()

  // }
