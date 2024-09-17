import { Router } from "express";
import usersRouter from "./users.router.js"
import productRouter from "./product.router.js"
import cartRouter from "./cart.router.js"
import ticketRouter from './ticket.router.js';
import loggerRouter from "./logger.router.js";
//import viewsRouter from "./views.router.js"

export default class MainRouter {
    constructor(){
        this.router = Router();
        this.init();
    }

    init(){
        this.router.use("/products", productRouter)
        this.router.use("/carts", cartRouter)
        this.router.use("/users", usersRouter)
        this.router.use('/ticket', ticketRouter)
        this.router.use("/loggerTest", loggerRouter)
    }

    getRouter(){
        return this.router;
    }
}