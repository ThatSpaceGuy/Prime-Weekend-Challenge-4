var verbose = true; // if (verbose) {console.log('');}
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
//// --------NEED TO ENTER ***: Database Name
var connectionString = 'postgress://localhost:5432/***';

app.use(bodyParser.urlencoded( {extended: false } ));
app.use(bodyParser.json());

var portDecision = process.env.PORT || 3000;
// spin up server
app.listen(portDecision, function(){
  if (verbose) {console.log('Server is listening on Heroku or port 3000');}
});

// base url hit
app.get('/', function(req,res){
  if (verbose) {console.log('base url hit');}
  res.sendFile(path.resolve('public/index.html'));
});

// setup 'public' as a static resource
app.use(express.static('public'));

// GET route with a Database call
app.get('/getRoute', function(req,res){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    } else {
      if (verbose) {console.log('app.get/getRoute connected');}
      var resultsArray=[];
      //// --------NEED TO ENTER ***: SQL Query
      var queryResults=client.query('***');
      queryResults.on('row',function(row){
        resultsArray.push(row);
      });
      if (verbose) {console.log('resultsArray from getRoute query:',resultsArray);}
      queryResults.on('end',function(){
        done();
        return res.send(resultsArray);
      }); // end queryResults.on('end')
    }// end else
  }); // end pg.connect
}); // end app.get getRout


// post route to receive information from client
app.post('/routeName', urlEncodedParser, function(req,res){
  if (verbose) {console.log('Route /routeName hit', req.body);}
  res.send('/routeName response. Received: '+req.body);
});

//post route to add or update information in Database
app.post( '/postRouteA', urlencodedParser, function( req, res ){
  if (verbose) {console.log( 'postRouteA route hit', req.body );}
  //// --------NEED TO ENTER ***: SQL Query
  var queryString = '***';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString);
      done();
      return res.sendStatus(200);
    }
  });
});//end /postRouteA

// post route that adds or updates information in Database and also receives info
app.post( '/postRouteB', urlencodedParser, function( req, res ){
  if (verbose) {console.log( 'postRouteB route hit', req.body );}
  //// --------NEED TO ENTER ***: SQL Query
  var queryString = '***';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString);
      //// --------NEED TO ENTER ***: SQL Query
      var queryResult = client.query('***');
      var resultsArray = [];
      queryResult.on('row', function(row){
        resultsArray.push(row);
      });
      queryResult.on('end', function(){
        if (verbose) {console.log(resultsArray);}
        done();
        return res.json(resultsArray);
      });
    }
  });
});//end /postRouteB
