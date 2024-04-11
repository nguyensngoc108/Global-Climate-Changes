// src/services/api.js
import axios from 'axios';

const API_URL = '/api'; // Adjust the base API URL as needed

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
    };
    

