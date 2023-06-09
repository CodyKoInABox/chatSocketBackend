const io = require('socket.io')(3000, {
    cors: {
      origin: '*'
    }
  })

const users = {}

io.on('connection', socket => {
    socket.on('newUser', username =>{
        users[socket.id] = username
        io.emit('userConnected', {
            username: username,
            userCount: Object.keys(users).length
        })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', users[socket.id])
        delete users[socket.id]
    })
    socket.on('sendChatMessage', message => {
        socket.broadcast.emit('chatMessage', {
            message: message,
            username: users[socket.id]
        })
    })
})