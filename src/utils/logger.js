import winston, { format } from "winston";

const { combine, colorize, timestamp, printf, align, json } = format;

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red bold',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'cyan',
        debug: 'magenta'
      }
}

const logConfig = {
    levels: customLevelsOptions.levels,
    format: combine(
        timestamp({
            format: "MM-DD-YYYY HH:mm:ss A"
        }),
        colorize({ colors: customLevelsOptions.colors}),
        align(),
        json(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({ level: "debug" }),
        new winston.transports.File({
            filename: "./logs/logger.log",
            level: "error",
        })
    ]
    
}

export const logger = winston.createLogger(logConfig);