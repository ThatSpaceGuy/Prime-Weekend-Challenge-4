var verbose = true; // if (verbose) {console.log('');}
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/ToDoAppDB';

// Middleware Declarations
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
app.get('/getTasks', function(req,res){
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    } else {
      if (verbose) {console.log('app.get/getTasks connected');}
      var resultsArray=[];
      var queryResults=client.query('SELECT * FROM todolist ORDER BY id;');
      console.log('queryResults:', queryResults);
      queryResults.on('row',function(row){
        resultsArray.push(row);
      });
      queryResults.on('end',function(){
        if (verbose) {console.log('resultsArray from getTasks query:',resultsArray);}
        done();
        return res.send(resultsArray);
      }); // end queryResults.on('end')
    }// end else
  }); // end pg.connect
}); // end app.get getTasks


// post route to receive information from client
// app.post('/routeName', function(req,res){
//   if (verbose) {console.log('Route /routeName hit', req.body);}
//   res.send('/routeName response. Received: '+req.body);
// });

//post route to add information to Database
app.post( '/addTask', function( req, res ){
  if (verbose) {console.log( 'addTask route hit', req.body );}

  var newTaskName = req.body.taskName;

  var queryString = 'INSERT INTO todolist (task_name, completed) VALUES (($1),false);';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString,[newTaskName]);
      done();
      return res.sendStatus(200);
    }
  });
});//end /addTask

//post route to update information in Database
app.post( '/updateTask', function( req, res ){
  if (verbose) {console.log( 'updateTask route hit', req.body );}

  var updateID = req.body.taskNum;

  var queryString = 'UPDATE todolist SET completed = true WHERE id = ($1);';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString,[updateID]);
      done();
      return res.sendStatus(200);
    }
  });
});//end /updateTask

//post route to delete information in Database
app.post( '/deleteTask', function( req, res ){
  if (verbose) {console.log( 'deleteTask route hit', req.body );}

  var deleteID = req.body.taskNum;

  var queryString = 'DELETE FROM todolist WHERE id = ($1);';
  if (verbose) {console.log('sending to database:', queryString);}
  //send queryString to database
  pg.connect(connectionString, function(err, client, done){
    if (err){
      if (verbose) {console.log(err);}
    }
    else{
      client.query(queryString,[deleteID]);
      done();
      return res.sendStatus(200);
    }
  });
});//end /deleteTask

// // post route that adds or updates information in Database and also receives info
// app.post( '/postRouteB', function( req, res ){
//   if (verbose) {console.log( 'postRouteB route hit', req.body );}
//   //// --------NEED TO ENTER ***: SQL Query
//   var queryString = '***';
//   if (verbose) {console.log('sending to database:', queryString);}
//   //send queryString to database
//   pg.connect(connectionString, function(err, client, done){
//     if (err){
//       if (verbose) {console.log(err);}
//     }
//     else{
//       client.query(queryString);
//       //// --------NEED TO ENTER ***: SQL Query
//       var queryResult = client.query('***');
//       var resultsArray = [];
//       queryResult.on('row', function(row){
//         resultsArray.push(row);
//       });
//       queryResult.on('end', function(){
//         if (verbose) {console.log(resultsArray);}
//         done();
//         return res.json(resultsArray);
//       });
//     }
//   });
// });//end /postRouteB
