// 3-й вариант с combineReducers
// в данном файле reducer и initialState, которые отвечают за tracks
// reducer - всегда должны возвращать новый стейт

const initialState3_Tracks = [
    'Smells like teen spirit',
    'Enter Sandman'
];

export default function playList3_Tracks (state = initialState3_Tracks, action) { 
    if (action.type === 'ADD_TRACK') {
        return [
            ...state,
            action.payload
        ];
      } else if (action.type === 'DELETE_TRACK') {
        return [
            ...state,
            'DEL:' + action.payload
        ];
      }
    return state;
};