const common = require("../utils/common.utils");
const socketManager = require("../utils/socket.manager");

class NotificationService {
    sendWebhook = async (extra, notification) => {
        console.log(extra);
        notification.orderNumber = extra.orderNumber;
        const data = {
            event: "transaction",
            data: notification
        }

        const url = extra.webhook;
        const headers = {
            Authorization: "Bearer " + process.env.POS_TOKEN,
            "Content-Type": "application/json"
        }

        console.log("sending webhook notification to webhook (" + extra.webhook + ")")

        const response = await common.sendPost(url, data, { headers });
        console.log(`Response for webhook ${extra.webhook}`, response);
    }

    sendSocket = (tid, notification) => {

        try {
            const socket = socketManager.getSocketByTID(tid);
            if (socket !== undefined) {
                socket.socket.write(JSON.stringify(notification))
                console.info(`Data sent to ${tid} on socket`);
                return { error: false, msg: `Transaction notification sent to terminal ${tid} on socket. Webhook will be sent on completion` };
            } else {
                console.error(`No socket connection found for ${tid}`);
                return { error: true, msg: `No socket connection found for ${tid}` };
            }

        } catch (e) {
            console.log(e);
            console.log("unable to send socket notification")
            return { error: true, msg: "unable to send socket notification" };
        }

    }
}

module.exports = new NotificationService;