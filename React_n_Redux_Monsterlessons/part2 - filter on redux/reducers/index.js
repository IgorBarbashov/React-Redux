import { combineReducers } from 'redux';
import playlists from './playlist';
import tracks from './tracks';

export default combineReducers({
    playlists,
    tracks
});