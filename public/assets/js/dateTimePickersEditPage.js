// Global Variables
// Setup values for current date
const currentMonth = moment().format('MM');
const currentYear = moment().format('YYYY');
const currentDay = moment().format('DD');
const currentHour = moment().format('hh');
const currentMinute = moment().format('mm');
const currentAMPM = moment().format('A');
const currentDate = {
  year: currentYear,
  month: currentMonth,
  day: currentDay,
};
const currentTime = {
  hour: currentHour,
  minute: currentMinute,
  ampm: currentAMPM,
};

// Arrays for tracking months with 30 days
const thirtyDayMonths = ['04', '06', '09', '11'];

// Various Time and Date value holders
let minuteVal = currentTime.minute;
let hourVal = currentTime.hour;
let ampmVal = currentTime.ampm;
let dayVal = currentDate.day;
let monthVal = currentDate.month;
let yearVal = currentDate.year;

// Tracking if this is the first page load
let firstLoad = true;


// Function renders the dropdown menu option to the DOM depending on the
// last saved outgoing time and date for the message being edited
function firstFormLoading() {
  if ($('#hbYear').text() === currentDate.year) {
    if ($('#hbMonth').text() === currentDate.month) {
      loadDays(determineNumberOfDays($('#hbMonth').text(), $('#hbYear').text(), true), true);
    } else {
      loadDays(determineNumberOfDays($('#hbMonth').text(), $('#hbYear').text(), false), false);
    }
    loadMonths(true);
  } else {
    loadDays(determineNumberOfDays($('#hbMonth').text(), $('#hbYear').text(), false), false);
    loadMonths(false);
  }
  loadYears();
  loadHours(false);
  loadMinutes(false);
  loadAMPM(true);
  firstLoad = false;
}
// END OF firstFormLoading() Function


// Function populates the days in the day dropdown menu
function loadDays(daysInMonth, booleanCurrentMonth) {
  // console.log('Reloading days');
  // Clears days list if not the first page load
  if (!firstLoad) {
    dayVal = $('#selectedDay').val();
    monthVal = $('#selectedMonth').val();
    $('#selectedDay').empty();
    const dayFirstOptionFormated = $('<option disabled value="" id="defaultYear" selected>');
    $('#selectedDay').append(dayFirstOptionFormated);
  }

  // Determines if days list should start at day number 1 depending on the current date
  let startDay = 1;
  if (booleanCurrentMonth) {
    startDay = parseInt(currentDate.day);
  }

  // Loops through days and appends them to the days dropdown list in the DOM
  for (let i = startDay; i < daysInMonth + 1; i++) {
    const dayOption = $('<option>');
    if (i < 10) {
      dayOption.val(`0${i}`).text(`0${i}`);
    } else {
      dayOption.val(i).text(i);
    }
    $('#selectedDay').append(dayOption);
  }

  // Makes sure the selected option in each drop down menu remains consistent after each reload
  $(`#selectedDay option:contains(${dayVal})`).prop({ selected: true });
  $(`#selectedMonth option:contains(${monthVal})`).prop({ selected: true });
}
// END OF loadDays() FUNCTION


// Function populates the Months in the month dropdown menu
function loadMonths(booleanCurrentYear) {
  // Clears months list if not the first page load
  if (!firstLoad) {
    dayVal = $('#selectedDay').val();
    monthVal = $('#selectedMonth').val();
    $('#selectedMonth').empty();
    const monthFirstOptionFormated = $('<option disabled value="" id="defaultMonth" selected>');
    $('#selectedMonth').append(monthFirstOptionFormated);
  }

  // Determines if months list should start at month number 1 depending on the current date
  let startMonth = 1;
  if (booleanCurrentYear) {
    startMonth = parseInt(currentDate.month);
  }

  // Loops through months and appends them to the months dropdown list in the DOM
  for (let i = startMonth; i < 13; i++) {
    const monthOption = $('<option>');
    if (i < 10) {
      monthOption.val(`0${i}`).text(`0${i}`);
    } else {
      monthOption.val(i).text(i);
    }
    $('#selectedMonth').append(monthOption);
  }

  // Makes sure the selected option in each drop down menu remains consistent after each reload
  $(`#selectedDay option:contains(${dayVal})`).prop({ selected: true });
  $(`#selectedMonth option:contains(${monthVal})`).prop({ selected: true });
}
// END OF loadMonths() FUNCTION


// Function populates the Years in the year dropdown menu
function loadYears() {
  // Loops through years and appends them to the years dropdown list in the DOM
  for (let i = parseInt(currentDate.year); i < parseInt(currentDate.year) + 11; i++) {
    const yearOption = $('<option>');
    yearOption.val(i).text(i);
    $('#selectedYear').append(yearOption);
  }
}
// END OF loadYears() FUNCTION


// Function returns number of days to display in days dropdown menu
// Takes into account the month of February and leap years
function determineNumberOfDays(monthSelected, yearSelected, booleanCurrentMonth) {
  if (monthSelected === '02') {
    if (yearSelected % 4 === 0) {
      return 29;
    }
    return 28;
  } else if (thirtyDayMonths.includes(monthSelected)) {
    return 30;
  }
  return 31;
}
// END OF determineNumberOfDays() FUNCTION


// Function returns boolean value of true if the current month and year are currently selected
function isCurrentYearAndMonth(monthSelected, yearSelected) {
  const isCurrentYearBoolean = yearSelected === currentDate.year;
  if (isCurrentYearBoolean) {
    if (monthSelected === currentDate.month) {
      return true;
    }
    return false;
  }
  return false;
}
// END OF isCurrentYearAndMonth() FUNCTION


// Function populates the hours in the hour dropdown menu
function loadHours(booleanCurrentDay) {
  if (!firstLoad) {
    hourVal = $('#selectedHour').val();
    minuteVal = $('#selectedMinute').val();
    ampmVal = $('#selectedAMPM').val();
    $('#selectedHour').empty();
    const hourFirstOptionFormated = $('<option disabled value="" id="defaultHour" selected>');
    $('#selectedHour').append(hourFirstOptionFormated);
  }
  let startHour = 1;
  if (booleanCurrentDay) {
    startHour = parseInt(currentTime.hour);
  }
  for (let i = startHour; i < 13; i++) {
    const hourOption = $('<option>');
    if (i < 10) {
      hourOption.val(`0${i}`).text(`0${i}`);
    } else {
      hourOption.val(i).text(i);
    }
    $('#selectedHour').append(hourOption);
  }
  updateDomTimeSelection(hourVal, minuteVal, ampmVal);
}
// END OF loadHours() FUNCTION


// Function populates the minutes in the minute dropdown menu
function loadMinutes(booleanCurrentDayAndHour) {
  if (!firstLoad) {
    hourVal = $('#selectedHour').val();
    minuteVal = $('#selectedMinute').val();
    ampmVal = $('#selectedAMPM').val();
    $('#selectedMinute').empty();
    const minuteFirstOptionFormated = $('<option disabled value="" id="defaultMinute" selected>');
    $('#selectedMinute').append(minuteFirstOptionFormated);
  }
  let startMinute = 0;
  if (booleanCurrentDayAndHour) {
    startMinute = parseInt(currentTime.minute);
  }
  for (let i = startMinute; i < 60; i++) {
    const minuteOption = $('<option>');
    if (i < 10) {
      minuteOption.val(`0${i}`).text(`0${i}`);
    } else {
      minuteOption.val(i).text(i);
    }
    $('#selectedMinute').append(minuteOption);
    // console.log("Logged " + i);
  }

  updateDomTimeSelection(hourVal, minuteVal, ampmVal);
}
// END OF loadMinutes() FUNCTION


// Function populates AM and PM in the AM/PM dropdown menu
function loadAMPM(booleanCurrentDayAndAM) {
  if (!firstLoad) {
    hourVal = $('#selectedHour').val();
    minuteVal = $('#selectedMinute').val();
    ampmVal = $('#selectedAMPM').val();
    $('#selectedAMPM').empty();
    const ampmFirstOptionFormated = $('<option disabled value="" id="defaultAMPM" selected>');
    $('#selectedAMPM').append(ampmFirstOptionFormated);
  }
  const ampmOption1 = $('<option>');
  const ampmOption2 = $('<option>');
  if (booleanCurrentDayAndAM) {
    ampmOption1.val('AM').text('AM');
    $('#selectedAMPM').append(ampmOption1);
  }
  ampmOption2.val('PM').text('PM');
  $('#selectedAMPM').append(ampmOption2);
  updateDomTimeSelection(hourVal, minuteVal, ampmVal);
}
// END OF loadAMPM() FUNCTION


// Function selects the time options in each drop drown menu after each reload
// This keeps selected values consistent as dropdown options dynamically change
function updateDomTimeSelection(hour, minute, ampm) {
  $(`#selectedMinute option:contains(${minute})`).prop({ selected: true });
  $(`#selectedHour option:contains(${hour})`).prop({ selected: true });
  $(`#selectedAMPM option:contains(${ampm})`).prop({ selected: true });
}
// END OF updateDomTimeSelection() FUNCTION


$(document).ready(function() {
  // Calls function to populate dropdown menu values
  firstFormLoading();
  // Prevents datpicker and timepicker buttons from reloading page
  $('.formBtn').on('click', function(event) {
    event.preventDefault();
  });

  // Makes sure pressing Enter on any dropdowns doesn't execute the form submission
  $('.timeInputs').keypress(function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
  });
  $('.dateInputs').keypress(function(e) {
      if (e.keyCode == 13) {
          e.preventDefault();
      }
  });

  // Event listener that reloads day dropdown options depending on the month selected
  $('#selectedMonth').change(function() {
    monthVal = $('#selectedMonth').val();
    yearVal = $('#selectedYear').val();
    const booleanCurrentMonthAndYear = isCurrentYearAndMonth(monthVal, yearVal);
    const numberOfDays = determineNumberOfDays(monthVal, yearVal, booleanCurrentMonthAndYear);
    loadDays(numberOfDays, booleanCurrentMonthAndYear);
  });

  // Event listener that reloads month dropdown options depending on the year selected
  // Concept: If the current year is selected, only the months left in the year should be displayed
  // Also takes into account reloading day dropdown options in leap year special cases
  $('#selectedYear').change(function() {
    monthVal = $('#selectedMonth').val();
    yearVal = $('#selectedYear').val();
    const booleanCurrentMonthAndYear = isCurrentYearAndMonth(monthVal, yearVal);
    const isCurrentYearBoolean = yearVal === currentDate.year;
    loadDays(determineNumberOfDays(monthVal, yearVal, booleanCurrentMonthAndYear), booleanCurrentMonthAndYear);
    loadMonths(isCurrentYearBoolean);
  });

  // Empties date and time dropdown placeholders and selects values for messages previously saved outgoing date and time
  $('#defaultMonth').empty();
  $('#defaultDay').empty();
  $('#defaultYear').empty();
  $(`#selectedYear option:contains(${$('#hbYear').text()})`).prop({ selected: true });
  $(`#selectedMonth option:contains(${$('#hbMonth').text()})`).prop({ selected: true });
  $(`#selectedDay option:contains(${$('#hbDay').text()})`).prop({ selected: true });
  $(`#selectedHour option:contains(${$('#hbHour').text()})`).prop({ selected: true });
  $(`#selectedMinute option:contains(${$('#hbMinute').text()})`).prop({ selected: true });
  $(`#selectedAMPM option:contains(${$('#hbAMPM').text()})`).prop({ selected: true });

  // TIMEPICKER


  $('.timeInputs').change(function() {
    let formSelectedTime = {
    hour: $('#selectedHour').val(),
    minute: $('#selectedMinute').val(),
    ampm: $('#selectedAMPM').val(),
    };

    timePickInstance.options.defaultTime = `${formSelectedTime.hour}:${formSelectedTime.minute} ${formSelectedTime.ampm}`;
    timePickInstance._updateTimeFromInput(`${formSelectedTime.hour}:${formSelectedTime.minute} ${formSelectedTime.ampm}`);
  });
  // Variable for all timePicker elements in the DOM
  const timePickElems = document.querySelectorAll('#timePicker');
  // Initializing formatting and options for timePicker modals
  const timePickInstances = M.Timepicker.init(timePickElems, {
    autoClose: true,
    defaultTime: `${$('#selectedHour').val()}:${$('#selectedMinute').val()} ${$('#selectedAMPM').val()}`,
    onSelect: function(time) {
      const timeAndAMPMArray = time.split(" ");
      const hoursAndMinutesArray = timeAndAMPMArray[0].split(":");
      formattedPickerSelectedTime = {
          selectedHour: hoursAndMinutesArray[0],
          selectedMinute: hoursAndMinutesArray[1],
          selectedAMPM: timeAndAMPMArray[1]
      };
    },
    onClose: function() {
        $(`#selectedHour option:contains(${formattedPickerSelectedTime.selectedHour})`).prop({ selected: true });
        $(`#selectedMinute option:contains(${formattedPickerSelectedTime.selectedMinute})`).prop({ selected: true });
        $(`#selectedAMPM option:contains(${formattedPickerSelectedTime.selectedAMPM})`).prop({ selected: true });
        timePickInstance._updateTimeFromInput(`${formattedPickerSelectedTime.selectedHour}:${formattedPickerSelectedTime.selectedMinute} ${formattedPickerSelectedTime.selectedAMPM}`);
    }
  });
  // We currently only have one datepicker input on our home page, therefore we are only concerned with the first instance
  const timePickInstance = timePickInstances[0];


  // END OF TIMEPICKER SECTION

  // DATEPICKER

  // Holder variable for datepicker modal
  let formattedDay;
  let formattedMonth;
  let formattedPickerSelectedDate;
  let formSelectedDate = {
    day: $('#selectedDay').val(),
    month: $('#selectedMonth').val(),
    year: $('#selectedYear').val(),
  };

  // Event listener when a date option is selected via dropdown menu, the datepicker is synced with the new date
  $('.dateInputs').change(function() {
    formSelectedDate = {
      day: $('#selectedDay').val(),
      month: $('#selectedMonth').val(),
      year: $('#selectedYear').val(),
    };
    datePickInstance.setDate(new Date(moment(`${formSelectedDate.year},${formSelectedDate.month},${formSelectedDate.day}`, ['YYYY,MM,DD'])));
  });

  // Variable for all datePicker elements in the DOM
  const datePickElems = document.querySelectorAll('#datePicker');
  // Initializing formatting and options for datePicker modals
  const datePickInstances = M.Datepicker.init(datePickElems, {
    format: 'mm dd, yyyy',
    minDate: new Date(moment().format('YYYY,M,D')),
    yearRange: [parseInt(currentDate.year), parseInt(currentDate.year) + 10],
    defaultDate: new Date(moment(`${$('#selectedYear').val()},${$('#selectedMonth').val()},${$('#selectedDay').val()}`, ['YYYY,MM,DD'])),
    setDefaultDate: true,
    // onSelect method for updating the DOM date input field with the selected date and autoClosing the modal when the date is selected
    onSelect: function(time) {
      const pickerSelectedDate = new Date(time);
      if (pickerSelectedDate.getDate() < 10) {
        formattedDay = `0${String(pickerSelectedDate.getDate())}`;
      } else {
        formattedDay = String(pickerSelectedDate.getDate());
      }
      if (pickerSelectedDate.getMonth() + 1 < 10) {
        formattedMonth = `0${String(pickerSelectedDate.getMonth() + 1)}`;
      } else {
        formattedMonth = String(pickerSelectedDate.getMonth() + 1);
      }
      formattedPickerSelectedDate = {
        selectedDay: formattedDay,
        selectedMonth: formattedMonth,
        selectedYear: String(pickerSelectedDate.getFullYear()),
      };
      datePickInstance.close();
    },
    // onClose method for reloading dropdown menus and their respective selected options when the datepicker closes
    onClose: function() {
      if (formattedPickerSelectedDate.selectedYear === currentDate.year) {
        loadMonths(true);
      } else {
        loadMonths(false);
      }
      const booleanCurrentMonthAndYear = isCurrentYearAndMonth(formattedPickerSelectedDate.selectedMonth, formattedPickerSelectedDate.selectedYear);
      const numberOfDays = determineNumberOfDays(formattedPickerSelectedDate.selectedMonth, formattedPickerSelectedDate.selectedYear, booleanCurrentMonthAndYear);
      loadDays(numberOfDays, booleanCurrentMonthAndYear);
      $(`#selectedMonth option:contains(${formattedPickerSelectedDate.selectedMonth})`).prop({ selected: true });
      $(`#selectedDay option:contains(${formattedPickerSelectedDate.selectedDay})`).prop({ selected: true });
      $(`#selectedYear option:contains(${formattedPickerSelectedDate.selectedYear})`).prop({ selected: true });
    },
  });

  // We currently only have one datepicker input on our home page, therefore we are only concerned with the first instance
  const datePickInstance = datePickInstances[0];

  // END OF DATEPICKER SECTION
});
