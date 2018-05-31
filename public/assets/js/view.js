$( document ).ready(function() {
 
$("#submit").on("click", function (event){
    event.preventDefault();

    var newPhone = $('#phone').val().trim();
    var formattedPhone = ('+1' +newPhone)
    var newMessage = $('#message').val().trim();
    var newDate = $('#datePicker').val().trim();
    var formattedDate = moment(newDate, ["MMM DD, YYYY"]).format("YYYY-MM-DD");
    // var newTime = $('#timePicker').val().trim();
    // var formattedTime = moment({newTime}).format("HH:MM:ss a");
    
    console.log(formattedDate);
    console.log(formattedPhone);
    // console.log(formattedTime);

    $.ajax({
        method: "POST",
        url: "/api/getNumber",
        data: {
            phone_number: formattedPhone,
            outgoing_message: newMessage,
            scheduled_date: formattedDate,
            // scheduled_time: newTime
        }
        }).then(
            function(toTheServer){
            console.log(toTheServer);
            })


    });
});


