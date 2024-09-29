import {Schema, model} from 'mongoose'
import { fechaHora } from '../../utils/utils.js';


const usersSchema = new Schema({
  first_name: {
      type: String,
      required: true
  },
  last_name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  age: {
      type: Number,
      required: true
  },
  password: { 
      type: String,
      required: true
  },
  role: {
      type: String,
      default: 'user',
      required: true
  },
  image: {
    type: String
  },
  isGithub: {
      type: Boolean,
      default: false
  },
  isGoogle: {
    type: Boolean,
    required: true,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
    default: []
  },
  last_connection: {
    type: Date,
    //default: new Date().toLocaleString('es-ES',{
      //hour12: false
    //})
  },
  active: {
    type: Boolean,
    default: true
  }
});

export const UserModel = model('users',usersSchema)
