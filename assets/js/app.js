var apiKey = '0reA09JpgnmshGI6Z2Sxl6usmjoWp1aEIV4jsn1ImdkLbThVb6';
var giphyKey = 'irKsuYqDdx0NOhuarY8zv12EF5Jp48jk';

// list of word attributes accompanying WordsAPI search results
var wordAttributes = ['also', 'attribute', 'entails', 'examples', 'hasSubstances', 'hasCategories', 'inCategory', 'partOf', 'pertainsTo', 'similarTo', 'substanceOf', 'synonyms', 'typeOf'];

// list of unimportant words to filter out
var stopWords = ["the", "a", "about", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thick", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// list of bad words to filter out
var badWords = ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"];


function checkStopWord(word) {
    return stopWords.indexOf(word) == -1 && badWords.indexOf(word) == -1;
}

var searchTerm;
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

function displayErrorMessage() {
    $('#search-results-here').html(
        'No results found. We filter out stop-words (such as prepositions and articles), nonsense words, and bad words.'
    ).css({
        'color': 'pink'
    });
}

function confirmDefinition() {

    $('#search-results-here').html('');

    // create new div containing all possible definitions.
    var optionAsk = $('<div>').attr('class', 'option-ask').css({
        'border': '1px solid black',
        'border-radius': '10px',
        'padding': '5px 10px',
        'margin': '20px',
        "background-color": '#99aabb',
        'color': 'black'
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
                'margin': '20px',
                "background-color": 'white',
                'color': 'black'
            }).html(currentWords[w] + ": " + currentLists[w][i].definition);
            optionAsk.append(defDiv);
        }
    }
    optionAsk.prepend("<p>Which definition(s) match the words in your entry?</p>" + "<button class='btn btn-primary definitionsSubmit'>Submit definitions</button>");

    $('#search-results-here').append(optionAsk);

    // hide the original search query
    $("#input-search-terms-here").hide();

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
    while (wordList.length > 3) {
        numberToPick = Math.floor(Math.random() * 3) + 2;
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
        'width': '95%',
        'border': '1px solid black',
        'border-radius': '5px',
        'padding': '15px',
        'margin': '10px',
        "background-color": '#99aabb',
        'color': 'black'
    });
    for (var c = 0; c < cellList.length; c++) {

        // build a cell containing a blurb of several related words
        var cell = $('<div>').attr({
            'class': 'wordCell'
        }).css({
            'border': '1px solid black',
            'border-radius': '5px',
            'padding': '5px 10px',
            'margin': '20px',
            "background-color": 'white',
            'color': 'black'
        }).html('<span>How about THIS?</span><p class="words-in-cell">');
        var words = cellList[c];
        for (var a = 0; a < words.length; a++) {
            cell.find('.words-in-cell').append(words[a] + " ");
        }

        var yesButton = $('<button>').attr('class', 'btn btn-primary yes-button').html('Yes, save this').css('margin', '5px');
        cell.append(yesButton);

        var noButton = $('<button>').attr('class', 'btn btn-primary no-button').html('No, get rid of this');
        cell.append(noButton);

        cellContainer.append(cell);


        $('#search-results-here').append(cellContainer);

        // create complete button and append to 
        var completeButton = document.createElement("Button");
        completeButton.setAttribute("name", "complete");
        completeButton.setAttribute("class", "btn btn-primary complete-button");
        //completeButton.innerText = "Selection done";
        completeButton.type = "button";
        completeButton.appendChild(document.createTextNode("Selection done"));


        //
        // then, build a cell containing a GIF inspired by the jumble
        //

        var cell = $('<div>').attr({
            'class': 'wordCell',
            'data-text': words[0]
        }).css({
            'border': '1px solid black',
            'border-radius': '5px',
            'padding': '5px 10px',
            'margin': '20px',
            "background-color": 'white'
        }).html('<p>').find('p').html('<span>How about this image?</span>').attr('class', 'qtext').parent();


        var bttn = $('<button>').html('Show').attr('class', 'gif-button').css({
            'padding': '5px',
            'border-radius': '3px'
        });
        cell.append(bttn);

        cellContainer.append(cell);

    }

    cellContainer.append(completeButton);
    cellContainer.prepend("Choose the results that inspire you, then click the button at the bottom!\n\r")

    $('#search-results-here').append(cellContainer);
}





















//
//
// ON-CLICK and ON-HOVER events
//
//

$(document).ready(function () {

    $('#button-submit-term').on('click', function () {

        event.preventDefault();

        searchTerms = $('#first-search-term').val().trim().split(' ');
        // filter out stop words
        searchTerms = searchTerms.filter(checkStopWord);

        // this will be the list of words that return a definition
        var validWords = [];
        // this is an array of each valid word's list of definitions
        var definitionLists = [];

        if (searchTerms.length == 0) {
            displayErrorMessage();
        } else {
            Cib.saveTopic();

            for (var i = 0; i < searchTerms.length; i++) {
                console.log(searchTerms);
                var j = 0;
                $.ajax({
                    url: "https://wordsapiv1.p.mashape.com/words/" + searchTerms[i],
                    crossDomain: true,
                    headers: {
                        "X-Mashape-Key": apiKey
                    },
                    xhrFields: {
                        withCredentials: true
                    }
                }).then(function (response) {
                    // get and store the word's 'definitions' array

                    validWords.push(response.word);
                    definitionLists = definitionLists.concat([response.results]);
                    j++;

                    if (j == searchTerms.length) {
                        currentWords = validWords;
                        currentLists = definitionLists;
                        if (validWords.length > 0) {
                            confirmDefinition();
                        } else {
                            displayErrorMessage();
                        }
                    }
                }, function (error) {
                    j++;
                    if (j == searchTerms.length) {
                        currentWords = validWords;
                        currentLists = definitionLists;
                        if (validWords.length > 0) {
                            confirmDefinition();
                        } else {
                            displayErrorMessage();
                        }
                    }
                });
            }
        }

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
        }
    });

    // when the user clicks the 'submit' button, more details are provided for the selected definitions
    $('body').on('click', '.definitionsSubmit', function () {
        event.preventDefault();

        var terms = [];

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

    $('body').on('click', '.no-button', function () {
        event.preventDefault();

        if ($(this).parent().parent().children().length <= 1) {
            $(this).parent().parent().remove();
        } else {
            $(this).parent().remove();
        }

    });

    var finalChoices = [];
    $('body').on('click', '.yes-button', function () {
        event.preventDefault();
        var blurb = $(this).parent().find('.words-in-cell')[0].innerText;

        // here: save blurb to the database
        console.log(blurb);
        finalChoices.push(blurb);

        $(this).parent().find('span').text('Saved!')
        $(this).parent().find('.no-button').remove();
        $(this).remove();

    });

    $('body').on('click', '.yes-button-gif', function () {
        event.preventDefault();
        var blurb1 = $(this).parent().find('img').attr('data-still');
        var blurb2 = $(this).parent().find('img').attr('data-animated');

        // here: save blurb to the database
        console.log(blurb1, blurb2);

        $(this).parent().find('span').text('Saved!')
        $(this).parent().find('.no-button').remove();
        $(this).remove();

    });

    // indicate completion of selecting the cells
    $('body').on('click', '.complete-button', function () {
        event.preventDefault();

        // save final choices to firebase
        Cib.saveFinalDefinition(finalChoices);

        // display the final choices - this marks the end of the search
        var searchResultHere = $('#search-results-here');
        Cib.displayFinalChoices(searchResultHere, finalChoices);

        $("#input-search-terms-here").show();
        $('#search-results-here').html('');
        $('#first-search-term').val(' ');
        $('#search-instructions').html('Your choices have been saved to the list on the left. Try another subject!')
    });




    $('body').on('click', '.gif-button', function () {
        event.preventDefault();
        var parent = $(this).parent();
        var searchTerm = $(this).parent().attr('data-text');
        console.log(searchTerm);
        var giphyUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + giphyKey + '&q=' + searchTerm + '&limit=10&offset=0&rating=G&lang=en'


        $.ajax({
            url: giphyUrl
        }).then(function (response) {
            var pics = response.data;
            var rand = Math.floor(Math.random() * pics.length);
            var thisPic = pics[rand];
            // construct and display GIF image

            var gifImg = $('<img>').attr({
                'class': 'generated-gif',
                'src': thisPic.images.fixed_height.url,
                'data-still': thisPic.images.fixed_height_still.url,
                'data-animated': thisPic.images.fixed_height.url,
                'data-state': 'still'
            }).css({
                'border': '1px solid black',
                'padding': 0
            });

            parent.append(gifImg);
            parent.append('<br>');

            var yesButton = $('<button>').attr('class', 'btn btn-primary yes-button-gif').html('Yes, save this').css('margin', '5px');
            parent.append(yesButton);

            var noButton = $('<button>').attr('class', 'btn btn-primary no-button').html('No, get rid of this');
            parent.append(noButton);
            parent.find('.gif-button').remove();
            parent.find('.qtext').remove();

        }, function (error) {
            console.log(error);
        });

    });


    // click on GIF images to animate them
    $('body').on('click', '.generated-gif', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            var newSrc = $(this).attr('data-animated');
            console.log(newSrc);
            $(this).attr({
                'src': newSrc,
                'data-state': 'animated'
            });
        } else {
            var newSrc = $(this).attr('data-still');
            $(this).attr({
                'src': newSrc,
                'data-state': 'still'
            });
        }
    });

});


