
const { checkValidation, respondSuccess, respondError } = require('../utils/common.utils');
const { getTime } = require('date-fns');
const notificationService = require('../services/notification.service');
const socketManager = require('../utils/socket.manager');


class NotificationController {
    initFromThirdParty = async (req, res, next) => {
        checkValidation(req);
        console.log("Transaction request", req.body);

        let { tid, amount, orderNumber, webhook, phoneNumber } = req.body;

        let notification = {
            amount,
            orderNumber,
        }

        if (phoneNumber !== undefined && phoneNumber !== "" && phoneNumber !== null) {
            notification.isMomo = true;
            notification.phoneNumber = phoneNumber;
        } else {
            notification.isMomo = false;
        }

        console.log(notification)

        const extra = {
            webhook,
            orderNumber,
            amount,
        }

        socketManager.updateSocketByTID(tid, extra)

        const toPos = notificationService.sendSocket(tid, notification);

        if (toPos.error) {
            return respondError(res, toPos.msg);
        }
        return respondSuccess(res, toPos.msg);

    }
}
module.exports = new NotificationController;