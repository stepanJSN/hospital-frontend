export interface ISpecialization {
  id: string
  title: string
}

export interface IDoctors {
  id: string
  name: string
  surname: string
  experience: number
  gender: 'male' | 'female'
}

export type GetDoctorsType = {
  specializationId: string; 
  date?: string
}