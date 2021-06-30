import axios from 'axios';

export const login = (username, password) => {
  return axios.post('http://localhost:3001/auth/login', {
    username: username,
    password: password,
  });
};

export const logout = () => {
  return axios.get('http://localhost:3001/auth/logout');
};

export const setPassword = (password) => {
  return axios.post('http://localhost:3001/auth/set-password', {
    password: password,
  });
};
