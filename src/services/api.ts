import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://travelexpenses-api.herokuapp.com',
  baseURL: 'http://192.168.0.109:8080',
});

export default api;
