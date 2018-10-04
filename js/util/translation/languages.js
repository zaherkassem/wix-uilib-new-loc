define(['lodash', 'util/url/url', 'util/translation/translate', 'util/editorModel/editorModel'], function (_, url, translate, editorModel) {

    'use strict';

    var AVAILABLE_LANGUAGES_VALUES = ['da', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'ru', 'sv', 'tr'];
    var LANGUAGES_SUPPORTED_BY_TWITTER = ['da', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'ru', 'sv', 'tr'];
    var LANGUAGES_SUPPORTED_BY_FACEBOOK = ['da', 'de', 'en', 'es', 'fr', 'it', 'ja', 'kr', 'nl', 'no', 'pl', 'pt', 'ru', 'sv', 'tr'];
    var LANGUAGES_SUPPORTED_BY_PAYPAL = ['da', 'de', 'en', 'es', 'fr', 'it', 'ja', 'nl', 'no', 'pl', 'pt', 'ru', 'sv', 'tr'];
    var LANGUAGES_SUPPORTED_BY_ITUNES = ['da', 'de', 'en', 'es', 'fr', 'it', 'jp', 'ko', 'nl', 'no', 'pl', 'pt', 'ru', 'sv', 'tr'];
    var LANGUAGES_SUPPORTED_BY_GOOGLE_MAPS = ['da', 'de', 'en', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'no', 'pl', 'pt', 'ru', 'sv', 'tr'];
    var LANGUAGE_TRANSLATION_KEY_PREFIX = 'Supported_Languages_';

    var LANGUAGES_LIST = _.map(AVAILABLE_LANGUAGES_VALUES, function (langValue) {
        return {
            value: langValue,
            label: translate(LANGUAGE_TRANSLATION_KEY_PREFIX + langValue.toUpperCase())
        };
    });

    return {
        getLanguagesList: function () {
            return LANGUAGES_LIST;
        },
        getTwitterLanguages: function () {
            return LANGUAGES_SUPPORTED_BY_TWITTER;
        },
        getFacebookLanguages: function () {
            return LANGUAGES_SUPPORTED_BY_FACEBOOK;
        },
        getITunesLanguages: function () {
            return LANGUAGES_SUPPORTED_BY_ITUNES;
        },
        getPaypalLanguages: function () {
            return LANGUAGES_SUPPORTED_BY_PAYPAL;
        },
        getGoogleMapsLanguages: function () {
            return LANGUAGES_SUPPORTED_BY_GOOGLE_MAPS;
        },
        getLanguageKeyByLang: function (lang) {
            return 'LANGS_' + lang;
        },
        getLanguageCode: function () {
            return editorModel.languageCode;
        }
    };
});
