require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const errorHandler = require('./handlers/errorHandler');
const authRoutes = require('./routes/authRoutes');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/auth', authRoutes)

//Generic error handler
app.use((req, res, next) => {
    let error = new Error('Not Found');
    error.status = 404;
    next(error);
});


//Error handler
app.use(errorHandler);


//Start server on port 8081
app.listen(PORT, () => {
    console.log(`Server starting on port: ${PORT}`);
});