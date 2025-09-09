import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

const authentication = (req, res, next) => {
    try {
        const header_data = req.headers;
        if (!header_data?.authtoken) {
            throw new Error('Token is missing!!');
        }
        const user_data = jwt.verify(header_data?.authtoken, config.SECRET_KEY);
        req.user = user_data;
        next()
    } catch (error) {
        next(error);
    }
}

export default authentication;