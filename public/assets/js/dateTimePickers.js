

$(document).ready(function() {
  // Setup side navbar
  $('.sidenav').sidenav();

  // Get current date in date input field
  $('#datePicker').empty();
  $('#datePicker').val(moment().format('MMM DD, YYYY'));
  // Setup date modal for date input field
  $('#datePicker').datepicker();


  $('#timePicker').empty();
  $('#timePicker').val(moment().format('hh:mm A'));
  // Setup time modal for time input field
  $('#timePicker').timepicker();
});
