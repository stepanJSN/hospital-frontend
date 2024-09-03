export interface IUser {
  id: string;
  name: string;
  email: string;
  surname: string;
  telephone?: number;
  avatarUrl?: string;
  birthday: string;
  gender: 'male' | 'female';
}

export interface IUpdateAvatarResponse {
  avatarUrl: string;
}

export type GetAll = {
  firstName?: string;
  lastName?: string;
};

export type UpdateUser = Partial<Omit<IUser, 'id'> & { password: string }>;
