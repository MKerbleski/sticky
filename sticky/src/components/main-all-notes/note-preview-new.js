import React from 'react';
import styled from 'styled-components';

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
        console.log('addNote', this.state.textBody)
        this.props.newNote({textBody: this.state.textBody})
    }

    changeHandler = (e) => {
            e.preventDefault();
            this.setState({
                textBody: e.target.value,
            })
    }
    
    render(props){
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

export default NotePreviewNew;

const NotePreviewNewDiv = styled.div`
  ${'' /* border: 1px solid blue; */}
  padding: 10px;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;  
  input{
      width: 100%;
      background-color: lightgray;
      margin: 0;
      min-height: 169px;
      border: none;
      ${'' /* border: 1px solid green; */}
  }
`;