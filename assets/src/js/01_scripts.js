$(document).ready(function () {
    requestDataFromRandomuser();

    $(document).on("click", ".js-toggleModal", function () {
        var target = $(this).attr('data-target');
        $('body').toggleClass("no-scroll");
        $('.modal-container').toggleClass("show");
        $('.modal-background').toggleClass("show");
        $('#' + target).toggleClass('show');

    });

    $(document).on("click", ".js-changeModal", function () {
        showNewModal(event);
    });

    $("#filterEmployees").keyup(function () {
       filterEmployees(event);
    });

});

function requestDataFromRandomuser() {

    $.ajax({
        url: 'https://randomuser.me/api/?results=12&inc=picture,name,email,location,phone,dob&nat=gb',
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
    var firstName = employeeInformation[i].name.first;
    var lastName = employeeInformation[i].name.last;
    var email = employeeInformation[i].email;
    var location = employeeInformation[i].location.city;
    var phone = employeeInformation[i].phone;
    var postcode = employeeInformation[i].location.postcode;
    var street = employeeInformation[i].location.street;

    var birth = employeeInformation[i].dob.date.split('T')[0].split('-');


    var markup = {};

    markup.employeeCard = '<div class="grid-row--4-cols">' +
        '<div data-target="modal-' + [i] + '" data-employee="' + firstName + ' ' + lastName + '" class="employee-card js-toggleModal">' +
        '<img class="img--circular" src="' + image + '">' +
        '<h2>' + firstName + ' ' + lastName + '</h2>' +
        '<a href="mailto:' + email + '">' + email + '</a>' +
        '<span>' + location + '</span>' +
        '</div>' +
        '</div>';

    markup.employeeModal = '<div id ="modal-' + [i] + '" class="employee-modal">' +
        '<button data-target="modal' + [i] + '" class="closeModal js-toggleModal">X</button>' +
        '<div class="button-container">' +
        '<a class ="prev js-changeModal">Privious Emplyoee</a>' +
        '<a class ="next js-changeModal">Next Employee</a>' +
        '</div>' +
        '<img class="img--circular" src="' + image + '">' +
        '<h2>' + firstName + ' ' + lastName + '</h2>' +
        '<a href="mailto:' + email + '">' + email + '</a>' +
        '<span>' + location + '</span>' +
        '<hr>' +
        '<span>' + phone + '</span>' +
        '<span>' + street + ', ' + postcode + '</span>' +
        '<span> Birthday: ' + birth[2] + '/' + birth[1] + '/' + +birth[0] + '</span>' +
        '</div>';

    return markup;
}

function showNewModal(event) {
    var activeModal = $('.employee-modal.show').attr('id').split('-')[1];
    activeModal = Number(activeModal); // Switch data type -> string to number

    if ($(event.target).hasClass('prev')) {
        nextModal = activeModal - 1;
    } else {
        nextModal = activeModal + 1;
    }

    $('.employee-modal.show').removeClass('show');
    $('#modal-' + nextModal).addClass('show');
}

function filterEmployees(event) {
    var employeeToSearch = event.target.value;
    console.log('suche ' + employeeToSearch);
    var employees = $('.employee-card');
    employees.each(function () {
        var currentEmployee = $(this).attr('data-employee');
        console.log(currentEmployee);
        var show = currentEmployee.search(employeeToSearch);

        if (show === -1 ) {
            $(this).parent().addClass('hide');
        } else {
            $(this).parent().removeClass('hide');
        }

    });
}
