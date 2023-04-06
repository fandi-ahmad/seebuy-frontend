import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/cms';

export const RegisterUser = (data) => {
    return axios.post(`${apiUrl}/register`, data)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const LoginUser = (data) => {
    return axios.post(`${apiUrl}/login`, data)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}
