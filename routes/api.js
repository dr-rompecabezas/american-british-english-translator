'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {

      if (req.body.text.length === 0) {
        res.json({ error: 'No text to translate' })
        return
      }
      if (!req.body.text || !req.body.locale) {
        res.json({ error: 'Required field(s) missing' })
        return
      }

      const text = req.body.text
      const locale = req.body.locale
      let translation;

      if (locale === 'american-to-british') {
        translation = translator.translateAmericanToBritish(text)
      } else if (locale === 'british-to-american') {
        translation = translator.translateBritishToAmerican(text)
      } else {
        res.json({ error: 'Invalid value for locale field' })
      }
      
      if (text === translation) {
        res.json({translation: 'Everything looks good to me!'})
      } else {
        res.json({text, translation})
      }

    });
};
