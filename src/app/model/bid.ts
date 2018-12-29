import * as mongoose from 'mongoose'
import * as moment from 'moment'
import { BaseSchema } from './base-schema'
import { IUser } from './user'
import { IAuction } from './auction'

export interface IBid extends mongoose.Document {
    user?: IUser
    auction?: IAuction
    createdAt: Date,
    amount: number
}

const schema = new BaseSchema({
    user: {
        index: true,
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    auction: {
        index: true,
        ref: 'Auction',
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    amount: {
        type: Number,
        required: true,
    },
  })

export const Bid = mongoose.model<IBid>('Bid', schema)
