$(document).ready(function () {
    requestDataFromRandomuser();

    $(document).on("click", ".js-toggleModal", function () {
        var target = $(this).attr('data-target');
        $('body').toggleClass("no-scroll");
        $('.modal-container').toggleClass("show");
        $('.modal-background').toggleClass("show");
        $('#' + target).toggleClass('show');

    });

});

function requestDataFromRandomuser() {

    $.ajax({
        url: 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone',
        dataType: 'json',
        success: function (data) {
            var employeeInformation = data.results;
            console.log(employeeInformation);
            for (var i = 0; i < employeeInformation.length; i++) {
                var markup = buildMarkup(i, employeeInformation);
                console.log(markup);
                $('#employee-cards-container .grid-row').append(markup.employeeCard);
                $('.modal-container').append(markup.employeeModal);
            }

        }
    });
};


function buildMarkup(i, employeeInformation) {
    var image = employeeInformation[i].picture.large;
    var name = employeeInformation[i].name.first;
    var email = employeeInformation[i].email;
    var location = employeeInformation[i].location.city;
    var phone = employeeInformation[i].phone;
    var postcode = employeeInformation[i].location.postcode;
    var street = employeeInformation[i].location.street;

    var markup = {};

    markup.employeeCard = '<div class="grid-row--4-cols">' +
                                '<div data-target="modal' + [i] + '" class="employee-card js-toggleModal">' +
                                    '<img class="img--circular" src="' + image + '">' +
                                        '<h2>' + name + '</h2>' +
                                        '<a href="mailto:' + email + '">' + email + '</a>' +
                                        '<span>' + location + '</span>' +
                                '</div>' +
                            '</div>';

    markup.employeeModal =  '<div id ="modal' + [i] + '" class="employee-modal">' +
                                '<button data-target="modal' + [i] + '" class="closeModal js-toggleModal">X</button>' +
                                '<img class="img--circular" src="' + image + '">' +
                                '<h2>' + name + '</h2>' +
                                '<span>location</span>' +
                                '<hr>' +
                                '<span>' + phone + '</span>' +
                                '<span>' + street + ', ' + postcode + '</span>' +
                            '</div>';

    return markup;
}
