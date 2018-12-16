import React, { Component } from 'react';
import styled from 'styled-components';
import { menu, start } from '../../styles/styl-utils.js'
import { SlackList, PocketList } from './index'
import { getSlackStars } from '../../actions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AAO } from '../../helpers/availbleApis'

class RightMenuDetails extends Component {
    getCorrectListComponent(){
        switch(this.props.selectedApp){
            case "slack":
                return <SlackList type="link" onDrop={this.props.onDrop} />
            case "pocket":
                return <PocketList />
            default: 
                return null;
        }
    }

    render(){
        const { selectedApp } = this.props;
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
                                {this.getCorrectListComponent()}
                            </div>
                        </React.Fragment> :
                    
                        <div className="connect-apis"><Link to='/settings'>please select an app</Link></div>
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
    .app-title{
        max-width: 100px;
        color: black;
    }
    /* .app-list{
        overflow: auto;
        .slack-card{
        }
    } */
    .connect-apis{
        border: 1px solid purple;
        color: black;
    }
`;