import React , { Component } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown';
import { start } from '../../styles/styl-utils.js'

export default class NoteDetailBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            textBody: props.note.textBody
        }
    }

    handleClick = () => {
        console.log('click')
        this.setState({
            edit: true
        })
    }
    
    handleDClick = () => {
        console.log('click')
        this.setState({
            edit: false
        })
    }

    handleEdit = () => {
        console.log('handleEdit')
    }

    handleInput = (e) => {
        this.setState({
            textBody: e.target.value
        })
    }

    render(props){
        return(
            <NoteDetailBodyDiv onClick={this.handleClick} onDoubleClick={this.handleDClick}> 
                {this.state.edit ? 
                    <form className="note-detail-body-edit" onSubmit={this.handleEdit}>
                        <textarea wrap="hard" type='textarea' onChange={this.handleInput} value={this.state.textBody} name='textBody'>{this.value}</textarea>
                        <button>save</button>
                    </form> : 
                    <div className="note-detail-body">
                        {<ReactMarkdown>{this.props.note.textBody}</ReactMarkdown>}
                    </div>
                }
            </NoteDetailBodyDiv>
        )
    }
}

const NoteDetailBodyDiv = styled.div`
    border: 1px solid red;
    height: 100%;
    .note-detail-body{
        ${start('blue')}
        height: 50%;
        overflow: hidden;
        h4 {
          font-weight: bold;
          margin-bottom: 10px;
          text-decoration: underline;
        }
        p {
          line-height: 30px;
        }
      }
    .note-detail-body-edit{
        background: orange;
        height: 75%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        textarea{
            width: 96%;
            height: 100%;
            margin: 2px;
        }
        button{
            margin: 3px;
        }
    }
`