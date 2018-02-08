import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
}
let fakeServerData = {
  user : {
    name: "Sachet"
  }
}

class Aggregate extends Component{
  render() {
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
        <h2 style={defaultStyle}>Number Text</h2>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '20%', 'display' : 'inline-block'}}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 1</li>
          <li>Song 1</li>
          <li>Song 1</li>
          <li>Song 1</li>
        </ul>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div>
        <img />
        <input type="text" />
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData:{}};
  }
  ComponentDidMount() {
    this.setState({serverData:fakeServerData});
  }
  render() {

    return (
      <div className="App">
          <h1 style={defaultStyle} className="App-title">Welcome to 
            {this.state.serverData.user && this.state.serverData.user.name}</h1>
          <Aggregate />
          <Aggregate />
          <Filter />
          <Playlist />
          <Playlist />
          <Playlist />
      </div>
    );
  }
}

export default App;
