const mockApiData = [
    {id: 1, name: 'from-back-1'},
    {id: 2, name: 'from-back-2'},
    {id: 3, name: 'from-back-3'},
    {id: 4, name: 'from-back-4'},
    {id: 5, name: 'from-back-5'},
];

export const getTracks = () => {
    return dispatch => {
        setTimeout(()=>{
            dispatch( {type: 'LOAD_TRACKS', payload: mockApiData} );
        }, 2000);
    };
};