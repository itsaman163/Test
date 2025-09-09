

const apiSuccess = async (req, res, message, data = [], statusCode = 200, success = 1) => {

    var response = {
        settings: { success, message },
        data
    };
    return res.status(statusCode).send(response);
};

const apiFailure = async (req, res, message, statusCode = 200, error = {}) => {
    var response = {
        settings: { success: 0, message },
        data: [],
        error_trace: error
    };
    return res.status(statusCode).send(response);

};

export default { apiSuccess, apiFailure };