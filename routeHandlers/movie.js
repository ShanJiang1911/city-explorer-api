const axios = require('axios');

const movieKey = process.env.MOVIE_API_KEY

let getMovie = async(req, res) => {

    let city = req.query.city;
    try {
        let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}&page=1&include_adult=false`)
        res.send(movieData.data.results.map(movie => new MovieShow(movie)));
    } catch {
        res.status(500).send('Sorry, nothing here');
    }
};

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

module.exports = getMovie;