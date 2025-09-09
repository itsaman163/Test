const authorization = (req, res, next) => {
    try {
        // console.log(req.body.user_data);
        next()
    } catch (error) {
        next(error);
    }
}

export default authorization;