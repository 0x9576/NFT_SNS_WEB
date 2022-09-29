module.exports = function (socketIo) {
    socketIo.on("connection", (socket) => {
        socket.on("join", (roomName) => {
            socket.join(roomName);
        });

        socket.on("message", (request) => {
            socketIo.to(request.roomName).emit("message", request.message);
        });
    });
}