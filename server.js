console.log('this is my server');

const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT;

const weatherDate = require('./data/weather.json');


app.get('/', (request, response) => {
    response.send('hello from the server!');
});

app.get('/weather', (request, response) => {
    console.log(request.query);
    const {lat, lon, searchQuery}=request.query
    response.send('weather I like')
})


app.get('/potato', (request, response) => {
    response.send('potatoes are delicious');
});

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});

weatherArray.find(item => {
    if(item.city_name === searchQuery){
        //probably return whole weather set ie 'item'
    return true;
    } else {
        //probably return error message
        return false
    }
})

