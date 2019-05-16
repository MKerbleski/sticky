import React, {Component} from 'react';
import styled from 'styled-components';

export default class NoteDetailSettings extends Component{
    constructor(props){
        super(props);
        this.state = {
            note_color: '',
        };
    }

    inputHandler = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
            id: this.props.id
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.props.editNote(this.state)
    }
    
    render(){
        return(
            <NoteDetailSettingsDiv>
                <form onSubmit={this.submit}>
                    <label>change color</label>
                    <input name="note_color" type="color" onChange={this.inputHandler}></input>
                    <input type="submit"></input>
                </form>
            </NoteDetailSettingsDiv>
        )
    }
}

const NoteDetailSettingsDiv = styled.div`
    ${'' /* border: 1px solid red; */}
    background: rgba(1,1,1,.05);
    form{
        display: flex;
        flex-direction: column;
    }
`;