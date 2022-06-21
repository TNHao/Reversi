const user = new Map();
class SocketServices {
  static find(username) {
    return user.get(username);
  }
  connection(socket) {
    socket.on('disconnect', () => {
      console.log(`User disconnect id: ${socket.id}`);
    });

    socket.on('register', (username) => {
      user.set(username, socket.id);
      console.log('Registered user: ' + username + ' ' + socket.id);
    });

    socket.on('move', (msg) => {
      const { username, target, move } = msg;
      const targetId = SocketServices.find(target);
      _io.to(targetId).emit('move', { username, move });
    });

    socket.on('timeup', (msg) => {
      const { username, target } = msg;
      const targetId = SocketServices.find(target);
      _io.to(targetId).emit('timeup', { msg: 'win' });
    });

    socket.on('pauseReq', (msg) => {
      const { username, target } = msg;
      const targetId = SocketServices.find(target);
      _io.to(targetId).emit('pauseReq', { username });
    });

    socket.on('pauseRes', (msg) => {
      const { username, target, response } = msg;
      const targetId = SocketServices.find(target);
      _io.to(targetId).emit('pauseRes', { username, response });
    });

    socket.on('updateRule', (msg) => {
      const { username, target, rule } = msg;
      const targetId = SocketServices.find(target);
      _io.to(targetId).emit('updateRule', { username, rule });
    });

    socket.on('start', (msg) => {
      const { username, target, rule } = msg;
      const targetId = SocketServices.find(target);
      _io.to(targetId).emit('start', { rule });
    });

    socket.on('quitRoom', (msg) => {
      const { username, target } = msg;
      const targetId = SocketServices.find(target);
      _io.to(targetId).emit('quitRoom');
    });
  }
}

module.exports = new SocketServices();
