import React , { Component } from 'react'
import styled from 'styled-components'
import { getSlackStars, attachPocketItem } from '../../actions'
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
                    return <SlackChannel key={channel.name} attachPocketItem={this.props.attachPocketItem} channel={channel} />
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
    attachPocketItem
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SlackList)

const SlackListDiv = styled.div`
    border: 1px solid red;
    box-sizing: border-box;
    width: 100%;
    background: maroon;
`