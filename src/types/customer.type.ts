export interface IUser {
  id: number
	name: string
	email: string
  surname: string
  telephone?: number
  birthday: Date
  gender: 'male' | 'female'
}

export type UpdateUser = Partial<Omit<IUser, 'id'>>

