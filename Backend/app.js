// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors = require('cors');
const user = require('./routes/user.routes');
const film = require('./routes/film.routes');
const rating = require('./routes/rating.routes');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

mongoose.set('useFindAndModify', false);

//Setup mongoose connection
module.exports = mongoose.connect('mongodb://localhost:27017/TurmalinaFims', {useNewUrlParser: true, useCreateIndex: true}, async (err) => {
    if (err) console.log('Some problem with the connection ' + err);
    else console.log('The mongoose connection is ready');
});

// initialize our express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    req.producer = producer;

    return next();
});

let port = 3333;

app.use('/user', user);
app.use('/film', film);
app.use('/rating', rating);

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
