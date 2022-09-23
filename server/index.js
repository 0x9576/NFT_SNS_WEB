const express = require('express')
const app = express()
const port = 2400;

const cors = require("cors");

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

const { Server } = require("socket.io");
const server = require("http").createServer(app);
const socketIo = new Server(server);

//소켓통신
socketIo.on("connection", (socket) => {
  socket.on("message", (message) => {
    socketIo.emit("message", message);
  });
});

server.listen(port, () => { console.log(`Server listening on port ${port}!`) })