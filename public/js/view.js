$( document ).ready(function() {

$('#submit').on("click", function (event){
    event.preventDefault();
    $('#phone').val();
    $('#message').val();
    $('#datePicker').val();
    $('#timePicker').val();
    console.log(phone.value)
    console.log(message.value)
    console.log(datePicker.value);
    console.log(timePicker.value);
});


});