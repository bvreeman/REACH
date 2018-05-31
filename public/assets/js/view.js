$(document).ready(function() {
  $('#submit').on('click', function (event) {
    event.preventDefault();

    const newPhone = $('#phone').val().trim();
    const formattedPhone = (`+1${newPhone}`);
    const newMessage = $('#message').val().trim();
    const newDate = $('#datePicker').val().trim();
    const formattedDate = moment({ newDate }).format('YYYY-MM-DD');
    const newTime = $('#timePicker').val().trim();
    const formattedTime = moment({ newTime }).format('HH:MM');

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
});

