import React , { Component } from 'react'
import styled from 'styled-components'
import { SlackNote }from '../index.js'
import { getSlackStars } from '../../actions'
import { connect } from 'react-redux';

class SlackList extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.props.getSlackStars()
        this.setState({
            selectedApp: "slack",
            // slackStars: this.props.slackStars
        })
    }

    render(){
        // console.log(this.props.state)

        return(
            <SlackListDiv> 
                {this.props.state.slackStars ? this.props.state.slackStars.map(star => {
                    if (star.type === "message"){
                        return <SlackNote type="link" onDrop={this.props.onDrop} key={star.date_create} star={star}></SlackNote>
                    } else if (star.type === "channel") {
                        return <div key={star.date_create} className="list-title">Stared channel: {star.channel}</div>
                    } else {
                        return <p>no data or failed to load</p>
                    }
                }): <p>loading...</p>} 
            </SlackListDiv>
        )
    }
}

const mapStateToProps = store => {
    return {state: store};
}
  
const mapDispatchToProps = {
    getSlackStars,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SlackList)

const SlackListDiv = styled.div`
    border: 1px solid red;
`