import axios from 'axios';

export const current = () => {
	return axios.get('http://localhost:3001/user/current');
}