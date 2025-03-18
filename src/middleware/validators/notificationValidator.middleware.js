const { body } = require('express-validator');


exports.initTransactionRequest = [
    body('tid')
        .exists()
        .withMessage('Terminal ID is required'),
    body('amount')
        .exists()
        .withMessage('Transaction amount is required'),
    body('orderNumber')
        .exists()
        .withMessage('Order number is required'),
    body('webhook')
        .exists()
        .withMessage('Webhook is required'),
    body('phoneNumber')
        .optional()
        .isLength({ min: 10, max: 10 })
        .withMessage('Valid phone number is required'),
];

