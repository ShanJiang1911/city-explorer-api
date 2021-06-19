'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const getWeather = require('./routeHandlers/weather.js');
const app = express();






const axios = require('axios');

const { response } = require('express')
app.use(cors());
const PORT = process.env.PORT || 3002;

//Above are reuquired basics
//----------------------------------------


const getMovie = require('./routeHandlers/movie.js');

app.get('/', (req, res) => {
    res.send('hello from Hooah server!');
});

app.get('/weather', getWeather);

app.get('/movies', getMovie);

app.get('/*', (request, reponse) => {
    response.status(404).send('Looks like nothing here')
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

