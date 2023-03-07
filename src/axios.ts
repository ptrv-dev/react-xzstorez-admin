import axios from 'axios';

const appAxios = axios.create({
  baseURL: 'http://localhost:5004/',
  withCredentials: true,
});

export default appAxios;
