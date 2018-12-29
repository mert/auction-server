import * as mongoose from 'mongoose'
import * as moment from 'moment'
import { BaseSchema } from './base-schema'
import { IBid } from './bid'

export interface IAuction extends mongoose.Document {
    deadline: Date,
    active: boolean,
    latestBid?: IBid
}

const schema = new BaseSchema({
    deadline: {
        default: moment().add(1, 'hours').toDate(),
        type: Date,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    latestBid: {
        ref: 'Bid',
        type: mongoose.Schema.Types.ObjectId,
    },
  })

export const Auction = mongoose.model<IAuction>('Auction', schema)
