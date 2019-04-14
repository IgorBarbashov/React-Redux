import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers'; // для варианта с составным reducer

import './index.css';
import App from './App';

// v1 - initialState & reducer playList для первых примеров работы redux (до #6 урока)
const initialState =[
    'Smells like teen spirit',
    'Enter Sandman'
];

function playList (state = initialState, action) { // reducer - всегда должны возвращать новый стейт
    if (action.type === 'ADD_TRACK') {
        return [
            ...state,
            action.payload
        ];
    }
    return state;
};

// v2 - составной initialState2 & new reducer playList2 (с #6 урока)
const initialState2 = {
    tracks: [
        'Smells like teen spirit',
        'Enter Sandman'
    ],
    playLists: [
        'My home playlist',
        'My work playlist'
    ]
};
// составной store и reducer, обрабатывающий несколько типов action'ов
function playList2 (state = initialState2, action) { // reducer - всегда должны возвращать новый стейт
    if (action.type === 'ADD_TRACK') {
        return {
          ...state,
          tracks: [...state.tracks, action.payload]
        }
      } else if (action.type === 'DELETE_TRACK') {
        return {
            ...state,
            tracks: [...state.tracks, 'DEL:' + action.payload]
        }
      }
      else if (action.type === 'ADD_PLAYLIST') {
          return {
            ...state,
            playLists: [...state.playLists, action.payload]
          }
      } else if (action.type === 'DELETE_PLAYLIST') {
        return {
            ...state,
            playLists: [...state.playLists, 'DEL:' + action.payload]
        }
      }
    return state;
};

// v3 - вариант с combineReducers
// v3 - как первый параметр в createStore передаем составной 'reducer'


// функция playList - называется reducer (здесь меняем playList или playList2 или reducer)
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&  
    window.__REDUX_DEVTOOLS_EXTENSION__()); // второй аргумент - для работы ReduxDevTools в Chrome

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);



// пример из первых уроков - когда работает без react
// import { createStore } from 'redux';

// function playList (state = [], action) {
//     if (action.type === 'ADD_TRACK') {
//         return [
//             ...state,
//             action.payload
//         ];
//     }
//     return state;
// };

// const store = createStore(playList);

// const addTrackButton = document.querySelectorAll('.addTrack')[0];
// const trackInput = document.querySelectorAll('.trackInput')[0];
// const list = document.querySelectorAll('.list')[0];

// store.subscribe(() => {
//     list.innerHTML = '';
//     trackInput.value = '';
//     store.getState().forEach(track => {
//         const li = document.createElement('li');
//         li.textContent = track;
//         list.appendChild(li);
//     });
// });

// addTrackButton.addEventListener('click', () => {
//     const trackName = trackInput.value;
//     store.dispatch({type: 'ADD_TRACK', payload: trackName});
// });