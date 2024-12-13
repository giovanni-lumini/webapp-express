const express = require('express');
const cors = require('cors')
const server = express();
const moviesRouter = require('./routes/movies');

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || '3000';

server.use(express.json())
server.use(cors())

server.listen(PORT, () => {
    console.log(`Server is listening on port ${HOST}:${PORT}`);
})

//routes 
server.get('/', (req, res) => {
    res.send(`Server is up and running!`);
})

//movies routes 
server.use('/movies', moviesRouter);

