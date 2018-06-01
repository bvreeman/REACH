  $('#submit').on('click', function (event) {
    event.preventDefault();

    const newPhone = $('#phone').val().trim();
    const formattedPhone = (`+1${newPhone}`);
    const newMessage = $('#message').val().trim();
    const newDate = $('#datePicker').val().trim();
    const formattedDate = moment(newDate, ["MMM DD, YYYY"]).format('YYYY-MM-DD');
    const newTime = $('#timePicker').val();
    const formattedTime = moment(newTime, ['h:mm A']).format('HH:mm');

    console.log(formattedDate);
    console.log(formattedPhone);
    // console.log(formattedTime);

    $.ajax({
      method: 'POST',
      url: '/api/getNumber',
      data: {
        phone_number: formattedPhone,
        outgoing_message: newMessage,
        scheduled_date: formattedDate,
        scheduled_time: formattedTime,
      },
    }).then(function(toTheServer) {
      console.log(toTheServer);
    });


  });

$("body").on("click", ".delete", function(event){
  const id= $(this).data("id");
    console.log('it works!');
  $.ajax("/outbox/" +id, {
    type: "DELETE",
  }).then(
    function() {
      console.log("deleted message" +id)
      location.reload();
    }
  )
});