import axios from 'axios';
import { redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const authProvier = {
	login: async () => {
		try {
			const res = await axios.post(
				'http://localhost:9000/api/auth/login',
				{},
				{
					withCredentials: true,
					credentials: 'include',
				}
			);
			return res;
		} catch (err) {
			throw new Error(
				'Failed to authenticate. Please verify credentials and login again.'
			);
		}
	},
	logout: () => {
		cookie.remove('checkToken');
		redirect('/login');
		return Promise.resolve();
	},
	checkAuth: async () => {
		try {
			const check = cookie.get('checkToken');
			if (check) {
				const res = await axios.post(
					'http://localhost:9000/api/auth/verify',
					{},
					{
						withCredentials: true,
						credentials: 'include',
					}
				);

				return res;
			} else {
				redirect('/login');
				throw new Error('Failed to authenticate. Please login again.');
			}
		} catch (err) {
			throw new Error('Failed to authenticate. Please login again.');
		}
	},
	checkError: (error) => {
		const status = error.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem('username');
			return Promise.reject();
		}
		// other error code (404, 500, etc): no need to log out
		return Promise.resolve();
	},
	getIdentity: () =>
		Promise.resolve({
			id: 'user',
			fullName: 'John Doe',
		}),
	getPermissions: () => Promise.resolve(''),
};

export default authProvier;
