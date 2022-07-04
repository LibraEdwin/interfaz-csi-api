export type AdDetail = {
  _id: String,
  imagePath: String,
  adId: String,
  adType: String,
  active: Boolean,
  isDeleted: Boolean
}

export { CustomResponse as Response } from '../../helpers/types'