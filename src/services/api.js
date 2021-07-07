import { Platform } from 'react-native';
import axios from 'axios';

const api = axios.create({
  baseURL: Platform.OS === 'android' ? 'https://2e2172c122f3.ngrok.io' : 'http://localhost:8080',
});

export default api;
