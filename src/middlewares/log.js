import { logger } from "../utils/logger.js";

export const addLogger = (req, res, next) => {
    req.logger = logger;
    logger.http(`${res.statusCode} ${req.method} en ${req.url}`)
    next();
}