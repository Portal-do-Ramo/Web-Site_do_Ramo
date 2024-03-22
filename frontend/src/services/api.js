import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'application/json'
  }
});

export default api;
