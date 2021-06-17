const express = require('express');
const app = express();

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3002;

//Above are reuquired basics
//----------------------------------------

const weatherData = require('./data/weather.json');


app.get('/', (req, res) => {
    res.send('hello from Hooah server!');
});

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
        let cityDataPrettified = cityWeatherData.data.map(obj => new Forecast(obj.datetime, `Low of ${obj.low_temp}, high of ${obj.max_temp} with ${obj.weather.description.toLowerCase()}`) )
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

