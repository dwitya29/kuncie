import { Mentor } from './mentor';

export type ClassDetails = {
  id: number
  name: string
  mentors: Mentor[]
  description: string
}

export type JoinClassParams = {
  classId: number
  attendeeFullName: string
  attendeeEmail: string
}
