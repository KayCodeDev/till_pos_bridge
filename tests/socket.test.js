const net = require('net');
const socketServer = require('../src/socket.server');

describe('Socket Tests', () => {
    describe('connection', () => {
        it('should establish a connection', async () => {
            const socket = new net.Socket();
            socket.connect(3301, 'localhost', () => {
                expect(socket.remoteAddress).toBe('127.0.0.1');
                expect(socket.remotePort).toBe(3301);
            });
        });
    });

    describe('message handling', () => {
        it('should handle a valid message', async () => {
            const socket = new net.Socket();
            socket.connect(3301, 'localhost', () => {
                const message = JSON.stringify({ action: 'joining', tid: '123' });
                socket.write(message);
                expect(socket.read().toString()).toBe('Connected');
            });
        });

        it('should handle an invalid message', async () => {
            const socket = new net.Socket();
            socket.connect(3301, 'localhost', () => {
                const message = 'Invalid message';
                socket.write(message);
                expect(socket.read().toString()).toBe('Unable to connect, expected action not sent.');
            });
        });
    });
});