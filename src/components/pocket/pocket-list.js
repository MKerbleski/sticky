import React , { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { PocketChannel } from './index.js';
import { Loading } from '../index.js'

import { 
    getPocketList, 
} from '../../actions'

class PocketList extends Component {
    componentDidMount(){
        if(!this.props.store.pocket.pocketList){
            this.props.getPocketList();
        }
    }

    render(){
        return(
            <PocketListDiv> 
                {this.props.store.pocket.fetchingPocketList 
                    ?   <p>fetching pocket list. The first time connecting can take up to a couple minutes.</p> 
                    :   null }
                {this.props.store.pocket.pocketList
                    ?   <PocketChannel 
                            onDrop={this.props.onDrop} 
                            pocketList={this.props.store.pocket.pocketList} 
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
`