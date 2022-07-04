export type Ad = {
  _id: String,
  dateAd: Date,
  nameAd: String,
  active: Boolean,
  isDeleted: Boolean
}

export { CustomResponse as Response } from '../../helpers/types'