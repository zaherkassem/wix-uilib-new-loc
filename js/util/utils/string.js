define([], function () {
    'use strict';
    /**
     * @class utils.stringUtils
     */
    return {
        /**
         * Returns the string with the first character capitalized
         *
         * @param {string} String to be capitalized
         * @param {boolean} [lowerCaseElse] Pass true if the rest of the string should be lower case
         * @returns {string}
         */
        capitalize: function (string, lowerCaseElse) {
            return string.charAt(0).toUpperCase() + (lowerCaseElse ? string.slice(1).toLowerCase() : string.slice(1));
        },

        /**
         * Returns true if string starts with 'startsWith' parameter, false otherwise.
         *
         * If 'ignoreCase' is true, the function will be case insensitive
         *
         * @param {string} string
         * @param {string} startsWith
         * @param {boolean} [ignoreCase]
         * @returns {boolean}
         */
        startsWith: function (string, startsWith, ignoreCase) {
            if (!string) {
                return false;
            }
            if (ignoreCase) {
                return string.toLowerCase().indexOf(startsWith.toLowerCase()) === 0;
            }
            return string.indexOf(startsWith) === 0;
        },

        isNullOrEmpty: function (str) {
            return !str || !str.trim();
        },
        /**
         * Removes all closing and opening html/xml tags from a string, returning only plain text
         * @param str
         * @returns {string}
         */
        removeHtmlTagsFromString: function (str) {
            return str.replace(/<[^<]*>/g, '');
        },

        /**
         * Removes newline and line feed characters from a string, returning a one line string
         * @param str
         * @returns {string}
         */
        removeBreakLinesFromString: function(str){
            return str.replace(/[\n\r]/g, ' ');
        },

        isTrue: function (str) {
            return str === 'true';
        }
    };
});
