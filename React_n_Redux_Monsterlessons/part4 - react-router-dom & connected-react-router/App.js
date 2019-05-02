import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { getTracks } from './actions/getTracks';

class App extends Component {
  state = {
    tracksInput: '',
    playlistsInput: ''
  };

  tracksInputHandler = (event) => {
    this.setState({tracksInput: event.target.value});
  };

  addTrackHandler = () => {
    this.props.addTrack(this.state.tracksInput);
    this.setState({ tracksInput: '' });
  };
  
  playlistsInputHandler = (event) => {
    this.setState({playlistsInput: event.target.value});
  };
  
  addPlaylistHandler = () => {
    this.props.addPlaylist(this.state.playlistsInput);
    this.setState({ playlistsInput: '' });
  };

  loadTracksHandler = () => {
    console.log('---> до loadTracks');
    this.props.loadTracks();
    console.log('---> после loadTracks');
  };

  render() {
    return(
      <Fragment>
        <div>
          <button onClick={this.loadTracksHandler}>
            Загрузить треки
          </button>
        </div>

        <div>
          <input type='text'
            value={this.state.tracksInput}
            onChange={this.tracksInputHandler}
          />
          <button onClick={this.addTrackHandler}>Добавить track</button>
        </div>

        <div>
          <input type='text'
            value={this.state.playlistsInput}
            onChange={this.playlistsInputHandler}
          />
          <button onClick={this.addPlaylistHandler}>Добавить playlist</button>
        </div>

        <div>
          Playlists:
          <ul>
            {this.props.playlists
              .filter( list => list.includes(this.state.playlistsInput) &&
                list.includes(this.state.tracksInput) )
              .map( list => <li>{list}</li> )}
          </ul>
        </div>

        <div>
          Track:
          <ul>
            {this.props.tracks
              .filter( track => track.includes(this.state.tracksInput) &&
                track.includes(this.state.playlistsInput) )
              .map( track => <li>{track}</li> )}
          </ul>
        </div>
      </Fragment>
    );
  };
};

const mapStateToProps = state => ({
  playlists: state.playlists,
  tracks: state.tracks
});

const mapDispatchToProps = dispatch => ({
  addTrack: track => dispatch({type: 'ADD_TRACK', payload: track}),
  addPlaylist: playlist => dispatch({type: 'ADD_PLAYLIST', payload: playlist}),
  loadTracks: () => {
    console.log('внутри метода loadTracks *** ДО dispatch');
    dispatch( getTracks() );
    console.log('внутри метода loadTracks *** ПОСЛЕ dispatch');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);