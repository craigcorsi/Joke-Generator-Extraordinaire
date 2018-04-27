var apiKey = '0reA09JpgnmshGI6Z2Sxl6usmjoWp1aEIV4jsn1ImdkLbThVb6';
var testingKey = 'qINz8NnrVPmshq9TFlEf8RsC0frhp1CIQeRjsnY5jW3G47kS7P';
// var unirest = require('unirest');

var searchTerm;

function pullRelatedWords(term) {
    var cell = $('<div>').css({ 'border' : '1px solid black' });
    cell.append("<p>The definition of this word is: " + term.definition + ".</p>")

    cell.append("<p> Here are a few related words: </p>");
    var l = term.synonyms.length;
    for (var i=0; i < l; i++) {
        cell.append(term.synonyms[i] + "<br>");
    }
    cell.append("<br>");


    cell.append("<p> This word is a type of: </p>");
    var l = term.typeOf.length;
    for (var i=0; i < l; i++) {
        cell.append(term.typeOf[i] + "<br>");
    }
    cell.append("<br>");

    $('#search-results-here').append(cell);
    cell.append("<p> This word is part of a: </p>");
    var l = term.partOf.length;
    for (var i=0; i < l; i++) {
        cell.append(term.typeOf[i] + "<br>");
    } 
    cell.append("<br>");


    $('#search-results-here').append(cell);
}

$(document).ready(function () {

    $('#button-submit-term').on('click', function() {

        event.preventDefault();

        searchTerm = $('#first-search-term').val().trim();

        $.ajax({
            url: "https://wordsapiv1.p.mashape.com/words/" + searchTerm,
            crossDomain: true,
            headers: {
                "X-Mashape-Key": apiKey,
            },
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            }
        }).then(function (response) {
            term = response.results[0];
            console.log(term);
            pullRelatedWords(term);
            // $('#search-results-here').append(JSON.stringify(response));
        });
    })

});