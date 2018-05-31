


$( document ).ready(function() {
    $("#datePicker").empty();
    $("#datePicker").val(moment());
    $("#datePicker").datepicker();
    $('.sidenav').sidenav();
    $('#timePicker').timepicker();

} );