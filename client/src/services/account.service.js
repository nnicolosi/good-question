import axios from 'axios';

export const login = (username, password) => {
	return axios.post('http://localhost:3001/auth/login', {
		username: username,
		password: password
	});
}