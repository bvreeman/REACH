$(document).ready(function() {
    if (window.location.href.split('/outbox')[1] === '/sort/outgoing-order') {
        $("#sortCheckbox").prop('checked', true);
    };

    $("#sortCheckbox").change(function() {
        if (window.location.href.split('/outbox')[1] === '/sort/outgoing-order') {
            if(!($(this).is(":checked"))) {
                window.location.href = '/outbox';
            }
        } else if (window.location.href.split('/outbox')[1] === '') {
            if($(this).is(":checked")) {
                console.log("Is checked");
                window.location.href = '/outbox/sort/outgoing-order';
            }
        };
    })
});