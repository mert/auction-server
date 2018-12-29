import * as mongoose from 'mongoose'
import { BaseSchema } from './base-schema'

export interface IUser extends mongoose.Document {
    name: string
}

const userSchema = new BaseSchema({
    name: {
        required: [true, 'name is required'],
        type: String,
    },
  })

export const User = mongoose.model<IUser>('User', userSchema)
