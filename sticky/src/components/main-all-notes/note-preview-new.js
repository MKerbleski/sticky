import React from 'react';
import styled from 'styled-components';
import { 
    addNote } from '../../actions'

import { connect } from 'react-redux';


class NotePreviewNew extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            textBody: ''
        }
    }
  
    getFirstWord = (text, words=2) => {
        let firstWord = text.split(" ").slice(0,words).join(' ');
        if(firstWord.length > 0){
            return firstWord
        } else {
            return text
        }
    }

    getFirstSen = (text) => {
        let firstSen = text
        let firstWord = this.getFirstWord(text)
        firstSen = firstSen.replace(firstWord, '')    
        if(firstSen !== firstWord){
            return firstSen
        } else{
            return null
        }
    }

    addNote = (e) => {
        e.preventDefault()
        this.props.addNote({textBody: this.state.textBody})
        this.setState({
            textBody: ""
        })
        //call to close tab
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({
            textBody: e.target.value,
        })
    }
    
    render(){
        return (
            <div className="startObject">
                <NotePreviewNewDiv >
                    <form onSubmit={this.addNote}>
                        <input autoFocus onChange={this.changeHandler} name="textBody" value={this.state.textBody}
                        className="note-link" >{this.value}</input>
                        <button>save note</button>
                    </form>
                </NotePreviewNewDiv>        
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {store: store};
}

const mapDispatchToProps = {
    addNote
}

export default connect(mapStateToProps, mapDispatchToProps)(NotePreviewNew)

const NotePreviewNewDiv = styled.div`
  ${'' /* border: 1px solid blue; */}
  padding: 10px;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;  
  input{
      width: 100%;
      background-color: lavender;
      margin: 0;
      min-height: 169px;
      border: none;
      ${'' /* border: 1px solid green; */}
  }
`;