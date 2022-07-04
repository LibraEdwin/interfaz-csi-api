// @ts-check
import { Schema, model } from 'mongoose'

const ProfileSchema = new Schema({
  _id: Number,
  name: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, versionKey: false })

export default model('Profile', ProfileSchema)
