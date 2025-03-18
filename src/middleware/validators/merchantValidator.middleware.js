const { body } = require('express-validator');


exports.createMerchantRequest = [
    body('merchant')
        .exists()
        .withMessage('Merchant name is required')
];

exports.alterTokenRequest = [
    body('token')
        .exists()
        .withMessage('Token is required')
];

