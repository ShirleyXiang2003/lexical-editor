import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

export const getContextRoot = async () => {
    const response = await axios.get(`${API_URL}/context/`);
    return response.data;
};

export const uploadFile = async (file) =>{
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/context/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const getStatus = async (contextId) => {
    const response = await axios.get(`${API_URL}/context/process/status/${contextId}`);
    return response.data;
};

export const startProcessing = async (contextId) =>{
    const response = await axios.get(`${API_URL}/context/process/${contextId}`);
    return response.data;
};

export const getTreemap = async (contextId) => {
    const response = await axios.get(`${API_URL}/${contextId}/treemap`);
    return response.data;
};

export const getProfiles = async (contextId) => {
    const response = await axios.get(`${API_URL}/${contextId}/profiles`);
    return response.data;
};

export const getProfile = async (contextId, profileName) => {
    const response = await axios.get(`${API_URL}/${contextId}/profiles/${profileName}`);
    return response.data;
};

export const updateProfile = async (contextId, profileName, profile) => {
    const response = await axios.post(`${API_URL}/${contextId}/profiles/${profileName}`, profile);
    return response.data;
};