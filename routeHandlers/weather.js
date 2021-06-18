const axios = require('axios');

const key = process.env.WEATHER_API_KEY

let getWeather = async(req, res) => {
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
}

class Forecast {
    constructor(forecastObj) {
        this.date = forecastObj.datetime;;
        this.description = `Low of ${forecastObj.low_temp}, high of ${forecastObj.high_temp} with ${forecastObj.weather.description.toLowerCase()}, Wind Speed ${forecastObj.wind_spd}`;
    };
};

module.exports = getWeather;
