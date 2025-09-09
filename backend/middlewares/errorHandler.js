const errorHandler = (err, req, res, next) => {
    const response = {
        settings: {
            success: 0,
            message: err.message
        }
    }
    res.status(500).json(response);
}

export default errorHandler