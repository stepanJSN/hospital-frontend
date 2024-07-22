import { IAuthResponse, ISingIn, ISingUp } from '@/types/auth.type'
import { axiosClassic } from './api'
import { setAccessToken, removeAccessToken, setUserId, removeUserId } from './auth-token'

export class AuthService {
	async signIn(data: ISingIn) {
		const response = await axiosClassic.post<IAuthResponse>('/auth/signin', data);

		if (response.data.access_token) await setAccessToken(response.data.access_token)
		if (response.data.id) await setUserId(response.data.id)

		return response
	};

	async signUp(data: ISingUp) {
		const response = await axiosClassic.post('/customers', data);
		return response
	};

	async logout() {
		// const response = await axiosClassic.post<boolean>('/auth/logout')
    await removeAccessToken()
		await removeUserId()
	}
}
