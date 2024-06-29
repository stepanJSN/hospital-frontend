export interface ISingIn {
	email: string
	password: string
  role: 'Customer' | 'Staff'
}

export interface ISingUp {
  email: string
  name: string
  surname: string
  telephone?: number
  birthday: string
  gender: 'male' | 'female'
	password: string
}

export interface IAuthResponse {
  access_token: string
}

