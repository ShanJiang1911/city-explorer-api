const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const { response } = require('express')
app.use(cors());
const PORT = process.env.PORT || 3002;

//Above are reuquired basics
//----------------------------------------


const getWeather = require('./routeHandlers/weather.js');

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

