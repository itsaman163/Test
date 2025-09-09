import dotenv from "dotenv";
dotenv.config();

export const config = {
    SECRET_KEY: process.env.SECRET_KEY || 'KEY',

}