import axios, { type CreateAxiosDefaults } from 'axios'

import { getAccessToken } from './auth-token'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:8080',
	headers: {
		'Content-Type': 'application/json'
	},
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

export { axiosClassic, axiosWithAuth }
