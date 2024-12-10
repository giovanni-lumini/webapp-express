const express = require('express');
const server = express();
/* const MoviesRouter = require('./routes/movies'); */
/* const NotFound = require('./middlewares/NotFound') */
/* const ServerErrorsHandler = require('./middlewares/ServerErrorsHandler') */

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || '3001';

server.listen(PORT, () => {
    console.log(`Server is listening on port ${HOST}:${PORT}`);
})

//routes 
server.get('/', (req, res) => {
    res.send(`Server is up and running!`);
})

//movies routes 
/* server.use('/api/movies', MoviessRouter); */


//middleware: handle 404 errors with a catch all route
/* server.use(NotFound) */


//middleware: handle all 500 errors 
/* server.use(ServerErrorsHandler) */
