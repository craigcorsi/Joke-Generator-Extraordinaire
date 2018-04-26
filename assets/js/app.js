var apiKey = '0reA09JpgnmshGI6Z2Sxl6usmjoWp1aEIV4jsn1ImdkLbThVb6';
var testingKey = 'qINz8NnrVPmshq9TFlEf8RsC0frhp1CIQeRjsnY5jW3G47kS7P';
// var unirest = require('unirest');

requirejs(["unirest"], function(util) {
    console.log('test');
});

unirest.get("https://wordsapiv1.p.mashape.com/words/soliloquy")
.header("X-Mashape-Key", "<" + apiKey + ">")

rest.get()

console.log('hello');