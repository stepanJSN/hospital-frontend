export interface ISpecialization {
  id: string
  name: string
}

export interface IDoctors {
  id: string
  name: string
  surname: string
  experience: number
  gender: 'male' | 'female'
}