const handleAppError = (err, req, res, next) => {
    console.log("into app handler:::::::::::::::::::::::::::::::::::::::::::::::::::")
    if (err.name === 'AppError') {
        return res.status(err.httpStatusCode).json({ status: err.status, message: err.message });
    }
};



//::::::::::::::::::::::::::::::useful::::::::::::::::::::::::::::
const handleValidationError = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(err.httpStatusCode).json({ status: err.status, message: err.message });
    }
};

module.exports = {
    handleValidationError: handleValidationError,
    handleAppError: handleAppError,
}