const ACCEPT_LANGUAGE_HEADER = 'accept-language';
const LOCALE_SEPARATOR = ',';
const LOCALE_ATTRIBUTE_SEPARATOR = ';';
const QUALITY_PREFIX = 'q=';
const pt = require('../strings/pt-br')
const en = require('../strings/en')

module.exports = async (req, res, next) => {
    const messages = {pt, en};
    const _locales = getLocalesByPriority(req.headers[ACCEPT_LANGUAGE_HEADER]);

    let _message = messages.en;
    
    for (var i = 0; i < _locales.length; i++) {
        let _locale = _locales[i];
        if(messages[_locale.language]) {
          _message = messages[_locale.language];
          break;
        }
      }


      req.getMessage = getMessagesOf(_message);
      next();

}

function getMessagesOf(messages) {
    return function getMessage(key) {
      return messages[key];
    };
}

function getLocalesByPriority(headerPropetyContent = '') {
    return headerPropetyContent.split(LOCALE_SEPARATOR)
      .map((localeAttributes) => {
        let _localeAttributes = localeAttributes.split(LOCALE_ATTRIBUTE_SEPARATOR);
  
        let _locale = {
          language: _localeAttributes[0],
          quality: !_localeAttributes[1] ? 1 : parseFloat(_localeAttributes[1].split(QUALITY_PREFIX).pop())
        };
  
        return _locale;
      })
      .sort((locale1, locale2) => {
        return locale1.quality <= locale2.quality;
      });
}