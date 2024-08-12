import axios, { AxiosError, InternalAxiosRequestConfig, type CreateAxiosDefaults } from 'axios'

import { getAccessToken, setAccessToken } from './auth-token'
import { authService } from './auth'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_SERVER_ADDRESS,
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
		if (originalRequest?.data) {
				originalRequest.data._isRetry = true;
		}
		const token = (await authService.getNewTokens()).data;
		if (token) await setAccessToken(token)
		return axiosWithAuth.request(originalRequest as InternalAxiosRequestConfig<{ _isRetry: boolean }>)
	}

	return Promise.reject(error);
});

// axiosClassic.interceptors.response.use(function (response) {
// 	return response;
// }, async function (error: AxiosError) {
// 	if (error.response?.status === 401) {
// 		authService.logout();
// 	}

// 	return Promise.reject(error);
// });

export { axiosClassic, axiosWithAuth }
