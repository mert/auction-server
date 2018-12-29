import * as mongoose from 'mongoose'
import * as _ from 'lodash'

export class BaseSchema extends mongoose.Schema {
  constructor(obj: mongoose.SchemaDefinition, prefix?: string) {
    super()
    this.add(obj, prefix)
  }
}
