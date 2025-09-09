import jwt from "jsonwebtoken";

const authentication = (req, res, next) => {
    try {

        const header_data = req.headers;

        if (!header_data?.token) {
            throw new Error('Token is missing!!');
        }
        const user_data = jwt.verify(header_data?.token, 'PMS@)@#');
        
        next()
    } catch (error) {
        next(error);
    }
}

export default authentication;