// @ts-check
import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const NewsSchema = new Schema({
  _id: Number,
  title: {
    type: String,
    required: [true, 'El título es requerido']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'La imagen destacada es requerida']
  },
  excerpt: String,
  content: [String],
  permalink: {
    type: String,
    required: [true, 'El enlace permanente es requerido']
  },
  keywords: [String],
  linkVideo: String,
  tags: [{
    type: Number,
    ref: 'Tag'
  }],
  author: {
    type: Number,
    ref: 'User'
  },
  visibility: {
    type: Boolean,
    default: true
  },
  ad: {
    type: Number,
    ref: 'Ad'
  },
  gallery: {
    image1: { type: String, default: null },
    image2: { type: String, default: null },
    image3: { type: String, default: null },
    image4: { type: String, default: null }
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
})

NewsSchema.plugin(paginate)

export default model('News', NewsSchema)
