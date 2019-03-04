import React from 'react';
import styled from 'styled-components';
import { 
    addNote } from '../../actions'

import { connect } from 'react-redux';


class NotePreviewNew extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            text_body: ''
        }
    }
  
    // getFirstWord = (text, words=2) => {
    //     let firstWord = text.split(" ").slice(0,words).join(' ');
    //     if(firstWord.length > 0){
    //         return firstWord
    //     } else {
    //         return text
    //     }
    // }

    // getFirstSen = (text) => {
    //     let firstSen = text
    //     let firstWord = this.getFirstWord(text)
    //     firstSen = firstSen.replace(firstWord, '')    
    //     if(firstSen !== firstWord){
    //         return firstSen
    //     } else{
    //         return null
    //     }
    // }

    addNote = (e) => {
        e.preventDefault()
        this.props.addNote({text_body: this.state.text_body})
        this.setState({
            text_body: ""
        })
        this.props.toggleNewNote();
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({
            text_body: e.target.value,
        })
    }
    
    render(){
        // console.log(this.props)
        return (
            <div className="startObject">
                <NotePreviewNewDiv >
                    <form onSubmit={this.addNote}>
                        <input autoFocus onChange={this.changeHandler} name="text_body" value={this.state.text_body}
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