import { ISingIn, ISingUp, IUser } from '@/types/auth.type'
import { axiosClassic } from './api'
import { setAccessToken, removeAccessToken } from './auth-token'

export class AuthService {
	async signIn(data: ISingIn) {
		const response = await axiosClassic.post<IUser>('/auth/signin', data);

		if (response.data.access_token) setAccessToken(response.data.access_token)

		return response
	};

	async signUp(data: ISingUp) {
		const response = await axiosClassic.post<IUser>('/customers', data);
		return response
	};

	async logout() {
		// const response = await axiosClassic.post<boolean>('/auth/logout')
    await removeAccessToken()
	}
}
