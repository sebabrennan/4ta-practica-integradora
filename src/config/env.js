import 'dotenv/config'

export default {
    SECRET_KEY: process.env.SECRET_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    PORT: process.env.PORT,
    EMAIL_ADMIN: process.env.EMAIL_ADMIN,
    PASS_ADMIN: process.env.PASS_ADMIN, 
    SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
    GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT,
    GMAIL_PASS: process.env.GMAIL_PASS,
}