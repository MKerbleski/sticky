import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import { 
    getSlackStars, 
    syncSlack, 
    syncPocketList 
} from '../../actions'

import { 
    SlackList, 
    PocketList,
    Loading
} from '../../components'

import { 
    AAO 
} from '../../helpers'

import { 
    menu, 
    start,
    border,
} from '../../styles'

class RightMenuDetails extends Component {

    getCorrectListComponent(){
        switch(this.props.selectedApp){
            case "slack":
                return <SlackList type="link" onDrop={this.props.onDrop} />
            case "pocket":
                return <PocketList />
            default: 
                return <p>connect an app in settings</p>;
        }
    }

    syncHandler(selectedApp){
        // e.preventDefault()
        if(this.props.selectedApp === 'pocket'){
            this.props.syncPocketList()

        } else if (this.props.selectedApp === 'slack'){
            this.props.syncSlack()
        }
    }

    render(){
        const {selectedApp} = this.props;
        return (
            <RightMenuDetailsDiv>
                {selectedApp 
                    ?    <React.Fragment>
                            <div className="app-title">
                                <img 
                                    alt={AAO[selectedApp].alt} 
                                    name={AAO[selectedApp].name} 
                                    onClick={this.eventHandler} className="rm-details-name" 
                                    src={AAO[selectedApp].logo}
                                ></img>
                                {this.props.store.pocket.fetchingPocketList || this.props.store.slack.gettingSlackStars 
                                    ?   <Loading />
                                    :   <button
                                            onClick={() => {this.syncHandler()}}
                                        >
                                            <i className="fas fa-sync"></i>
                                        </button>
                                }
                            </div>
                            <div className="app-list" id="hey">
                                {this.getCorrectListComponent()}
                            </div>
                        </React.Fragment>
                    :   <div className="connect-apis">
                            <Link to='/settings'>connect app in settings</Link>
                        </div>
                }
            </RightMenuDetailsDiv>           
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}
  
const mapDispatchToProps = {
    getSlackStars,
    syncSlack,
    syncPocketList,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RightMenuDetails)

const RightMenuDetailsDiv = styled.div`
    margin: 5px;
    ${menu()}
    color: white;
    max-width: 250px;
    width: 95%;
    height: 99%;
    display: flex;
    background-color: white;
    flex-direction: column;
    max-height: 100%;
    .app-title {
        /* ${border()} */
        /* max-width: 100px; */
        color: black;
        width: 95%;
        min-height: 75px;
        height: 75px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        button{
            margin: 10px;
            i{
                margin: 3px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
    }
    .app-list {
        /* ${border()} */
        /* border: 1px solid black; */
        overflow: hidden;
        width: 100%;
        max-height: 100%;
    }
    .connect-apis {
        border: 1px solid purple;
        color: black;
    }
`;