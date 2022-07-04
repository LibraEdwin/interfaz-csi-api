import { Types } from 'mongoose'

export type User = {
  _id: Number,
  email: string,
  password: string,
  name: string,
  lastName: string,
  profile: number,
  isDeleted?: boolean
}

export { CustomResponse as Response } from '../../helpers/types'