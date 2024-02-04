class AppError extends Error {
    constructor(message, httpStatusCode) {
        super(message);
        this.name = 'AppError';
        this.httpStatusCode = httpStatusCode;
        this.status = `${httpStatusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);

    }
}


class ValidationError extends Error {
    constructor(message, httpStatusCode) {
        super(message, httpStatusCode);
        this.name = 'ValidationError';
        this.httpStatusCode = httpStatusCode || 400;
        this.status = 'fail';
    }
}

class UnAuthorizedError extends Error {
    constructor(message, httpStatusCode) {
        super(message);
        this.httpStatusCode = httpStatusCode || 401;
        this.status = 'fail'
    }
}

class DatabaseError extends Error {
    constructor(message, httpStatusCode) {
        super(message);
        this.httpStatusCode = httpStatusCode || 500;
        this.status = 'fail';
    }
}
module.exports = {
    AppError,
    ValidationError,
    UnAuthorizedError,
    DatabaseError,
}