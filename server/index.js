const express = require('express')
const app = express()
const port = 2400;
const socketPort = 4800;

const cors = require("cors");
const { Server } = require("socket.io");
const server = require("http").createServer(app);
const socketIo = new Server(server);

const bodyParser = require('body-parser');

const config = require('./config/key') //Mongo db를 가져온다.

app.use(cors({ origin: "http://localhost:3000", credentials: true })); //front 허용

app.use(bodyParser.urlencoded({ extended: true }));//문자열로 된 것을 분석
app.use(bodyParser.json()); //Json타입으로 된 것을 분석

app.use('/api/feed', require('./routes/feed'));


app.use('/uploads', express.static('uploads'));


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
}).then(() => console.log('Mongo DB connected...'))
  .catch(err => console.log(err))

app.get('/api/test', (req, res) => {
  res.send("api test")
})

//소켓통신
socketIo.on("connection", (socket) => {
  socket.on("join", ({ roomName: room, userName: user }) => {
    socket.join(room);
    socketIo.to(room).emit("onConnect", `${user} 님이 입장했습니다.`);
  });

  socket.on("message", (messageItem) => {
    socketIo.to("room").emit("onReceive", messageItem);
  });

});

server.listen(socketPort, () => { console.log(`Socket listening on port ${socketPort}!`) });
app.listen(port, () => { console.log(`Server listening on port ${port}!`) })