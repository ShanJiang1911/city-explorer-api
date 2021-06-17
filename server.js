const express = require('express');

const app = express();

const axios = require('axios');

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3002;

const key = process.env.WEATHER_API_KEY

const movieKey = process.env.MOVIE_API_KEY

//Above are reuquired basics
//----------------------------------------

const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/current?key=${key}&lat=${lat}&lon=${lon}&format=json`);

const movieData = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${movieKey}`)

app.get('/', (req, res) => {
    res.send('hello from Hooah server!');
});

app.get('/movies', (req, res) => {

    let cityMovieData = movieData.find(city => city.city_name === searchQuery)
    
    let movieDataPrettified = cityMovieData.map(obj => new MovieShow(``))
    res.send(movieDataPrettified);

});

class MovieShow {
    constructor(movieName, movieDescription) {
        this.movieName = movieName;
        this.movieDescription = movieDescription;
    }
}



app.get('/weather', (req, res) => {
    //grab the data from the query
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;

    let cityWeatherData = weatherData.find(city => city.city_name === searchQuery);
    
    console.log(cityWeatherData);

    if (cityWeatherData === undefined) {
        res.status(500).send({error: 'Unsupported city'});
    } else {
        let cityDataPrettified = cityWeatherData.data.map(obj => new Forecast(`${obj.ob_time}, Temperature ${obj.app_temp}, Wind Speed ${obj.wind_spd} with ${obj.weather.description.toLowerCase()}`) )
        res.send(cityDataPrettified);
    }
});

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}






app.listen(PORT, () => console.log(`listening on port ${PORT}`));




// app.get('/potato', (request, response) => {
//     response.send('potatoes are delicious');
// });



// weatherArray.find(item => {
//     if(item.city_name === searchQuery){
//         //probably return whole weather set ie 'item'
//     return true;
//     } else {
//         //probably return error message
//         return false
//     }
// })

