console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}

/// == Function Declarations == ///
function addTask(){
  if (verbose) {console.log('in addTask');}
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
    if (verbose) {console.log('about to send:',newTaskName);}
    // ajax post code that sends object to /addTask route
    $.ajax({
      type: 'POST',
      url: '/addTask',
      data: objectToSend,
      success: function( data ){
        if (verbose) {console.log( 'got this from /addTask - ' + data );}
        // Notify user of success
        $('#messageBox').html('<p>Task created successfully!</p>');
        displayTasks();
        clearInput();
      },
      statusCode: {
        404: function(){
          $('#messageBox').html('<p>404 Error! Please contact Support.</p>');
        }
      }
    }); // end Ajax post code
  } // end else code
} // end addTask()

function displayTasks(){
  if (verbose) {console.log('in displayTasks');}

  // clearMessage to start
  clearMessage();

  var taskList;
  // ajax get call to server to get taskList
  $.ajax({
    url: '/getTasks',
    type: 'GET',
    success: function( data ){
      if (verbose) {console.log( 'got this from /getRoute - ' + data );}

      taskList = data;

      if (taskList.length>0){
        // Set the table header
        document.getElementById("toDoListHeader").innerHTML =
        '<table><thead><tr><th scope="col" id="col1">Completed?</th><th scope="col" id="col2">ToLu Description</th></tr></thead><tbody>';
        // reset the display of tasks
        document.getElementById("toDoListBody").innerHTML = '';
        for (var i = 0; i < taskList.length; i++) {
          // Set Completed text
          var completedText;
          if (taskList[i].completed) {
            completedText = ' class="completedTask"><td>Complete!</td><td class="completedName"';
          } else {
            completedText = ' class="openTask"><td><button class="completeButton" data-id="'+taskList[i].id+'">Mark this ToLu complete!</button></td><td';
          }
          document.getElementById("toDoListBody").innerHTML +=
          '<tr'+completedText+'>'+taskList[i].task_name+'</td></tr>';
        }
      } // end if
    } // end success
  }); //end ajax
} // end displayTasks()

function updateTask(clickedButton){
  var taskId = $(clickedButton).data('id');
  if (verbose) {console.log( 'in updateTask with: ' + taskId );}

  // prepare the objectToSend
  var objectToSend = {
    taskNum: taskId
  };

  // ajax post code that sends object to /addTask route
  $.ajax({
    type: 'POST',
    url: '/updateTask',
    data: objectToSend,
    success: function( data ){
      if (verbose) {console.log( 'got this from /addTask - ' + data );}
      // Notify user of success
      $('#messageBox').html('<p>Task completed successfully!</p>');
      displayTasks();
    },
    statusCode: {
      404: function(){
        $('#messageBox').html('<p>404 Error! Please contact Support.</p>');
      }
    }
  }); // end Ajax post code
}


function clearMessage(){
  $('#messageBox').html('');
} // end clearMessage

function clearInput(){
  $('#newTaskText').val('');
} // end clearInput

/// == JavaScript == ///
$(document).ready(function(){
  if (verbose) {console.log('Document ready!');}

  // immediate actions
  // get and display tasks right away
  displayTasks();

  // Event listeners
  // Permanennt buttons
  $('#addTask').on('click', function(){
    addTask();
  }); // end #addTask.on('click')

  // Dynamic buttons
  $('body').on('click', '.completeButton', function(){
    updateTask(this);
  });



}); // end document ready
