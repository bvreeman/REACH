$( document ).ready(function() {
 
$('#submit').on("click", function (event){
    event.preventDefault();

    var newPhone = $('#phone').val().trim();
    var formattedPhone = ('+1' +newPhone)
    var newMessage = $('#message').val().trim();
    var newDate = $('#datePicker').val().trim();
    // var newTime = $('#timePicker').val().trim();
   
    console.log(formattedPhone);

    $.ajax({
        method: "POST",
        url: "/api/getNumber",
        data: {
            phone_number: formattedPhone,
            outgoing_message: newMessage,
            // scheduled_date: newDate,
            // scheduled_time: newTime
        }
        }).then(
            function(toTheServer){
            console.log(toTheServer);
            })


    });
});


