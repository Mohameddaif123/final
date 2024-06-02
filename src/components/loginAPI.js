import axios from 'axios';

const MY_SERVER = 'http://127.0.0.1:8000/';

export function login(credentials) {
    return axios.post(`${MY_SERVER}login/`, credentials);
}

export function register(userData) {
    return axios.post(`${MY_SERVER}register/`, userData);
}

export function updateProfile(userData) {
    return axios.put(`${MY_SERVER}update_profile/`, userData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        }
    });
}