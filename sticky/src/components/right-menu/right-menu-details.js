import React, { Component } from 'react';
import styled from 'styled-components';
import { menu, start } from '../../styles/styl-utils.js'
import { slackWord } from '../../img'
import SlackNote from '../slack-note.js'
import { getSlackStars } from '../../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class RightMenuDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            app: null,
            fakeList: []
        }
    }

    componentDidMount(){
        if(this.state.app === 'slack'){
            this.props.getSlackStars()
            this.setState({
                app: this.props.app, 
                slackStars: this.props.slackStars
            })
        }
    }

    render(){
        // console.log(this.state)
        return (

            <RightMenuDetailsDiv>
            {this.state.selectedApp ?
                    <React.Fragment>
                        <div className="app-title">
                            <img alt='slackLogo' name={this.props.app} onClick={this.eventHandler} className="rm-details-name" src={slackWord}></img>
                        </div>
                        <div className="app-list">
                                {this.props.state.slackStars ? 
                                    <React.Fragment>
                                        {this.props.state.slackStars.map(star => {
                                            if (star.type === "message"){
                                                return <SlackNote type="link" onDrop={this.props.onDrop} key={star.date_create} star={star}></SlackNote>
                                            } else if (star.type === "channel") {
                                                return <div key={star.date_create} className="list-title">stared channel: {star.channel}</div>
                                            } else {
                                                return <p>no data or failed to load</p>
                                            }
                                        })} 
                                    </React.Fragment> :
                                    <p>loading</p> }
                                
                        </div>
                    </React.Fragment> :
                
                    <div className="connect-apis"><Link to='/settings'>connect apps in settings</Link></div>
            }
            </RightMenuDetailsDiv>
                
            
            )
    }
}

const mapStateToProps = store => {
    return {state: store};
}
  
const mapDispatchToProps = {
    getSlackStars,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RightMenuDetails)

const RightMenuDetailsDiv = styled.div`
    ${'' /* height: 100%; */}
    ${start('purple')}
    margin: 5px;
    ${ menu() }
    color: white;
    width: 250px;
    height: 100%;
    display: flex;
    background-color: white;
    flex-direction: column;
    ${'' /* .app-title{
        max-width: 100px;
    }
    .app-list{
        overflow: auto;
        .slack-card{
        }
    } */}
    .connect-apis{
        border: 1px solid purple;
        color: black;
    }
`;