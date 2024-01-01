import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AuthFailureResponse, BadRequest, ErrorResponse } from '../common/error.response.js';

const verifyToken = async (req, res, next) => {
   
    const token = req.headers['authorization']?.split(' ')[1];
    console.log(token);
    if (!token) {
        throw new AuthFailureResponse('Access denied');
    }
    let verified;
    try {
        verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        throw new AuthFailureResponse();
    }

    req.user = verified;
    next();
};

const checkRoles = (roles) => {
    return (req, res, next) => {
        const { user } = req;
        if (roles.indexOf(user.role) !== -1) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};
export {
    verifyToken,
    checkRoles,
};
