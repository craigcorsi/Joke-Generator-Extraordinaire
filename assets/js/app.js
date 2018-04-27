var apiKey = '0reA09JpgnmshGI6Z2Sxl6usmjoWp1aEIV4jsn1ImdkLbThVb6';
var testingKey = 'qINz8NnrVPmshq9TFlEf8RsC0frhp1CIQeRjsnY5jW3G47kS7P';
// var unirest = require('unirest');

var searchTerm;

$(document).ready(function () {

    $('#button-submit-term').on('click', function() {

        event.preventDefault();

        searchTerm = $('#first-search-term').val().trim();

        $.ajax({
            url: "https://wordsapiv1.p.mashape.com/words/" + searchTerm,
            headers: {
                "X-Mashape-Key": apiKey
            },
            xhrFields: {
                withCredentials: true
            }
        }).then(function (response) {
            console.log(response);
            $('#search-results-here').append(JSON.stringify(response));
        });
    })

});