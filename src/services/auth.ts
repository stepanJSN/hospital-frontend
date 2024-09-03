import { ISingInResponse, ISingIn, ISingUp } from '@/types/auth.type';
import { axiosClassic } from './api';
import {
  setAccessToken,
  removeAccessToken,
  setUserId,
  removeUserId,
  setUserRole,
  removeUserRole,
} from './cookie';
class AuthService {
  async signIn(data: ISingIn) {
    const response = await axiosClassic.post<ISingInResponse>(
      '/auth/signin',
      data,
    );

    if (response.data.access_token)
      await setAccessToken(response.data.access_token);
    if (response.data.id) await setUserId(response.data.id);
    if (response.data.role) await setUserRole(response.data.role);

    return response;
  }

  async signUp(data: ISingUp) {
    await axiosClassic.post('/customers', data);
  }

  async getNewTokens() {
    return await axiosClassic.post<string>('/auth/access-token');
  }

  async logout() {
    await axiosClassic.get('/auth/logout');
    await removeAccessToken();
    await removeUserId();
    await removeUserRole();
  }
}

export const authService = new AuthService();
