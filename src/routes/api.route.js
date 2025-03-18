const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { initTransactionRequest } = require('../middleware/validators/notificationValidator.middleware');
const notificationController = require('../controllers/notification.controller');
const merchantController = require('../controllers/merchant.controller');

const { createMerchantRequest, alterTokenRequest } = require('../middleware/validators/merchantValidator.middleware');

router.post('/transaction/init', auth('MERCHANT'), initTransactionRequest, awaitHandlerFactory(notificationController.initFromThirdParty));
router.post('/merchant/token/create', auth('ADMIN'), createMerchantRequest, awaitHandlerFactory(merchantController.createMerchantToken));
router.post('/merchant/token/suspend', auth('ADMIN'), alterTokenRequest, awaitHandlerFactory(merchantController.suspendMerchantToken));
router.post('/merchant/token/activate', auth('ADMIN'), alterTokenRequest, awaitHandlerFactory(merchantController.activateMerchantToken));

module.exports = router;