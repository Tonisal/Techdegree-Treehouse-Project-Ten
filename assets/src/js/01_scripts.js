$(document).ready(function () {
    requestDataFromRandomuser();
});

function requestDataFromRandomuser() {

    $.ajax({
        url: 'https://randomuser.me/api/?results=12&inc=picture,name,email,location',
        dataType: 'json',
        success: function (data) {
            var employeeInformation = data.results;
            console.log(employeeInformation);

            for (var i = 0; i < employeeInformation.length; i++) {
                var markup = buildMarkupForEmployeeCard(employeeInformation);
                console.log(markup);
                $('#employee-cards-container .grid-row').append(markup);
            }

        }
    });
};


function buildMarkupForEmployeeCard(i, employeeInformation) {
    var image = employeeInformation[i].picture.large;
    var name = employeeInformation[i].name.first;
    var email = employeeInformation[i].email;
    var location = employeeInformation[i].location.city;

    var employeeCardMarkup = '<div class="grid-row--4-cols">' +
                                '<div class="employee-card">' +
                                    '<img src="' + image + '">' +
                                    '<div class="text-container">' +
                                        '<h2>' + name + '</h2>' +
                                        '<a href="mailto:' + email + '">' + email + '</a>' +
                                        '<span>' + location + '</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
    return employeeCardMarkup;
}
