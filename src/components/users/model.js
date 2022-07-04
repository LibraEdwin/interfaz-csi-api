// @ts-check
import { model, Schema } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const UserSchema = new Schema(
  {
    _id: Number,
    email: {
      type: String,
      unique: true,
      required: [true, 'email required']
    },
    password: {
      type: String,
      required: [true, 'password required']
    },
    name: String,
    lastName: String,
    profile: {
      type: Number,
      ref: 'Profile',
      default: 2
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
)

UserSchema.plugin(paginate)

const UserModel = model('User', UserSchema)

export default UserModel
