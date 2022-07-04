// @ts-check
import { Schema, model } from 'mongoose'

const AdSchema = new Schema({
  _id: String,
  dateAd: Date,
  nameAd: String,
  active: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, versionKey: false })

export default model('Ad', AdSchema)
