const express = require('express')
const app = express()
const port = 2400

const bodyParser = require('body-parser');

const config = require('./server/config/key') //Mongo db를 가져온다.

app.use(bodyParser.urlencoded({ extended: true }));//문자열로 된 것을 분석
app.use(bodyParser.json()); //Json타입으로 된 것을 분석

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
}).then(() => console.log('Mongo DB connected...'))
  .catch(err => console.log(err))

app.get('/api/test', (req, res) => {
  res.send("api test")
})


app.listen(port, () => { console.log(`Example app listening on port ${port}!`) })