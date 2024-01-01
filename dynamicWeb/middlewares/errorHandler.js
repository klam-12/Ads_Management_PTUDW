import chalk from 'chalk'; // For colored console output
import { ErrorResponse } from '../common/error.response.js'; // Custom error response class
import pick from '../utils/pick.js'; // Utility function to pick specific properties from an object

export const errorHandler = (error, req, res, next) => {

    // If the error is not of custom ErrorResponse type and environment is not 'production'
    if (!(error instanceof ErrorResponse) && process.env.NODE_ENV !== 'production') {
        // Log a system error message to console in red
        console.log(chalk.bgRed('System error!'));

        error = {
            code: 500,
            message: 'Internal Server Error',
            errors: null,
        };
    }

    // Extract error properties
    const { code, message, errors } = error;

    // Send error response to the client
    res.status(code).json({
        status: 'Error',
        message,
        code,
        errors,
    });
};
