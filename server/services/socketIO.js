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
        const roomId = generateId()
        rooms.push({
            id: roomId,
            player1: {id: data.id, name: data.name},
            player2: {id: '', name: ''},
            data: data.data,
        });
        console.log(rooms);
        io.to(data.id).emit('room.create.res', {status: "success", roomId, data: data.data})
    })

    socket.on('room.join', (data) => {
        console.log(data)
        const index = rooms.findIndex((room) => room.id === data.roomId);
        if (index !== -1 && rooms[index].player2.id === '') {
            rooms[index].player2.id = data.id;
            rooms[index].player2.name = data.name;
            console.log(rooms);
            io.to(data.id).emit('room.join.res', {status: "success", roomId: rooms[index].id, data: rooms[index].data})
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
        const index = rooms.findIndex((room) => room.player2.id === data.id);
        if (index !== -1 && rooms[index].player1.id !== '') {
            io.to(rooms[index].player1.id).emit('move', {
                from: data.from,
                to: data.to,
            });
            io.to(rooms[index].player2.id).emit('move', {
                from: data.from,
                to: data.to,
            });
        } else {
            const index = rooms.findIndex((room) => room.player1.id === data.id);
            if (index !== -1 && rooms[index].player2.id !== '') {
                io.to(rooms[index].player1.id).emit('move', {
                    from: data.from,
                    to: data.to,
                });
                io.to(rooms[index].player2.id).emit('move', {
                    from: data.from,
                    to: data.to,
                });
            }
        }
    });

    socket.on('tie', (data) => {
        console.log('tie', data);
        const index = rooms.findIndex((room) => room.player2.id === data.id);
        if (index !== -1 && rooms[index].player1.id !== '') {
            io.to(rooms[index].player1.id).emit('tie', {tieId: data.tieId});
        } else {
            const index = rooms.findIndex((room) => room.player1.id === data.id);
            if (index !== -1 && rooms[index].player2.id !== '') {
                io.to(rooms[index].player2.id).emit('tie', {tieId: data.tieId});
            }
        }
    });

    socket.on('tie.res', (data) => {
        console.log('tie.res', data);
        const index = rooms.findIndex((room) => room.player2.id === data.id);
        if (index !== -1 && rooms[index].player1.id !== '') {
            io.to(rooms[index].player1.id).emit('tie.res', {status: 'success', tieResId: data.tieId});
        } else {
            const index = rooms.findIndex((room) => room.player1.id === data.id);
            if (index !== -1 && rooms[index].player2.id !== '') {
                io.to(rooms[index].player2.id).emit('tie.res', {status: 'success', tieResId: data.tieId});
            }
        }
    });

    socket.on('close', (data) => {
        console.log(data.id + ' close');
        const index = rooms.findIndex((room) => room.player2.id === data.id);
        if (index !== -1 && rooms[index].player1.id !== '') {
            io.to(rooms[index].player1.id).emit('close', {closeId: data.closeId});
        } else {
            const index = rooms.findIndex((room) => room.player1.id === data.id);
            if (index !== -1 && rooms[index].player2.id !== '') {
                io.to(rooms[index].player2.id).emit('close', {closeId: data.closeId});
            }
        }
    });

    socket.on('disconnect', () => {
        // clientId = socket.id;
        // const index = rooms.findIndex((room) => room.player2.id === clientId);
        // if (index !== -1) {
        //     rooms.splice(index, 1);
        // } else {
        //     const index = rooms.findIndex((room) => room.player1.id === clientId);
        //     if (index !== -1) {
        //         rooms.splice(index, 1);
        //     }
        // }
        // console.log(rooms);
        console.log('User disconnected ' + socket.id);
    });
}

module.exports = ioSocketServer;