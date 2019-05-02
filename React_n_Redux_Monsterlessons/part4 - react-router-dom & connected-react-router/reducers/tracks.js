const initTracks = ['привет', 'еще раз привет', 'второй раз привет'];

export default function(state = initTracks, action) {
    const { type, payload } = action;

    if (type === 'ADD_TRACK') {
        return [...state, payload];
    } else if (type === 'FETCH_TRACKS_SUCCESS') {
        return payload;
    } else {
        return state;
    }
};