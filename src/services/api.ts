import axios, { AxiosError, InternalAxiosRequestConfig, type CreateAxiosDefaults } from 'axios'

import { getAccessToken, setAccessToken } from './auth-token'
import { authService } from './auth'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:8080',
	withCredentials: true,
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
}, async function (error: AxiosError) {
	const originalRequest = error.config

	if (error.response?.status === 401 && error.config) {
			const token = (await authService.getNewTokens()).data;
			if (token) await setAccessToken(token)
			return axiosWithAuth.request(originalRequest as InternalAxiosRequestConfig<any>)
	}

	return Promise.reject(error);
});

axiosClassic.interceptors.response.use(function (response) {
	return response;
}, async function (error: AxiosError) {
	if (error.response?.status === 401) {
		authService.logout();
	}

	return Promise.reject(error);
});

export { axiosClassic, axiosWithAuth }
