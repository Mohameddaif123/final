// reducers.js
const initialState = {
    preference: localStorage.getItem('userPreference') || null,
};

const userPreferenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_PREFERENCE':
            localStorage.setItem('userPreference', action.preference);
            return { ...state, preference: action.preference };
        case 'GET_USER_PREFERENCE':
            return state.preference;
        default:
            return state;
    }
};

export default userPreferenceReducer;