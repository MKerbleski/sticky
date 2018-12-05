import React, { Component } from 'react';
import styled from 'styled-components';
import { menu, start } from '../../styles/styl-utils.js'
import { slackWord } from '../../img'
import SlackNote from '../slack-note.js'
import { getSlackStars } from '../../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AAO } from '../../helpers/availbleApis'

class RightMenuDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            fakeList: []
        }
    }

    componentWillReceiveProps(){
        this.setState({
            selectedApp: this.props.selectedApp
        })
    }
    componentDidMount(props){
        switch(this.props.selectedApp){
            case "slack":
            console.log("slack in switch statement")
                this.props.getSlackStars()
                this.setState({
                    selectedApp: "slack",
                    slackStars: this.props.slackStars
                })
                break;
            case "pocket":
                this.setState({
                    selectedApp: "pocket",
                })
                console.log("pocket is selected App");
                break;
            default: 
                console.log("This should never be displayed but if it is something with API naming and right menu happened");   
        }
    }
   

    render(){
        console.log(this.props)
        const {selectedApp} = this.props;
        console.log(AAO[selectedApp])
        return (
            <RightMenuDetailsDiv>
            {selectedApp ?
                    <React.Fragment>
                        <div className="app-title">
                            <img 
                                alt={AAO[selectedApp].alt} 
                                name={AAO[selectedApp].name} 
                                onClick={this.eventHandler} className="rm-details-name" 
                                src={AAO[selectedApp].logo}></img>
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