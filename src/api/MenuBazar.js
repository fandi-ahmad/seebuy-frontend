import axios from 'axios';

const apiUrl = 'http://localhost:8000/api/cms/bazar';

export const GetBazar = () => {
    return axios.get(apiUrl,)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const CreateBazar = (data) => {
    return axios.post(`${apiUrl}/create`, data)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const UpdateBazar = (id, data) => {
    return axios.put(`${apiUrl}/update/${id}`, data)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const DeleteBazar = (id) => {
    return axios.delete(`${apiUrl}/${id}`)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}
