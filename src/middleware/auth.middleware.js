const HttpException = require('../utils/HttpException.utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { isTokenInvalid } = require('../utils/common.utils');
dotenv.config();

const auth = (role) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'No credentials sent!');
            }

            const token = authHeader.replace(bearer, '');

            if (role == "MERCHANT") {
                const secretKey = process.env.SECRET_JWT || "";
                const decoded = jwt.verify(token, secretKey);

                if (isTokenInvalid(token)) {
                    throw new HttpException(401, 'Token suspended or invalid');
                }

                req.merchant = decoded.merchant;
                next();
            }
            else if (role == "ADMIN") {
                if (token !== process.env.ADMIN_TOKEN) {
                    throw new HttpException(401, 'Invalid token!');
                } else {
                    next();
                }
            }

        } catch (e) {
            console.log(e)
            e.status = 401;
            e.message = "Authentication failed. " + e.message;
            next(e);
        }
    }
}

module.exports = auth;