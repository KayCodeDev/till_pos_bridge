class SocketManager {
    constructor() {
        this.sockets = [];
    }

    addSocket(key, tid, socket) {
        const index = this.sockets.findIndex(item => item.tid === tid);

        const data = {
            key,
            socket,
            tid: tid
        }
        if (index !== -1) {
            data.extra = this.sockets[index].extra
            this.sockets.splice(index, 1);
        }
        this.sockets.push(data);

    }

    removeSocket(key) {
        const index = this.sockets.findIndex(item => item.key === key);

        if (index !== -1) {
            this.sockets.splice(index, 1);
        }
    }

    getSocketByTID(tid) {
        const index = this.sockets.findIndex(item => item.tid === tid);
        if (index !== -1) {
            return this.sockets[index];
        }
        return undefined;
    }

    updateSocketByTID(tid, extra) {
        const index = this.sockets.findIndex(item => item.tid === tid);
        if (index !== -1) {
            const data = {
                key: this.sockets[index].key,
                socket: this.sockets[index].socket,
                tid: this.sockets[index].tid,
                extra
            }

            this.sockets.splice(index, 1);

            this.sockets.push(data);
        }
    }

    getSocketByKey(key) {
        const index = this.sockets.findIndex(item => item.key === key);
        if (index !== -1) {
            return this.sockets[index].socket;
        }
        return undefined;
    }
}

module.exports = new SocketManager();