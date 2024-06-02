// actions.js
export const setUserPreference = (preference) => ({
    type: 'SET_USER_PREFERENCE',
    preference,
});

export const getUserPreference = () => ({
    type: 'GET_USER_PREFERENCE',
});
