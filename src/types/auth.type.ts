import { IUser } from "./customer.type"

export interface ISingIn {
	email: string
	password: string
  role: 'Customer' | 'Staff'
}

export interface ISingUp extends Omit<IUser, 'id'> {
  password: string
}

export interface IAuthResponse {
  access_token: string
}

