const mockApiData = [
    'from-back-1',
    'from-back-2',
    'from-back-3',
    'from-back-4',
    'from-back-5'
];

export const getTracks = () => {
    console.log('внутри action getTracks');
    
    return dispatch => {
        console.log('внутри функции, корторая возвращается в dispatch !!! ДО !!! setTimeout');
        
        setTimeout( () => {
            console.log('внутри setTimeout');
            dispatch( { type: 'FETCH_TRACKS_SUCCESS', payload: mockApiData } );
        }, 2000);

        console.log('внутри функции, корторая возвращается в dispatch !!! ПОСЛЕ !!! setTimeout');
    }
};