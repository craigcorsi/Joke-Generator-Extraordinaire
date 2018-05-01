var apiKey = '0reA09JpgnmshGI6Z2Sxl6usmjoWp1aEIV4jsn1ImdkLbThVb6';
var testingKey = 'qINz8NnrVPmshq9TFlEf8RsC0frhp1CIQeRjsnY5jW3G47kS7P';
var searchTerm;

var wordAttributes = ['also', 'attribute', 'entails', 'examples', 'hasSubstances', 'hasCategories', 'inCategory', 'partOf', 'pertainsTo', 'similarTo', 'substanceOf', 'synonyms', 'typeOf'];

var currentWords;
var currentLists;

//
//
//      FUNCTIONS
//
//


// Fisher-Yates (or Knuth) shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



//   
//          'confirmDefinition' function presents a menu of definitions of a word the user
//          has inputted, prompting the user to choose the correct definition(s)
//

function confirmDefinition() {

    $('#search-results-here').html('');

    // create new div containing all possible definitions.
    var optionAsk = $('<div>').attr('class', 'option-ask').css({
        'border': '1px solid black',
        'border-radius': '10px',
        'padding': '5px 10px',
        'margin': '20px'
    });

    for (var w = 0; w < currentWords.length; w++) {
        for (var i = 0; i < currentLists[w].length; i++) {

            // create div with border enclosing the definition
            var defDiv = $('<div>').attr({
                'class': 'defChoice',
                'collection-index': w,
                'data-index': i,
                'data-selected': false
            }).css({
                'border': '1px solid black',
                'border-radius': '5px',
                'padding': '5px 10px',
                'margin': '20px'
            }).html(currentLists[w][i].definition);
            optionAsk.prepend(defDiv);
        }
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


}

//
//          END OF 'confirmDefinition' function
//





// create an array of _all_ related words

function createRelatedWordsList(terms) {
    var theList = [];
    for (var i = 0; i < terms.length; i++) {
        for (var j = 0; j < wordAttributes.length; j++) {
            if (wordAttributes[j] in terms[i]) {
                theList = theList.concat(terms[i][wordAttributes[j]]);
            }
        }
    }
    return theList;
}




//
//          function 'divideWordsIntoCells' creates several divs with words randomly combined
//

function divideWordsIntoCells(wordList) {
    var numberToPick;
    var cellList = [];
    while (wordList.length > 4) {
        numberToPick = Math.floor(Math.random() * 4) + 2;
        cellList.push(wordList.slice(0, numberToPick));
        wordList = wordList.slice(numberToPick);
    }
    if (wordList.length > 0) {
        cellList.push(wordList.slice());
    }
    return cellList;
}

// function buildCells

function buildCells(cellList) {
    var cellContainer = $('<div>').css({
        'border': '1px solid black',
        'border-radius': '5px',
        'padding': '15px',
        'margin': '10px'
    });
    for (var c = 0; c < cellList.length; c++) {
        var cell = $('<div>').attr({
            'class': 'wordCell'
        }).css({
            'border': '1px solid black',
            'border-radius': '5px',
            'padding': '5px 10px',
            'margin': '20px'
        }).html('How about THIS?<p class="words-in-cell">');
        var words = cellList[c];
        for (var a = 0; a < words.length; a++) {
            cell.find('.words-in-cell').append(words[a] + " ");
        }

        var yesButton = $('<button>').attr('class', 'btn btn-primary yes-button').html('Yes, save this').css('margin', '5px');
        cell.append(yesButton);

        var noButton = $('<button>').attr('class', 'btn btn-primary no-button').html('No, get rid of this');
        cell.append(noButton);

        cellContainer.append(cell);
    }
    $('#search-results-here').append(cellContainer);

    $('body').on('click', '.no-button', function () {
        event.preventDefault();
        $(this).parent().remove();
    });

    $('body').on('click', '.yes-button', function () {
        event.preventDefault();
        var blurb = $(this).parent().find('.words-in-cell')[0].innerText;
        console.log(blurb);
    });
}




//
//          (DEPRECATED FUNCTION) function 'pullRelatedWords' takes a word with a specific definition and displays 
//          several related words in the browser
//


// (DEPRECATED FUNCTION)
// function pullRelatedWords(term) {
//     var cell = $('<div>').css({
//         'border': '1px solid black',
//         'border-radius': '5px',
//         'padding': '15px',
//         'margin': '10px'
//     });
//     cell.append("<p>The definition of this word is: " + term.definition + ".</p>")

//     if (term.synonyms) {
//         cell.append("<p> Here are a few related words: </p>");
//         var l = term.synonyms.length;
//         for (var i = 0; i < l; i++) {
//             cell.append(term.synonyms[i] + "<br>");
//         }
//         cell.append("<br>");
//     }

//     if (term.typeOf) {
//         cell.append("<p> This word is a type of: </p>");
//         var l = term.typeOf.length;
//         for (var i = 0; i < l; i++) {
//             cell.append(term.typeOf[i] + "<br>");
//         }
//         cell.append("<br>");
//     }

//     if (term.partOf) {
//         $('#search-results-here').append(cell);
//         cell.append("<p> This word is part of a: </p>");
//         var l = term.partOf.length;
//         for (var i = 0; i < l; i++) {
//             cell.append(term.typeOf[i] + "<br>");
//         }
//         cell.append("<br>");
//     }

//     $('#search-results-here').prepend(cell);
// }

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

        Cib.saveTopic();

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
            currentWords = [searchTerm];
            currentLists = [selection];
            var term = confirmDefinition();
        });
    });

    // when the user clicks on a definition, it becomes active 
    // This is hard-coded as it relies on the definitions being in a div within a div within #
    $('body').on('click', '#search-results-here div div', function () {
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

        var terms = [];

        console.log(currentWords, currentLists);

        $(this).parent().children('div').each(function () {
            if ($(this).attr('data-selected') == "true") {
                var w = $(this).attr('collection-index');
                terms.push(currentLists[w][$(this).attr('data-index')]);
            }
        });

        Cib.saveDefinition();
        
        // create collection of cells of related words
        var relatedWordsList = createRelatedWordsList(terms);
        relatedWordsList = shuffle(relatedWordsList);
        var cellList = divideWordsIntoCells(relatedWordsList);
        buildCells(cellList);

        // we are done picking definitions, so this menu can be removed
        $(this).parent().remove();
    });
});

/*

Future goals:

Add text to saved blurbs when click yes-button

add the word to the definition display
search a phrase word by word
parse a phrase for important words and search those

*/

