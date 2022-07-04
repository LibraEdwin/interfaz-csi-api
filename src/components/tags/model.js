// @ts-check
import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const TagSchema = new Schema({
  _id: Number,
  name: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true, versionKey: false })

TagSchema.plugin(paginate)

export default model('Tag', TagSchema)
