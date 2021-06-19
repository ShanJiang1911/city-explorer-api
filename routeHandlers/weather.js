const axios = require('axios');
const key = process.env.WEATHER_API_KEY

//this cache holds requests to weather.api
//key: lat, lon
//value: {
//      timestamp: when the data was saved
//      array of weather data ready to send to client
//}
let cache = {};

let getWeather = async(req, res) => {
    //grab the data from the query
    let lat = req.query.lat;
    let lon = req.query.lon;
    if(cache[lat,lon] && 
        Date.now() - cache[lat,lon].timestamp < (1000 * 10)) {
        //cache hit. request was make and data stored in our cache
        console.log('This data from the cache!');
        res.send(cache[lat,lon].weather);
    } else {
        //we don't have the cache, so search it!
        //and store the data in the cache
        console.log('no cache, getting data from api website')
        let weatherData = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily?key=${key}&lat=${lat}&lon=${lon}`);
        console.log(weatherData.data);
        //save the weather data into the cache for next time
        cache[lat,lon] = {
            timestamp: Date.now(),
            weather: weatherData
        }
        
        try {
        let cityDataPrettified = weatherData.data.data.map(obj => new Forecast(obj));
        res.send(cityDataPrettified);
        }
        catch {
        res.status(500).send({error: 'Unsupported city'});
        } 
    } 
}

class Forecast {
    constructor(forecastObj) {
        this.date = forecastObj.datetime;;
        this.description = `Low of ${forecastObj.low_temp}, high of ${forecastObj.high_temp} with ${forecastObj.weather.description.toLowerCase()}, Wind Speed ${forecastObj.wind_spd}`;
    };
};

module.exports = getWeather;
