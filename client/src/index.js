import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

axios.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const jwt = cookies.get('jwt');
  config.headers.common['Authorization'] = `Bearer ${jwt}`;

  return config;
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
