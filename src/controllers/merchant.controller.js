const { checkValidation, respondSuccess, respondError, isTokenInvalid, modifyInvalidToken } = require('../utils/common.utils');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

class MerchantController {
    createMerchantToken = async (req, res, next) => {
        checkValidation(req);
        console.log("Create Merchant Token", req.body);

        let { merchant } = req.body;

        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ merchant }, secretKey, {
            expiresIn: '1y'
        });

        return respondSuccess(res, "Merchant token created successfully", {
            merchant: merchant,
            token: token,
        });
    }

    suspendMerchantToken = async (req, res, next) => {
        checkValidation(req);

        console.log("Supend Merchant Token", req.body);

        let { token } = req.body;

        const secretKey = process.env.SECRET_JWT || "";
        try {
            jwt.verify(token, secretKey);
        } catch (e) {
            return respondError(res, "Invalid merchant token");
        }

        if (isTokenInvalid(token)) {
            return respondError(res, "Merchant token already suspended");
        }

        modifyInvalidToken(token, 'add');

        return respondSuccess(res, "Merchant token suspended successfully");
    }

    activateMerchantToken = async (req, res, next) => {
        checkValidation(req);

        console.log("Activate Merchant Token", req.body);

        let { token } = req.body;

        const secretKey = process.env.SECRET_JWT || "";
        try {
            jwt.verify(token, secretKey);
        } catch (e) {
            return respondError(res, "Invalid merchant token");
        }

        if (!isTokenInvalid(token)) {
            return respondError(res, "Merchant token already active");
        }
        modifyInvalidToken(token, 'remove');

        return respondSuccess(res, "Merchant token activated successfully");
    }
}
module.exports = new MerchantController()