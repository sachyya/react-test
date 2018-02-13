import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
}
let fakeServerData = {
  user : {
    name: "Sachet",
    playlists: [
      {
        name: 'My favourites',
        songs: [
            { name: 'Hello', duration: 3245 }, 
            { name: 'IDGF', duration: 1134 }, 
            { name: 'Sick Puppy', duration: 890 },
            { name: 'Anaconda', duration: 8976 },
        ],
      },
      {
        name: 'My favourites 1',
        songs: [
            { name: 'Hello', duration: 3245 }, 
            { name: 'IDGF', duration: 1134 }, 
            { name: 'Sick Puppy', duration: 890 },
            { name: 'Anaconda', duration: 8976 },
        ],
      },
      {
        name: 'My favourites 2 ',
        songs: [
            { name: 'Hello', duration: 3245 }, 
            { name: 'IDGF', duration: 1134 }, 
            { name: 'Sick Puppy', duration: 890 },
            { name: 'Anaconda', duration: 8976 },
        ],
      },
      {
        name: 'My favourites 3',
        songs: [
            { name: 'Hello', duration: 3245 }, 
            { name: 'IDGF', duration: 1134 }, 
            { name: 'Sick Puppy', duration: 890 },
            { name: 'Anaconda', duration: 8976 },
        ],
      },
    ]
  }
}

class PlaylistCounter extends Component{
  render() {
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
        <h2 style={defaultStyle}>{this.props.playlists && this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HourCounter extends Component{
  render() {
    let allSongs = this.props.playlists.reduce( ( songs, eachPlaylist ) => {
        return songs.concat( eachPlaylist.songs );
    }, []);
    let totalDuration = allSongs.reduce( ( sum, eachSong ) => {
        return sum + eachSong.duration;
    }, 0 );
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
        <h2 style={defaultStyle}>{Math.round(totalDuration/60 )} hours</h2>
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
  componentDidMount() {
    setTimeout( () => {
        this.setState({serverData:fakeServerData});
    }, 1000);
  }
  render() {

    return (
        <div className="App">
            {this.state.serverData.user ?
            <div>
                <h1 style={defaultStyle} className="App-title">Welcome to 
                      { this.state.serverData.user.name}</h1>
                <PlaylistCounter playlists={this.state.serverData.user.playlists }/>
                <HourCounter playlists={this.state.serverData.user.playlists }/>
                <Filter />
                <Playlist />
                <Playlist />
                <Playlist />
            </div> : <h1 style={defaultStyle}>Loading ...</h1>
        }
      </div>
    );
  }
}

export default App;
