import axios from 'axios';
export default axios.create({
  // baseURL: 'https://toeicapp-be.onrender.com/api',
  baseURL: 'http://192.168.1.38:3000/api',
});
