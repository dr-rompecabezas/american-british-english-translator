'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {

      if (!req.body.text || !req.body.locale) {
        res.json({ error: 'Required field(s) missing' })
        return
      }
      if (req.body.text.length === 0) {
        res.json({ error: 'No text to translate' })
        return
      }
      if (req.body.locale !== 'american-to-british' || req.body.locale !== 'british-to-american') {
        res.json({ error: 'Invalid value for locale field' })
        return
      }

      // Sample Request:
      // {
      // 	"text": "We watched the footie match for a while.",
      // 	"locale": "british-to-american"
      // }

      // Sample Response:
      // {
      //   "text": "We watched the footie match for a while.",
      //   "translation": "We watched the <span class=\"highlight\">soccer</span> match for a while."
      // }

      // If text requires no translation, 
      // return "Everything looks good to me!" 
      // for the translation value.
      // Check if text === translation

    });
};
