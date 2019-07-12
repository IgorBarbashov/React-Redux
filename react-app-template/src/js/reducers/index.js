// ok
import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import evotor from './evotor';
import auth from './auth';

export const reducerCreator = (history) => combineReducers({
    router: connectRouter(history), 
    evotor,
    auth
});