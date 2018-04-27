var apiKey = '0reA09JpgnmshGI6Z2Sxl6usmjoWp1aEIV4jsn1ImdkLbThVb6';
var testingKey = 'qINz8NnrVPmshq9TFlEf8RsC0frhp1CIQeRjsnY5jW3G47kS7P';
// var unirest = require('unirest');

var searchTerm = 'soliloquy'

$(document).ready(function () {
    $.ajax({
        url: "https://wordsapiv1.p.mashape.com/words/" + searchTerm,
        headers: {
            "X-Mashape-Key": apiKey
        }
    }).then(function (response) {
        console.log(response);
    });

});


