import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from './components/Menu';
import PlayList from './components/PlayList';
import Tracks from './components/Tracks';
import './App.css';

import { getTracks } from './actions/actionsCreater';

function App(props) {

  const addTrackHandler = () => {
    props.addTrack({id: Date.now(), name: 'DefaultTrack'});
  };
  
  const addPlaylistHandler = () => {
    props.addPlaylist({id: Date.now(), name: 'DefaultTrack'});
  };

  return (
    <Fragment>
      <Menu />

      <div className="main-block">
        <Route exact path="/" 
          render={() => {
            return(
              <>
                Playlist:{props.playlist.map(list=>{return(
                  <li>{list.name}</li>
                )})}
                Tracks:{props.tracks.map(track=>{return(
                  <li><Link to={{
                    pathname: `/tracks/${track.id}`,
                    state: {fromLink: 1}
                    }}
                  >{track.name}</Link></li>
                )})}
                <button onClick={addPlaylistHandler}>Add playlist</button>
                <button onClick={addTrackHandler}>Add track</button>
                <button onClick={props.loadTracks}>Load track</button>
              </>
            );
          }}
        />

        <Route path="/playlist" component={PlayList}></Route>
        <Route path="/tracks/:id" component={Tracks}></Route>

      </div>
      
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  tracks: state.tracks
});

const mapDispatchToProps = (dispatch) => {
  return ({
    addPlaylist: playlist => dispatch( { type: 'ADD_PLAYLIST', payload: playlist } ),
    addTrack: track => dispatch( { type: 'ADD_TRACK', payload: track } ),
    loadTracks: () => dispatch( getTracks() )
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);