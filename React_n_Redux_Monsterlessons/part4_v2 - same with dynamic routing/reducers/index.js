import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import playlist from './playlist';
import tracks from './tracks';

export const reducerCreator = history => combineReducers({
    router: connectRouter(history), 
    playlist,
    tracks
});