const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const { response } = require('express')
app.use(cors());
const PORT = process.env.PORT || 3002;
const key = process.env.WEATHER_API_KEY
const movieKey = process.env.MOVIE_API_KEY

//Above are reuquired basics
//----------------------------------------

app.get('/', (req, res) => {
    res.send('hello from Hooah server!');
});

app.get('/weather', async(req, res) => {
    //grab the data from the query
    let lat = req.query.lat;
    let lon = req.query.lon;
    let weatherData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${lat}&lon=${lon}`);
    console.log(weatherData.data);
    try {
        let cityDataPrettified = weatherData.data.data.map(obj => new Forecast(obj));
        res.send(cityDataPrettified);
        }
    catch {
        res.status(500).send({error: 'Unsupported city'});
    } 
});

class Forecast {
    constructor(forecastObj) {
        this.date = forecastObj.datetime;;
        this.description = `Low of ${forecastObj.low_temp}, high of ${forecastObj.high_temp} with ${forecastObj.weather.description.toLowerCase()}, Wind Speed ${forecastObj.wind_spd}`;
    };
};

app.get('/movies', async(req, res) => {

    let city = req.query.city;
    try {
        let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}&page=1&include_adult=false`)
        res.send(movieData.data.results.map(movie => new MovieShow(movie)));
    } catch {
        res.status(500).send('Sorry, nothing here');
    }
});

class MovieShow {
    constructor(movieObject) {
        this.title = movieObject.title;
        this.overview=movieObject.overview;
        this.average_votes=movieObject.vote_average;
        this.total_votes=movieObject.vote_count;
        this.image_url=`https://image.tmdb.org/t/p/w500${movieObject.poster_path}`;
        this.popularity=movieObject.popularity;
        this.release_date=movieObject.release_date
    }
}

app.get('/*', (request, reponse) => {
    response.status(404).send('Looks like nothing here')
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

