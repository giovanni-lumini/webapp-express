const connection = require("../database/connection");

//INDEX
function index(req, res) {
    connection.query(`SELECT * FROM movies`, (err, results) => {
        if (err) return res.status(500).json({ err: err })

        res.json({
            movies: results,
            count: results.length
        })
    })
}

//SHOW
function show(req, res) {

    const id = req.params.id
    const movieSql = `SELECT * FROM movies WHERE id = ?`;

    //reviews for a movie
    const reviewsSql = `SELECT * FROM reviews WHERE movie_id=?`

    //movie by id
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ err: err })
        if (movieResults.length == 0) return res.status(404).json({ err: 'movie not found' })
        //console.log(movieResults);

        //reviews for the movie id
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ err: err })
            //console.log(reviewsResults);

            const movieReviews = {
                ...results[0],
                reviews: reviewsResults
            }

            res.json(movieReviews)
        })
    })
}

module.exports = {
    index,
    show
}