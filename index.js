const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/drivergo');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

let db = mongoose.connection;

// check connection
db.once('open', function(){
    console.log('Connected to mongodb');
});


app.use(bodyParser.json());

//Initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
   // console.log(err);
    res.status(422).send({error: err.message});
});


/*
app.get('/api', function(req, res){
  console.log('GET requests');
  res.send({name: 'Chidough'});
});
*/

// listen for request
app.listen(process.env.port || 4000, function(){
  console.log('Now listening for requests');
});