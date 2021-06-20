const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

// Handle time: Ten thirty 
// is written as "10.30" in British English 
// and "10:30" in American English. 
// The span element should wrap the entire 
// time string, i.e. 
// <span class="highlight">10:30</span>.

// Handle titles/honorifics:
// Doctor Wright is abbreviated as "Dr Wright" 
// in British English and "Dr. Wright" 
// in American English.

// Wrap any translated spelling or terms with 
// <span class="highlight">...</span> tags

// If text requires no translation, 
// return "Everything looks good to me!" 
// for the translation value.

class Translator {

}

module.exports = Translator;