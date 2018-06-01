
$(document).ready(function() {
  // Setup side navbar to launch in mobile view
  $('.sidenav').sidenav();

  // Get current date and update DOM date input field with a current date placeholder
  $('#datePicker').empty();
  $('#datePicker').val(moment().format('MMM DD, YYYY'));

  // Get current time and update DOM date input field with a current date placeholder
  $('#timePicker').empty();
  $('#timePicker').val(moment().format('hh:mm A'));

  // TIMEPICKER

    // Variable for all timePicker elements in the DOM
    const timePickElems = document.querySelectorAll('#timePicker');
    // Initializing formatting and options for timePicker modals
    const timePickInstances = M.Timepicker.init(timePickElems, {
        autoClose: true
        // onSelect: function(hour, minute) {
        //     const formattedSelectedTime = {
        //         selectedHour: hour,
        //         selectedMinute: minute,
        //     };
        //     console.log(`this is the Date: ${formattedSelectedDate.selectedYear}-${formattedSelectedDate.selectedMonth}-${formattedSelectedDate.selectedDay}`);
        //     $('#datePicker').val(moment(`${formattedSelectedTime.selectedHour}:${formattedSelectedDate.selectedMonth}-${formattedSelectedDate.selectedDay}`, ['YYYY-MM-DD']).format('MMM DD, YYYY'));
        //     console.log(`New Value:${$('#datePicker').val()}`);
        //     datePickInstance.close();
        // },
    });

    // We currently only have one datepicker input on our home page, therefore we are only concerned with the first instance
    const timePickInstance = timePickInstances[0];

    // This makes sure we launch the timepicker modal when using tab to navigate the page
    // This allows for the modal to launch immediately when tab focus onto the date input field
    // $("#timePicker").focus(function() {
    //     timePickInstance.open();
    //     console.log("focusing on the time field");
    // });
    // $("#timePicker").change(function() {
    //     $('#submit').focus();
    // });

  // DATEPICKER

    // Variable for all datePicker elements in the DOM
    const datePickElems = document.querySelectorAll('#datePicker');
    // Initializing formatting and options for datePicker modals
    const datePickInstances = M.Datepicker.init(datePickElems, {
        format: 'mmm dd, yyyy',
        minDate: new Date(moment().format('YYYY,M,D')),
        // onSelect method for updating the DOM date input field with the selected date and autoClosing the modal when the date is selected
        onSelect: function(time) {
            const selectedDate = new Date(time);
            const formattedSelectedDate = {
                selectedDay: selectedDate.getDate(),
                selectedMonth: selectedDate.getMonth() + 1,
                selectedYear: selectedDate.getFullYear(),
            };
            console.log(`this is the Date: ${formattedSelectedDate.selectedYear}-${formattedSelectedDate.selectedMonth}-${formattedSelectedDate.selectedDay}`);
            $('#datePicker').val(moment(`${formattedSelectedDate.selectedYear}-${formattedSelectedDate.selectedMonth}-${formattedSelectedDate.selectedDay}`, ['YYYY-MM-DD']).format('MMM DD, YYYY'));
            console.log(`New Value:${$('#datePicker').val()}`);
            datePickInstance.close();
        },
    });
    
    // We currently only have one datepicker input on our home page, therefore we are only concerned with the first instance
    const datePickInstance = datePickInstances[0];

    // This makes sure we automatically launch the datepicker modal when using tab to navigate the page
    $("#datePicker").focus(function() {
        datePickInstance.open();
        console.log("focusing on the date field");
    });
    $('#datePicker').change( function() {
        timePickInstance.open();
        $('#submit').focus();
    });

} );
