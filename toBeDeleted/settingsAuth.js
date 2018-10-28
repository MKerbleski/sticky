// import React, { Component } from 'react';
// import styled from 'styled-components';
// // import {Link} from 'react-router-dom';
// import axios from 'axios';

// export default class SettingsAuth extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//     }
//   }

//   componentDidMount(props){
//     // this.getRealToken(this.props.consumer_key, this.props.pocketToken)
//   }

//   getRealToken = (consumer_key, pocketToken) => {
//     //   axios.post(`https://getpocket.com/v3/oauth/authorize?consumer_key=${consumer_key}&code=${pocketToken}`).then(res => {
//         console.log("SUCSESS")
//       }).catch(err => {
//         console.log(err.message)
//       }) //need to finish this
//   }

//   render() {
//     return (
//        <SettingsAuthDiv>
//           <h1>authenticating, pleasee wait </h1>
//         </SettingsAuthDiv>
//     );
//   }
// }

// const SettingsAuthDiv = styled.div`
//   border: 1px solid green;
//   display: flex;
//   flex-direction: column;
//   padding: 25px;
//   height: 100vh;
// `;

// the other way around this might be to route the user to a confirmlogin page that asks the user if they signed in to pocket on their site. then when they hit yes it does the second function