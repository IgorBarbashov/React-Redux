const initPlaylist = ['а теперь покажи мне сказку', 'сказка пор маленького ягнекнка'];

export default function(state = initPlaylist, action) {
    const { type, payload } = action;

    switch(type) {
        case 'ADD_PLAYLIST':
            return [...state, payload];
        default:
            return state;
    };
};