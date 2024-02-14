import mongoose from 'mongoose'

const {Schema, model} = mongoose

const User = new Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  salt: {type: String, required: true},

  items: [{type: Schema.Types.ObjectId, ref: 'item'}],
  categories: [{type: Schema.Types.ObjectId, ref: 'category'}],
  wallets: [{type: Schema.Types.ObjectId, ref: 'wallet'}],
})

export default model('User', User)
