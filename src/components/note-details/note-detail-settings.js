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
        console.log('input handler')
        this.setState({
            [event.target.name]: event.target.value,
            id: this.props.id
        })
    }

    submit = (e) => {
        e.preventDefault();
        console.log('submit', this.state)
        this.props.editNote(this.state)
    }
    
    render(props){
        console.log(this.props.id)
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
    form{
        display: flex;
        flex-direction: column;
    }
`;