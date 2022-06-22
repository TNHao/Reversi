const app = require('./app');
const http = require('http');

const config = require('./utils/config');
const logger = require('./utils/logger');

const socketServer = require('socket.io').Server;
const server = http.createServer(app);

const io = new socketServer(server);

server.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});

io.on('connection', (socket) => {
  console.log('User connected');
});
