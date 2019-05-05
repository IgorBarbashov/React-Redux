import { combineReducers } from 'redux';

// depricated
// import { routerReducer } from 'react-router-redux';
// usage 'connected-react-router'
import { connectRouter } from 'connected-react-router';

import playlists from './playlist';
import tracks from './tracks';

// createRoot-reducer with React-routing (createRootReducer in index.js)
export default (history) => combineReducers({
    router: connectRouter(history),
    playlists,
    tracks
});

// Root-reducer without React-routing
// export default combineReducers({
//     playlists,
//     tracks
// });