import React , { Component } from 'react'
import styled from 'styled-components'
import { PocketNote } from '../index.js'
import { getPocketList, attachPocketItem } from '../../actions'
import { connect } from 'react-redux';
import { PocketChannel } from './index.js';

class PocketList extends Component {
    componentDidMount(){
        this.props.getPocketList();
    }

    render(){
        console.log(this.props)
        return(
            <PocketListDiv> 
            {this.props.store.pocket.fetchingPocketList ? <p>fetching pocket list. The first time connecting can take up to a couple minutes.</p> : null }
                {this.props.store.pocket.pocketList ? 
                <PocketChannel onDrop={this.props.onDrop} pocketList={this.props.store.pocket.pocketList} attachPocketItem={this.props.attachPocketItem}/>: <p>loading...</p>} 
            </PocketListDiv>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}
  
const mapDispatchToProps = {
    getPocketList,
    attachPocketItem
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PocketList)

const PocketListDiv = styled.div`
    border: 1px solid red;
    color: black;
    background: green;
`

//     domain_metadata: {name: "Shane Parrish", logo: "https://logo.clearbit.com/fs.blog?size=800", greyscale_logo: "https://logo.clearbit.com/fs.blog?size=800&greyscale=true"}
// excerpt: "“We all are learning, modifying, or destroying ideas all the time.     Rapid destruction of your ideas when the time is right is one     of the most valuable qualities you can acquire.     You must force yourself to consider arguments on the other side.”     — Charlie Munger"
// favorite: "0"
// given_title: "The Work Required To Have An Opinion"
// given_url: "https://www.farnamstreetblog.com/2013/04/the-work-required-to-have-an-opinion/"
// has_image: "0"
// has_video: "0"
// is_article: "1"
// is_index: "0"
// item_id: "345919012"
// lang: "en"
// listen_duration_estimate: 261
// resolved_id: "345919012"
// resolved_title: "The Work Required to Have an Opinion"
// resolved_url: "https://www.farnamstreetblog.com/2013/04/the-work-required-to-have-an-opinion/"
// sort_id: 700
// status: "0"
// time_added: "1503940166"
// time_favorited: "0"
// time_read: "0"
// time_to_read: 3
// time_updated: "1503940166"
// top_image_url: "https://www.farnamstreetblog.com/wp-content/uploads/2013/04/The-Work-Required.png"
// word_count: "675"