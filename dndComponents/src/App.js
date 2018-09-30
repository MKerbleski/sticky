import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Route} from 'react-router-dom';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import List from './components/list.js'
import NewNote from './components/newNote.js'

class App extends Component {
  componentDidMount(){
    document.getElementById("newNoteId").focus();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Route path="/" component={NewNote} />
        <Route path="/" component={List} />
      </div>
    );
  }
}



export default DragDropContext(HTML5Backend)(App); 
