// 3-й вариант с combineReducers
// в данном файле reducer и initialState, которые отвечают за playLists
// reducer - всегда должны возвращать новый стейт

const initialState3_playLists = [
    'My home playlist',
    'My work playlist'
];

export default function playList3_playLists (state = initialState3_playLists, action) { 
    if (action.type === 'ADD_PLAYLIST') {
        return [
            ...state,
            action.payload
        ];
      } else if (action.type === 'DELETE_PLAYLIST') {
        return [
            ...state,
            'DEL:' + action.payload
        ];
      }
    return state;
};