define(['lodash'], function (_) {
    'use strict';

    var lastGeneratedId;
    var counter = 0;
    var GUID_FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    function getUniqueId(prefix, prefixDelimiter) {
        prefix = prefix || '';
        prefixDelimiter = prefixDelimiter || '';
        var value = Date.now();
        if (value === lastGeneratedId) {
            counter++;
        } else {
            lastGeneratedId = value;
            counter = 0;
        }
        return prefix + prefixDelimiter + Number(lastGeneratedId).toString(36) + (counter ? counter : '');
    }

    function randomizeChar(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }

    function getGUID() {
        /**
         * This is the same getGUID algorithm as in old client - we need this for BI, to keep a GUID in the normal GUID format
         * originally from http://stackoverflow.com/a/2117523
         * */
        return GUID_FORMAT.replace(/[xy]/g, randomizeChar);

    }

    /**
     * Generate a page id
     *
     * @param {Array.string} existingPageIds array of existing page ids
     * @returns {*}
     */
    function generateNewPageId(existingPageIds) {
        var generatedId = new Array(4).join().replace(/(.|$)/g, function () {
            return ((Math.random() * 36) | 0).toString(36);
        });
        if (_.includes(existingPageIds, generatedId)) {
            return generateNewPageId(existingPageIds);
        }
        return generatedId;
    }

    return {
        generateNewPageId: generateNewPageId,
        getUniqueId: getUniqueId,
        getGUID: getGUID
    };
});