const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());

//Import Routes
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const storageRoute = require('./routes/fileupload');

app.use("/user", authRoute);
app.use('/posts', postsRoute);
app.use('/storage', storageRoute);

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