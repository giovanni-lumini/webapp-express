const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesControllers.js')

//all movies
router.get("/", moviesController.index)

//single movie
router.get("/:id", moviesController.show)

module.exports = router;