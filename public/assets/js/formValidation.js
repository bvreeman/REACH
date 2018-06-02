function validateForm() {
    let phoneNumbers;
    let areMultipleNumbers = false;
    let phoneNumber = $('#phone').val().replace(/-|\s/g,"");

    $('#phoneError').empty();

    if (phoneNumber.includes(",")) {
        phoneNumbers = phoneNumber.split(",");
        areMultipleNumbers = true;
    }
    if (areMultipleNumbers) {
        phoneNumbers.map(elem => {
            if (elem.parseInt() === "NaN" || elem.parseInt().String().length != 10) {
                $('#phoneError').text("Please provide a valide 10-digit US phone number.");
                console.log("Please provide a valide 10-digit US phone number.");
                return false;
            };
        });
        return true;
    } else {
        if (phoneNumber.parseInt() === "NaN" || phoneNumber.parseInt().String().length != 10) {
            return false;
            $('#phoneError').text("Please provide a valide 10-digit US phone number.");
            console.log("Please provide a valide 10-digit US phone number.");
        } else {
            return true;
        }
    }
}