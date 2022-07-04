// @ts-check
import { Schema, model } from 'mongoose'

const AdTypeSchema = new Schema({
  _id: String,
  name: String,
  dimensions: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, versionKey: false })

export default model('AdType', AdTypeSchema)
