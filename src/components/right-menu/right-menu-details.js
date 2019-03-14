import React, { Component } from 'react';
import styled from 'styled-components';
import { menu, start } from '../../styles/styl-utils.js'
import { SlackList, PocketList } from './index'
import { getSlackStars, syncSlack } from '../../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AAO } from '../../helpers/availbleApis'
import { Loading } from '../loading'

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
            console.log("pocket")

        } else if (this.props.selectedApp === 'slack'){
            console.log("slack")
            this.props.syncSlack()
        }
        // console.log(selectedApp, this.props.selectedApp)
    }

    render(){
        const { selectedApp } = this.props;
        console.log(selectedApp)
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
                            <div className="app-list">
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
}
  
export default connect(mapStateToProps, mapDispatchToProps)(RightMenuDetails)

const RightMenuDetailsDiv = styled.div`
    /* ${start('purple')} */
    margin: 5px;
    ${ menu() }
    color: white;
    width: 250px;
    height: 99%;
    display: flex;
    background-color: white;
    flex-direction: column;
    .app-title {
        border: 1px solid red;
        /* max-width: 100px; */
        color: black;
        width: 100%;
        min-height: 75px;
        height: 75px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        button{
            margin: 10px;
            i{
                /* border: 1px solid gray; */
                margin: 3px;
                /* padding: 10px; */
                &:hover{
                    cursor: pointer;
                }
                /* background: lightgray */
            }
        }
    }
    .app-list {
        /* border: 1px solid black; */
        overflow: auto;
        width: 100%;
        &::-webkit-scrollbar {
        width: 6px;
            &-thumb{
                background-color: gray;
                border-radius: 25px;
            }
        }
    }
    .connect-apis {
        border: 1px solid purple;
        color: black;
    }
`;