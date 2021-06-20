const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translateAmericanToBritish(text) {
    let translation = text

    const translate = (regex, value) => {
      translation = translation.replace(regex, `<span class=\"highlight\">${value}</span>`)
    }

    for (const key in americanOnly) {
      if (Object.hasOwnProperty.call(americanOnly, key)) {
        const value = americanOnly[key];
        const regex = new RegExp("\\b"+key+"\\b", 'i');
        if (regex.test(translation)) {
          console.log('match 1:', key, value)
          translate(regex, value)
        }
      }
    }

    for (const key in americanToBritishTitles) {
      if (Object.hasOwnProperty.call(americanToBritishTitles, key)) {
        const value = americanToBritishTitles[key];
        const regex = new RegExp("\\b"+key+"."+"\\b", 'i');
        // const regex = new RegExp(`(\\b${key}\\b)(.)(\\s)`, 'i');
        if (regex.test(translation)) {
          console.log('match 2:', key, value)
          translation = translation.replace(regex, `<span class=\"highlight\">${value}&nbsp;</span>`)
          // translation = translation.replace(regex, `<span class=\"highlight\">${value}$3</span>`)
        }
      }
    }

    for (const key in americanToBritishSpelling) {
      if (Object.hasOwnProperty.call(americanToBritishSpelling, key)) {
        const value = americanToBritishSpelling[key];
        const regex = new RegExp("\\b"+key+"\\b", 'i');
        if (regex.test(translation)) {
          console.log('match 3:', key, value)
          translate(regex, value)
        }
      }
    }

    let timeRegex = /([01]?[0-9]|2[0-3])(:)([0-5][0-9])/
    if (timeRegex.test(translation)) {
      // console.log(translation.match(timeRegex))
      translation = translation.replace(timeRegex, "<span class=\"highlight\">$1.$3</span>")
    }

    return translation
  }
  
  translateBritishToAmerican(text) {
    let translation = text
    // '<span class=\"highlight\">highlight</span>.'

    const translate = (regex, value) => {
      translation = translation.replace(regex, `<span class=\"highlight\">${value}</span>`)
    }

    for (const key in britishOnly) {
      if (Object.hasOwnProperty.call(britishOnly, key)) {
        const value = britishOnly[key];
        // const regex = new RegExp("[^-]\\b"+key+"\\b", 'i');
        const regex = new RegExp(`([^-])(\\b${key}\\b)`, 'i');
        if (regex.test(translation)) {
          console.log('match 1:', key, value)
          // translation = translation.replace(regex, `<span class=\"highlight\">&nbsp;${value}</span>`)
          translation = translation.replace(regex, `<span class=\"highlight\">$1${value}</span>`)
        }
      }
    }
    
    for (const key in americanToBritishTitles) {
      if (Object.hasOwnProperty.call(americanToBritishTitles, key)) {
        const value = americanToBritishTitles[key];
        const regex = new RegExp("\\b"+value+"\\b", 'i');
        if (regex.test(translation)) {
          console.log('match 2:', value, key)
          translate(regex, key)
        }
      }
    }

    for (const key in americanToBritishSpelling) {
      if (Object.hasOwnProperty.call(americanToBritishSpelling, key)) {
        const value = americanToBritishSpelling[key];
        const regex = new RegExp("\\b"+value+"\\b", 'i');
        if (regex.test(translation)) {
          console.log('match 3:', value, key)
          translate(regex, key)
        }
      }
    }

    let timeRegex = /([01]?[0-9]|2[0-3])(.)([0-5][0-9])/
    if (timeRegex.test(translation)) {
      // console.log(translation.match(timeRegex))
      translation = translation.replace(timeRegex, "<span class=\"highlight\">$1:$3</span>")
    }

    return translation
  }
}

module.exports = Translator;

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