import { Router } from 'express';
import { logger } from '../utils/logger.js';

const router = Router();

router.get("/", (req, res) => {
    logger.debug("Logger Test DEBUG")
    logger.http(`Logger test HHTP status: ${res.statusCode}`)
    logger.info("Logger Test INFO")
    logger.warning("Logger Test WARNING")
    logger.error("Logger Test ERROR")
    logger.fatal("Logger Test FATAL")
    res.send({ message: "Prueba de logger" })
})

export default router;