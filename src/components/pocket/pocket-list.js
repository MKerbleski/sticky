import React , { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';

import { 
    Loading,
    PocketChannel
 } from '../index.js'

import { 
    getPocketList, 
} from '../../actions'

import { 
    scrollBar
} from '../../styles'

class PocketList extends Component {
    componentDidMount(){
        if(!this.props.store.pocket.pocketList){
            this.props.getPocketList();
        }

            const target = document.getElementById('scroll');
            target.addEventListener('wheel', (e) => {
                if(target.scrollTop >= target.scrollHeight - target.clientHeight){
                    // YOUR AT THE BOTTOM BITCH!
                    if(!this.props.store.pocket.fetchingPocketList){
                        this.getMorePocketItems()
                    }
                }
            });
    }

    getMorePocketItems = () => {
        this.props.getPocketList(this.props.store.pocket.pocketList.length + 20)
    }

    render(){
        return(
            <PocketListDiv id="scroll"> 
                {this.props.store.pocket.fetchingPocketList 
                    ?   <p>fetching pocket list. The first time connecting can take up to a couple minutes.</p> 
                    :   null }
                {this.props.store.pocket.pocketList
                    ?   <PocketChannel 
                            onDrop={this.props.onDrop} 
                            pocketList={this.props.store.pocket.pocketList} 
                            getMorePocketItems={this.getMorePocketItems}
                            fetching={this.props.store.pocket.fetchingPocketList}
                            // editAttachedItems={this.props.editAttachedItems}    
                        />
                    :   <Loading />
                }
            </PocketListDiv>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}
  
const mapDispatchToProps = {
    getPocketList,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(PocketList)

const PocketListDiv = styled.div`
    height: 100%;
    overflow: auto;
    ${scrollBar()}
`