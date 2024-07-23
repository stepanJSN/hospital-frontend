import axios, { AxiosError, type CreateAxiosDefaults } from 'axios'

import { getAccessToken } from './auth-token'
import { authService } from './auth'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json'
	},
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(async config => {
	const accessToken = await getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(function (response) {
	return response;
}, function (error: AxiosError) {
	
	console.log(error.response?.status);

	if (error.response?.status === 401) {
			authService.logout();
	}

	return Promise.reject(error);
});

export { axiosClassic, axiosWithAuth }
