import axios from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://localhost:8000/web',
	withCredentials: true,
	headers: {
		Accept: 'application/json',
	},
});

export default axiosClient;
