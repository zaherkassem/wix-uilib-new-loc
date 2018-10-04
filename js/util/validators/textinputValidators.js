define(['lodash', 'util/validators/validationExpressions'], function (_, validationExpressions) {
    'use strict';

    return {
        /**
         * validation code: V1
         * @param val
         * @returns {boolean}
         */
        email: function (val) {
            if (!val) {
                return true;
            }
            return validationExpressions.validEmailReg.test(val);
        },

        /**
         * validation code: V2
         * @param val
         * @returns {boolean}
         */
        url: function (val) {
            return validationExpressions.validUrlReg.test(val);
        },

        /**
         * validation code: V4, V5 (this is both minimum and maximum)
         * @param min
         * @param max
         * @returns {Function}
         */
        range: function (min, max) {
            return function (val) {
                return !_.isUndefined(val) && val.length >= min && val.length <= max;
            };
        },

        /**
         * validation code: V5
         * @param val
         * @returns {boolean}
         */
        number: function (val) {
            return !_.isEmpty(val) && validationExpressions.validNumericValueReg.test(val);
        },

        /**
         * validation code: V6
         * @param val
         * @returns {boolean}
         */
        videoUrl: function (val) {
            return validationExpressions.validVideoUrlReg.test(val);
        },
        /**
         * validation code: V6
         * @param val
         * @returns {boolean}
         */
        videoUrlDifferentFormats: function (val) {
            return validationExpressions.validYouTubeLongUrlReg.test(val) ||
             validationExpressions.validYouTubeShortUrlReg.test(val) ||
             validationExpressions.validVimeoUrlReg.test(val);
        },

        /**
         * validation code: V9
         * @param val
         * @returns {boolean}
         */
        pinterestPinLink: function (val) {
            return validationExpressions.validPinItUrl.test(val.trim().toLowerCase());
        },

        /**
         * validation code: V14
         * @param val
         * @returns {boolean}
         */
        pinterestFollowUrl: function (val) {
            return validationExpressions.validatePinterestUrl.test(val.trim());
        },

        /**
         * validation code: V19
         * @param val
         * @returns {boolean}
         */
        twitterUser: function (val) {
            return validationExpressions.validTwitterUser.test(val.trim().toLowerCase());
        },

        facebookLink: function (val) {
            return !validationExpressions.validFacebookPageId.test(val);
        },

        disqusId: function (val){
            return validationExpressions.validDisqusId.test(val.toLowerCase());
        },

        notEmpty: function (val) {
            return !_.isEmpty(val);
        },

        noHTMLTags: function (val) {
            return !/<|>/.test(val);
        },

        byInvalidCharacters: function(invalidCharacters) {
            return function(val) {
                var regExp = new RegExp(invalidCharacters);
                return !regExp.test(val);
            };
        },

        rangeOfWords: function (min, max) {
            return function (val) {
                var wordList = val && val.split(/\W+/);
                return !_.isUndefined(wordList) && wordList.length >= min && wordList.length <= max;
            };
        },

        notEmptyString: function (val) {
            return !/^\s*$/.test(val);
        }
    };
});