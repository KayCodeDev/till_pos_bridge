const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const apiRouter = require('./routes/api.route');
const socketServer = require("./socket.server");

// Init express
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.options("*", cors());

const port = Number(process.env.PORT || 9091);

app.use(`/api/v1`, apiRouter);

app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Not Found');
    next(err);
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`🚀 API Server running on port ${port}`);
    socketServer.startServer();
});

module.exports = app;