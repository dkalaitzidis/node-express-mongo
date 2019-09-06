const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('Home')
});




//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true },
    () => console.log('connected to DB')
);


//Start Server 
app.listen(3000);