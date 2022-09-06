module.exports = function (socketIo) {
    socketIo.on("connection", (socket) => {
        socket.on("message", (message) => {
            socketIo.emit("message", message);
        });
    });
}