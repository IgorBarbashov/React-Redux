const initState = [
    {id: 1, name: 'Playlist_01'},
    {id: 2, name: 'Playlist_02'}
];

export default function playlist(state = initState, action) {
    const {type, payload} = action;

    switch(type) {
        case 'ADD_PLAYLIST':
            return [...state, payload];
        default:
            return state;
    };
};