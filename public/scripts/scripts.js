console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}

/// == Function Declarations == ///


/// == JavaScript == ///

$(document).ready(function(){
  if (verbose) {console.log('Document ready!');}

  // // Ajax code for a API hit
  // var genericUrl = 'http://www.'+'';
  // $.ajax({
  //   url: genericUrl,
  //   dataType: 'JSON',
  //   success: function(data){
  //     if (verbose) {console.log('in Ajax success, with data:', data);}
  //
  //   },
  //   statusCode: {
  //     404: function(){
  //       alert('404 Error! Cannot load page');
  //     }
  //   }
  // }); // end ajax API code

  // // ajax get call to server to get object
  //   $.ajax({
  //     url: '/getRoute',
  //     type: 'GET',
  //     success: function( data ){
  //       if (verbose) {console.log( 'got this from /getRoute - ' + data );}
  //     } // end success
  //   }); //end ajax

  // // ajax post code that sends object to /routename route
  // var objectToSend={};
  // $.ajax({
  //   type: 'POST',
  //   url: '/postRoute',
  //   data: objectToSend,
  //   success: function( data ){
  //     if (verbose) {console.log( 'got this from /postRoute - ' + data );}
  //   statusCode: {
  //          404: function(){
  //            alert('404 Error! Cannot load page');
  //          }
  //       }
  //   }
  // }); // end Ajax post code

}); // end document ready
