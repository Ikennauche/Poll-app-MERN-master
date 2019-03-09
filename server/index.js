//const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

const {errorHandler,notFound} = require('./handlers/index');

const app =  express();
const port = process.env.PORT || 3000;
const db = require('./models');
    
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth',routes.auth);
app.use('/api/poll',routes.poll);

app.get('/',(req,res) => {
	res.send(process.env.SECRET);
    //res.json({
      //  hello:'world'
    //});
});

app.use(notFound);
app.use(errorHandler);
     

app.listen(port,() => {
    console.log(`running on port ${port}`);
});