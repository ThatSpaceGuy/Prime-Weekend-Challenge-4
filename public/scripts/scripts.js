console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}

/// == Function Declarations == ///
function addTask(){
  // empty Message box
  clearMessage();
  // grab new task name
  var newTaskName = $('#newTaskText').val();
  // check for empty string
  if (newTaskName===''){
    // if empty then disply message to user
    $('#messageBox').html('<p>Cannot create blank task. Please enter a task below.</p>');
  } else { // otherwise proceed with creating a task
    // prepare the task to be sent
    var objectToSend={
      taskName: newTaskName
    };
    // ajax post code that sends object to /addTask route
    $.ajax({
      type: 'POST',
      url: '/addTask',
      data: objectToSend,
      success: function( data ){
        if (verbose) {console.log( 'got this from /addTask - ' + data );}
        // Notify user of success
        $('#messageBox').html('<p>Task created successfully!</p>');
      },
      statusCode: {
        404: function(){
          $('#messageBox').html('<p>404 Error! Please contact Support.</p>');
        }
      }
    }); // end Ajax post code
  }
}

function clearMessage(){
  $('#messageBox').html('');
}

/// == JavaScript == ///

$(document).ready(function(){
  if (verbose) {console.log('Document ready!');}

  // // ajax get call to server to get object
  //   $.ajax({
  //     url: '/getRoute',
  //     type: 'GET',
  //     success: function( data ){
  //       if (verbose) {console.log( 'got this from /getRoute - ' + data );}
  //     } // end success
  //   }); //end ajax

  $('#addTask').on('click', function(){
    addTask();
  }); // end #addTask.on('click')

}); // end document ready
