const errorHandler = (err, req, res, next) => {
    return API_RESPONSE.apiFailure(req, res, err.message, 500);
}

export default errorHandler