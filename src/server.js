import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils/utils.js";
import "./db/dbConfig.js";
import configEnv from "./config/env.js"
import { configSession } from "./config/config.session.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import passport from "passport";
import "./passport/local.js";
import "./passport/github.js";
import handlebars from "express-handlebars";
//import morgan from 'morgan';
import MainRouter from "./routes/index.js";
import config from "../config.js"
import { addLogger } from "./middlewares/log.js";

const app = express();

const mainRouter = new MainRouter();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(session(configSession))
  .use(express.static(__dirname + "/public"))
  .use(passport.initialize())
  .use(passport.session())
  .use(addLogger)
  .use("/api", mainRouter.getRouter())
  .use(errorHandler)

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


const PORT = configEnv.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT} in ${config.NODE_ENV} mode`);
});