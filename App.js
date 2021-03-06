import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import queryString from 'query-string';

let defaultTextColor = '#fff';
let defaultStyle = {
  color: defaultTextColor
}
let fakeServerData = {
  user : {
    name: "Sachet",
    playlists: [
      {
        name: 'Ghoul',
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
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, width: '20%', 'display' : 'inline-block'}}>
        <img src={playlist.imageUrl} style={{width: '168px'}}/>
        <h3>{playlist.name}</h3>
        <ul>
            {playlist.songs.map(song => 
                <li>{song.name}</li>
            )}
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
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value) } />
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData:{},
      filterString: '',
    };
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log(accessToken);

    fetch('https://api.spotify.com/v1/me/', {
      headers: {'Authorization': 'Bearer ' + accessToken},
    }).then( (response) => response.json())
    .then(data => this.setState({
      user: {
        name: data.id, 
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken},
    }).then( response => response.json())
    .then(playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map( playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
            headers: {'Authorization': 'Bearer ' + accessToken},
        })
        let trackDataPromise = responsePromise
          .then(response => response.json())
        return trackDataPromise
      })
      
      let allTracksDataPromises = Promise.all(trackDataPromises)
      let playlistsPromise = allTracksDataPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
          .map(item => item.track)
          .map(trackData => ({
            name: trackData.name,
            duration: trackData.duration_ms / 1000
          }))
        })
        return playlists
      })
      return playlistsPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map( item => {
        return {
          name: item.name, 
          imageUrl: item.images[0].url,
          songs: item.trackDatas.slice(0, 3)
        }
      })
    }))
  }
  render() {
    let playlistToRender = 
      this.state.user && 
      this.state.playlists 
        ? this.state.playlists.filter(playlist =>{
          let matchesPlaylist = playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())
          let matchesSong = playlist.songs.find(song => song.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()))
          return matchesPlaylist || matchesSong
        }) : []
    return (
        <div className="App">
            {this.state.playlists ?
            <div>
                <h1 style={defaultStyle} className="App-title">Welcome to 
                      { this.state.playlists.name}</h1>
                <PlaylistCounter playlists={playlistToRender }/>
                <HourCounter playlists={playlistToRender }/>
                <Filter onTextChange={text => {
                  this.setState({filterString: text})
                }}/>
                {playlistToRender.map((playlist) => {
                    return <Playlist playlist={playlist} />
                })}
            </div> : <button onClick={() => window.location='http://192.168.50.4:8888/login'}
            style={defaultStyle}>Sign In</button>
        }
      </div>
    );
  }
}

export default App;
