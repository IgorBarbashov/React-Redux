const initState = [
    {id: 1, name: 'Track_01'},
    {id: 2, name: 'Track_02'}
];

export default function tracks(state = initState, action) {
    const {type, payload} = action;

    switch(type) {
        case 'ADD_TRACK':
            return [...state, payload];
        case 'LOAD_TRACKS':
            return [...state, ...payload];
        default:
            return state;
    };

};