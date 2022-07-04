// @ts-check
import { Schema, model } from 'mongoose'

const AdDetailsSchema = new Schema({
  _id: String,
  imagePath: String,
  adId: String,
  adType: String,
  active: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, versionKey: false })

export default model('AdDetail', AdDetailsSchema)
