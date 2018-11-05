import React from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { 
    getLinks,
    getNotes,
    newNoteFalse,
   } from '../../actions'
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
        console.log('addNote', this.state.textBody)
        this.newNote({textBody: this.state.textBody})
    }

    changeHandler = (e) => {
        e.preventDefault();
        this.setState({
            textBody: e.target.value,
        })
    }
    
    newNote = (newNote) => {
        if(localStorage.getItem('JWT')){
          const token = localStorage.getItem('JWT')
          const authHeader = {
            headers: {
              Authorization: token,    
            } 
          }
        axios.post('http://localhost:3333/api/notes/', (newNote), authHeader)
        .then(res => {
          this.props.getLinks();
          this.props.getNotes();
          this.setState({
              textBody:'',
          })
          this.props.newNoteFalse();
        }).catch(err => console.log(err.message))
      } else {
        console.log('need to include toekn in request')
      }
    }

    render(props){
        console.log(this.props)
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
    return {state: store};
  }
  
  const mapDispatchToProps = {
    getLinks,
    getNotes,
    newNoteFalse,
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