import React , { Component } from 'react'
import styled from 'styled-components'
import { getSlackStars } from '../../actions'
import { connect } from 'react-redux';
import { SlackChannel } from '../index.js';

class SlackList extends Component {
    componentDidMount(){
        this.props.getSlackStars()
    }

    render(){
        const { slackStars } = this.props.store.slack
        return(
            <SlackListDiv> 
                {slackStars ? Object.keys(slackStars).map(channelName => {
                    const channel = slackStars[channelName]
                    return <SlackChannel key={channel.name} channel={channel} />
                    {/* if (star.type === "message"){
                        return <SlackNote type="link" onDrop={this.props.onDrop} key={star.date_create} star={star}></SlackNote>
                    } else if (star.type === "channel") {
                        return <div key={star.date_create} className="list-title">Stared channel: {star.channel}</div>
                    } else {
                        return <p>no data or failed to load</p>
                    } */}
                }): <p>loading...</p>} 
            </SlackListDiv>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}
  
const mapDispatchToProps = {
    getSlackStars,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SlackList)

const SlackListDiv = styled.div`
    border: 1px solid red;
    background: maroon;
`