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
                ...movieResults[0],
                reviews: reviewsResults
            }

            res.json(movieReviews)
        })
    })
}

//POST-REVIEW
function postReview(req, res) {
    const movie_id = Number(req.params.id)
    const { name, vote, text } = req.body
    const now = new Date()
    console.log(now);
    const created_at = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`
    console.log(created_at);

    //sql query
    const sql = "INSERT INTO `reviews` SET movie_id=?, name=?, vote=?, created_at=?, text=?"

    connection.query(sql, [movie_id, name, vote, created_at, text], (err, result) => {
        if (err) return res.status(500).json({ error: err })
        return res.status(201).json({ success: true })
    })
}

module.exports = {
    index,
    show,
    postReview
}