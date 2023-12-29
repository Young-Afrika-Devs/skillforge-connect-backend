export const errorHandler = (error, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const data = err.data || [];

    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        // Mongoose validation error
        statusCode = 400;
        message = 'Validation failed';
        data = Object.values(err.errors).map(e => e.message);
    } else if (err.name === 'CastError') {
        // Mongoose invalid ObjectId error
        statusCode = 400;
        message = 'Invalid ID format';
    } else if (err.name === 'MongoError' && err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field error';
    }

    // Send the error response
    res.status(statusCode).json({
        status: 'error',
        message,
        data
    });
}

export default errorHandler;