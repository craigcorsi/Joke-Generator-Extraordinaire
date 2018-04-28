var apiKey = '0reA09JpgnmshGI6Z2Sxl6usmjoWp1aEIV4jsn1ImdkLbThVb6';
var testingKey = 'qINz8NnrVPmshq9TFlEf8RsC0frhp1CIQeRjsnY5jW3G47kS7P';
var searchTerm;

//
//
//      FUNCTIONS!
//
//



//   
//          'confirmDefinition' function presents a menu of definitions of a word the user
//          has inputted, prompting the user to choose the correct definition(s)
//

function confirmDefinition(list) {

    $('#search-results-here').html('');

    var optionAsk = $('<div>').attr('class', 'option-ask').css({
        'border': '1px solid black',
        'border-radius': '10px',
        'padding': '5px 10px',
        'margin': '20px'
    });
    // create new div containing all possible definitions.
    for (var i = 0; i < list.length; i++) {

        // create div with border enclosing the definition
        var defDiv = $('<div>').attr({
            'class': 'defChoice',
            'data-index': i,
            'data-selected': false
        }).css({
            'border': '1px solid black',
            'border-radius': '5px',
            'padding': '5px 10px',
            'margin': '20px'
        }).html(list[i].definition);
        optionAsk.prepend(defDiv);
    }
    optionAsk.prepend("<p>Which definition(s) did you have in mind?</p>" +
        "<button class='definitionsSubmit'>Submit definitions</button>");

    $('#search-results-here').append(optionAsk);


    // when the user hovers over a definition, it becomes visibly clickable
    // This is hard-coded as it relies on the definitions being in a div within a div within #
    $('#search-results-here div div').hover(function () {
        $(this).css({
            'background-color': '#ddd',
            'cursor': 'pointer'
        });
    }, function () {
        $(this).css({
            'background-color': 'white',
            'cursor': 'default'
        });
    });

    // when the user clicks on a definition, it becomes active 
    // This is hard-coded as it relies on the definitions being in a div within a div within #
    $('#search-results-here div div').click(function () {
        switch ($(this).attr('data-selected')) {
            case "true":
                $(this).css({
                    "border": "1px solid black"
                });
                $(this).attr('data-selected', false);
                break;
            case "false":
                $(this).css({
                    "border": "3px solid black"
                });
                $(this).attr('data-selected', true);
                break;
            default:
                console.log("?");
        }
    });

    // when the user clicks the 'submit' button, more details are provided for the selected definitions
    $('body').on('click', '.definitionsSubmit', function () {
        event.preventDefault();

        // pull a list of related words for each chosen definition
        $(this).parent().children('div').each(function () {
            if ($(this).attr('data-selected') == "true") {
                var term = list[$(this).attr('data-index')];
                console.log(term);
                pullRelatedWords(list[$(this).attr('data-index')]);
            }
        });
        // we are done picking definitions, so this menu can be removed
        $(this).parent().remove();
    });

}

//
//          END OF 'confirmDefinition' function
//




//
//          function 'pullRelatedWords' takes a word with a specific definition and displays 
//          several related words in the browser
//

function pullRelatedWords(term) {
    var cell = $('<div>').css({ 
        'border': '1px solid black',
        'border-radius': '5px',
        'padding': '15px',
        'margin': '10px'
    });
    cell.append("<p>The definition of this word is: " + term.definition + ".</p>")

    if (term.synonyms) {
        cell.append("<p> Here are a few related words: </p>");
        var l = term.synonyms.length;
        for (var i = 0; i < l; i++) {
            cell.append(term.synonyms[i] + "<br>");
        }
        cell.append("<br>");
    }

    if (term.typeOf) {
        cell.append("<p> This word is a type of: </p>");
        var l = term.typeOf.length;
        for (var i = 0; i < l; i++) {
            cell.append(term.typeOf[i] + "<br>");
        }
        cell.append("<br>");
    }

    if (term.partOf) {
        $('#search-results-here').append(cell);
        cell.append("<p> This word is part of a: </p>");
        var l = term.partOf.length;
        for (var i = 0; i < l; i++) {
            cell.append(term.typeOf[i] + "<br>");
        }
        cell.append("<br>");
    }

    $('#search-results-here').append(cell);
}

//
//          END of 'pullRelatedWords' function
//






//
//
// other ON-CLICK and ON-HOVER events
//
//

$(document).ready(function () {

    $('#button-submit-term').on('click', function () {

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
            // present the word's definitions for the user to specify
            var selection = response.results;
            var term = confirmDefinition(selection);
        });
    });
});

/*

Today's goals: 

- break into 10 pieces  (randomizer)
-put each into a cell with a dismiss button

*/