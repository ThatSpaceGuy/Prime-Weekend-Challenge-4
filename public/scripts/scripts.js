console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var verbose = true; // if (verbose) {console.log('');}

/// == Function Declarations == ///
// called from the #addTask .on('click')
function addTask(){
  if (verbose) {console.log('in addTask');}
  // empty Message box
  clearMessage();
  // grab new task name
  var newTaskName = $('#newTaskText').val();
  // check for empty string
  if (newTaskName===''){
    // if empty then disply message to user
    $('#messageBox').html('<p class="error">Cannot create blank task. Please enter a task above.</p>');
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
        $('#messageBox').html('<p class="success">ToLu created successfully!</p>');
        displayTasks();
        clearInput();
      },
      statusCode: {
        404: function(){
          $('#messageBox').html('<p class="error">404 Error! Please contact Support.</p>');
        }
      }
    }); // end Ajax post code
  } // end else code
} // end addTask()

// called from page load, addTask(), updateTask(), deleteTask(), and noButton .on('click')
function displayTasks(){
  if (verbose) {console.log('in displayTasks');}

  var taskList;
  var thisTask;
  // ajax get call to server to get taskList
  $.ajax({
    url: '/getTasks',
    type: 'GET',
    success: function( data ){
      if (verbose) {console.log( 'got this from /getRoute - ' + data );}
      // Store information from database
      taskList = data;
      // If there are tasks to display...
      if (taskList.length>0){
        // Set the table header
        document.getElementById("toDoListHeader").innerHTML =
        '<table><thead><tr><th scope="col" id="col1">Completed?</th><th scope="col" id="col2">ToLu Description</th><th scope="col" id="col3">Delete?</th></tr></thead><tbody>';
        // reset the display of tasks
        document.getElementById("toDoListBody").innerHTML = '';
        for (var i = 0; i < taskList.length; i++) {
          thisTask = taskList[i].id;
          // Set Completed text
          var completedText;
          if (taskList[i].completed) {
            completedText = ' class="completedTask">'+
            '<td>Completed! <button class="undoButton" data-id="'+thisTask+'">Undo?</button></td>'+
            '<td class="completedName"';
          } else {
            completedText = ' class="openTask">'+
            '<td><button class="completeButton" data-id="'+thisTask+'">Complete ToLu!</button></td>'+
            '<td';
          }
          document.getElementById("toDoListBody").innerHTML +=
          '<tr id="taskRow'+thisTask+'"'+completedText+
          ' id="taskName'+thisTask+'">'+taskList[i].task_name+'</td>'+
          '<td id="delete'+thisTask+'"><button class="deleteButton" data-id="'+thisTask+'">DELETE</button></td>'+
          '</tr>';
        }
      } // end if
    } // end success
  }); //end ajax
} // end displayTasks()

// called from completeButton .on('click') with taskChecked=true
// called from undoButton .on('click') with taskChecked=false
function updateTask(clickedButton,taskChecked){
  var taskId = $(clickedButton).data('id');
  if (verbose) {console.log( 'in updateTask with: ' + taskId );}

  // prepare the objectToSend
  var objectToSend = {
    taskNum: taskId,
    taskDone: taskChecked
  };

  // ajax post code that sends object to /updateTask route
  $.ajax({
    type: 'POST',
    url: '/updateTask',
    data: objectToSend,
    success: function( data ){
      if (verbose) {console.log( 'got this from /updateTask - ' + data );}
      // Notify user of success
      $('#messageBox').html('<p class="success">ToLu completed successfully!</p>');
      displayTasks();
    },
    statusCode: {
      404: function(){
        $('#messageBox').html('<p class="error">404 Error! Please contact Support.</p>');
      }
    }
  }); // end Ajax post code
}

// called only from the deleteButton .on('click')
function confirmChoice(clickedButton){
  var taskId = $(clickedButton).data('id');
  if (verbose) {console.log( 'in confirmChoice with: ' + taskId );}
  clearMessage();
  // Change background-color
  $('#taskRow'+taskId).addClass('confirm');
  // Display message and remove line-through
  $('#taskName'+taskId).prepend('Are you sure you want to delete this task?: ').removeClass('completedName');
  // Disply choice buttons
  $('#delete'+taskId).html(
    '<button class="deleteButton yesButton" data-id="'+taskId+'">YES</button>'+
    '<button class="noButton" data-id="'+taskId+'">NO</button>');
}

// called only from the yesButton .on('click')
function deleteTask(clickedButton){
  var taskId = $(clickedButton).data('id');
  if (verbose) {console.log( 'in deleteTask with: ' + taskId );}

  // prepare the objectToSend
  var objectToSend = {
    taskNum: taskId
  };

  // ajax post code that sends object to /deleteTask route
  $.ajax({
    type: 'POST',
    url: '/deleteTask',
    data: objectToSend,
    success: function( data ){
      if (verbose) {console.log( 'got this from /deleteTask - ' + data );}
      // Notify user of success
      $('#messageBox').html('<p class="success">ToLu Deleted successfully!</p>');
      displayTasks();
    },
    statusCode: {
      404: function(){
        $('#messageBox').html('<p class="error">404 Error! Please contact Support.</p>');
      }
    }
  }); // end Ajax post code
} // end deleteTask

// called from addTask() and confirmChoice()
function clearMessage(){
  $('#messageBox').html('');
} // end clearMessage

// called from addTask()
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
  // Permanent buttons
  $('#addTask').on('click', function(){
    addTask();
  }); // end #addTask.on('click')

  // Dynamic buttons
  $('body').on('click', '.completeButton', function(){
    updateTask(this, true);
  });

  $('body').on('click', '.undoButton', function(){
    updateTask(this, false);
  });

  $('body').on('click', '.deleteButton', function(){
    confirmChoice(this);
  });

  $('body').on('click', '.yesButton', function(){
    deleteTask(this);
  });

  $('body').on('click', '.noButton', function(){
    displayTasks();
  });

}); // end document ready
