const authorization = (req, res, next) => {
    try {
        if (req.user.role === 'user') return API_RESPONSE.apiSuccess(req, res, 'User can not Add/Update/Delete record!!', '', 403);
        next()
    } catch (error) {
        next(error);
    }
}

export default authorization;