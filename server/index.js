// const { server, io } = require('./app');
const app = require('./app');
const http = require('http');
const config = require('./utils/config');
// const logger = require('./utils/logger');

// const socketServer = require('socket.io').Server;
// const server = http.createServer(app);

// const io = new socketServer(server);

// server.listen(config.PORT, () => {
//   logger.info(`Server is running on port ${config.PORT}`);
// });

// // io.on('connect', (socket) => {
// //   console.log('User connected');
// // });
// // const io = require('socket.io')(5000);

const server = http.createServer(app);

const io = require('socket.io')(server, { cors: { origin: '*' } });
const ioSocketServer = require('./services/socketIO');
ioSocketServer(io);

// events will go here...
// io.on('connection', (socket) => {
//     console.log('New User connected');

//     socket.on('move', (data) => {
//         console.log(data);
//         // console.log(`Message from client: ${data.text}, whoose id is: ${data.from}`);
//         io.to("452361").emit('on-text-change', data);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// const PORT = 3001; // process.env.PORT || 80;
const URL = `http://localhost:${config.PORT}/`;

server.listen(config.PORT, () => console.log(`Listening on ${URL}`));