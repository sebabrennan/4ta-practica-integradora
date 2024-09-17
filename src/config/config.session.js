import mongoStore from "connect-mongo";
import 'dotenv/config';
import config from './env.js'

export const configSession = {
  secret: config.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000,
  },
  store: new mongoStore({
    mongoUrl: process.env.MONGO_URL ,
    ttl: 180,
  }),
};
