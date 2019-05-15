import React , { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';

import { 
    SlackChannel, 
    Loading  
} from '../index.js';

import { 
    getSlackStars, 
    // editAttachedItems 
} from '../../actions'

import { 
    scrollBar
} from '../../styles'

class SlackList extends Component {
    componentDidMount(){
        if(!this.props.store.slack.slackStars){
            this.props.getSlackStars()
        }
    }

    render(){
        const { slackStars } = this.props.store.slack
        return(
            <SlackListDiv> 
                {slackStars 
                    ? Object.keys(slackStars).map(channelName => {
                            const channel = slackStars[channelName]
                            return <SlackChannel 
                                key={channel.name} 
                                editAttachedItems={this.props.editAttachedItems} 
                                channel={channel} />
                        })
                    :   <Loading />
                } 
            </SlackListDiv>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}
  
const mapDispatchToProps = {
    getSlackStars,
    // editAttachedItems
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SlackList)

const SlackListDiv = styled.div`
    /* border: 1px solid red; */
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
    /* background: yellow; */
    ${scrollBar()}
`