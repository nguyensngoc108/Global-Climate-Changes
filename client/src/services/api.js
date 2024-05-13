// src/services/api.js
import axios from 'axios';

const API_URL = "http://localhost:8000/api";

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`);
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

export { fetchData, postData };
