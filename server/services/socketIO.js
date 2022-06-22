let io = null;
let rooms = []
// {id, player1, player2, data}

function ioSocketServer(ioSocket) {
    io = ioSocket;
    io.on('connection', onConnection);
}

function generateId() {
    let id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    while (rooms.findIndex((room) => room.id === id) !== -1) {
        id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    }
    return id.toString();
};

function onConnection(socket) {
    console.log('New User connected');

    socket.on('room.create', (data) => {
        rooms.push({
            id: generateId(),
            player1: {id: data.id, name: data.name},
            player2: {id: '', name: ''},
            data: data.data,
        });
        console.log(rooms);
        io.to(data.id).emit('room.create.res', {status: "success"})
    })

    socket.on('room.join', (data) => {
        console.log(data)
        const index = rooms.findIndex((room) => room.id === data.roomId);
        if (index !== -1 && rooms[index].player2.id === '') {
            rooms[index].player2.id = data.id;
            rooms[index].player2.name = data.name;
            console.log(rooms);
            io.to(data.id).emit('room.join.res', {status: "success"})
        } else {
            io.to(data.id).emit('room.join.res', {status: "fail"})
        }
    })

    socket.on('room.ready', (data) => {
        console.log(data);
        const index = rooms.findIndex((room) => room.player2.id === data.id);
        if (index !== -1) {
            io.to(rooms[index].player1.id).emit('room.start', {
                roomId: rooms[index].id,
                data: rooms[index].data,
                color: 'blue',
            });
            io.to(rooms[index].player2.id).emit('room.start', {
                roomId: rooms[index].id,
                data: rooms[index].data,
                color: 'red',
            });
        } else {
            const index = rooms.findIndex((room) => room.player1.id === data.id);
            if (index !== -1) {
                io.to(rooms[index].player1.id).emit('room.start', {
                    roomId: rooms[index].id,
                    data: rooms[index].data,
                    color: 'none',
                });
            }
        }
    })

    socket.on('move', (data) => {
        console.log(data);
        // console.log(`Message from client: ${data.text}, whoose id is: ${data.from}`);
        io.to("452361").emit('on-text-change', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
}

module.exports = ioSocketServer;