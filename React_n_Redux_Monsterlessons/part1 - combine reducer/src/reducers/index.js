import { combineReducers } from 'redux';
import tracks from './tracks';
import playLists from './playlists';

export default combineReducers({
    tracks, // эти же имена будут использоваться при map-инге
    playLists // store в props в connect() в компоненте
});