export function createStore(rootReducer, initialState) {
    let state = rootReducer(initialState, { type: '__INIT__' });
    const subscribes = [];

    return {
        dispatch(action) {
            state = rootReducer(state, action);
            subscribes.forEach(el => el());
        },
        subscribe(callback) {
            subscribes.push(callback);
        },
        getState() {
            return state;
        }
    };
}