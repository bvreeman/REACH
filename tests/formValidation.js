// THIS CODE IS NOT LINKED IN THE APP. THIS IS A PLACEHOlDER FOR TESTS


const phoneFormInput = $('#phone').val().replace(/-|\s/g, '');

// Function validates fields in compose message form
function areMultiplePhoneNum(phoneFormInput) {
  // Phone number validation. Determines if multiple numbers provided and if they are US 10-digit numbers
  let allPhoneNumbersArray;
  let areMultipleNum = false;
  const phoneFormInput = $('#phone').val().replace(/-|\s/g, '');

  $('#phoneError').empty();

  if (phoneFormInput.includes(',')) {
    allPhoneNumbersArray = phoneFormInput.split(',');
    areMultipleNum = true;
  }
  if (areMultipleNum) {
    allPhoneNumbersArray.map((elem) => {
      if (elem.parseInt() === 'NaN' || elem.parseInt().String().length != 10) {
        $('#phoneError').text('Please provide a valide 10-digit US phone number.');
        console.log('Please provide a valide 10-digit US phone number.');
        return false;
      }
    });
    return true;
  }
  if (phoneFormInput.parseInt() === 'NaN' || phoneFormInput.parseInt().String().length != 10) {
    return false;
    $('#phoneError').text('Please provide a valide 10-digit US phone number.');
    console.log('Please provide a valide 10-digit US phone number.');
  }
  return true;


  // End of phone number validation
}



// let newPhone;
// let allPhoneNumbersArray;
// let areMultipleNum = false;
// // phone number format and validation
// const phoneFormInput = $('#phone').val().trim().replace(/[- )(]|/g, '');
// if (phoneFormInput.includes(',')) {
//   allPhoneNumbersArray = phoneFormInput.split(',');
//   areMultipleNum = true;
// }
// allPhoneNumbersArray.map(function(elem) {
//   if (isNaN(elem) || elem.toString().length != 10) {
//     $('#phoneError').text('Please provide a valid 10-digit US phone number.');
//     return false;
//   } 
// });
// if (areMultipleNum) {
//   newPhone = allPhoneNumbersArray;
//   console.log(newPhone);
// } else {
//   newPhone = allPhoneNumbersArray[0];
// }



// Second attempt
//   // phone number input validation and initial formatting
//   let newPhone;
//   // const newPhone = $('#phone').val().trim();
//   let allPhoneNumbersArray = [];
//   let areMultipleNum = false;
//   let mapErrorArray = [];
//   const phoneFormInput = $('#phone').val().trim().replace(/[- )(]|/g, '');
//   if (phoneFormInput.includes(',')) {
//     allPhoneNumbersArray = phoneFormInput.split(',');
//     areMultipleNum = true;
//   } else {
//     allPhoneNumbersArray.push(phoneFormInput);
//   }
//   allPhoneNumbersArray.map(function(elem) {
//     if (isNaN(elem) || !(elem.toString().length === 10)) {
//       $('#errorDiv').text('Please provide a valid 10-digit US phone number.');
//       mapErrorArray.push(true);
//     } else {
//       mapErrorArray.push(false);
//     }
//   });
//   if (mapErrorArray[0]) {
//     return false;
//   } else {
//     newPhone = allPhoneNumbersArray[0];
//   };


//   // message body input validation
//   // let newMessage;
//   // let messageBodyInput = $('#message').val().trim();
//   if (messageBodyInput === '') {
//     $('#errorDiv').text('Please provide a message body.');
//     return false;
//   } 
//   // else {
//   //   newMessage = messageBodyInput;
//   // }

//   // date inputs validation
//   if ($('#selectedYear').val() === '' || $('#selectedMonth').val() === '' || $('#selectedDay').val()) {
//     $('#errorDiv').text('Please select an option for all date and time values below.');
//     return false;
//   }

//   // time inputs validation
//   if ($('#selectedHour').val() === '' || $('#selectedMinute').val() === '' || $('#selectedAMPM').val()) {
//     $('#errorDiv').text('Please select an option for all date and time values below.');
//     return false;
//   }