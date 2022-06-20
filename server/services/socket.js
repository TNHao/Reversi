const user = new Map();
class SocketServices {
  connection(socket) {
    socket.on('disconnect', () => {
      console.log(`User disconnect id: ${socket.id}`);
    });

    socket.on('register', (username) => {
      user.set(username, socket.id);
      console.log('Registered user: ' + username + ' ' + socket.id);
    });
  }
  find(username) {
    return user.get(username);
  }
}

module.exports = new SocketServices();
