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

export interface IUser {
	id: number
	name: string
	email: string
  surname: string
  telephone?: number
  birthday: Date
  gender: 'male' | 'female'
  specializationId?: string
  experience?: number
  role: 'Customer' | 'Staff'
  access_token: string
}

