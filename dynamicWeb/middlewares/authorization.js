import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AuthFailureResponse, BadRequest, ErrorResponse } from '../common/error.response.js';

const authentication = async (req, res, next) => {
   
    if(req.session.auth) {
        return next();
    }
    else {
        res.redirect('/auth/signIn');
    }
};

const checkRoles = (roles) => {
    return (req, res, next) => {
        const user = req.session.authUser;
        if (roles.indexOf(user.role) !== -1) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    };
};
export {
    authentication,
    checkRoles,
};
