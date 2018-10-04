define(['json!langs', 'lodash', 'util/bi/bi'], function (langs, _, bi) {
    'use strict';

    var slice = Array.prototype.slice;

    var errors = [];
    var error = function () {
        errors.push(slice.call(arguments));
    };

    var reportError = (function () {
        var keyMissing = function () {};
        if (typeof window !== 'undefined' && window.queryUtil && window.queryUtil.isParameterTrue('isqa')) {
            keyMissing = function (key) {
                var encodedKey = encodeURIComponent(key);
                var url = 'http://itayjiraapp.appspot.com/api/v1/santa/missingkey?key=' + encodedKey;
                var method = 'GET';
                var xhr = new XMLHttpRequest();
                var onChange = function () {
                    if (xhr.readyState === 4 /* complete */) {
                        if (xhr.status === 200 || xhr.status === 304) {
                            //console.log('success');
                        } else {
                            console.log('failed to report missing key:' + key);
                        }
                    }
                };
                xhr.open(method, url, true);
                xhr.onreadystatechange = onChange;
                xhr.send(null);
            };
        } else if (bi) {
            keyMissing = function (key) {
                error(bi.errors.TRANSLATION_ERROR, {
                    p1: key
                });
            };
        }

        var map = {};
        return function (key) {
            if (!map[key]) {
                map[key] = true;
                keyMissing(key);
            }
            return '!' + key + '!';
        };
    }());

    function format(text, args) {
        return text.replace(/\{(\d+)\}/g, function (match, number) {
            return args[number] === undefined ? match : args[number];
        });
    }

    var translationTable = _.object(_.map(langs, function (value, key) {
        return [key.toLowerCase(), value];
    }));

    function translate(key) {
        if (!key) {
            return null;
        }

        var keyLower = key.toLowerCase();
        var translated = translationTable[keyLower];
        if (translated) {
            if (arguments.length > 1) {
                var args = slice.call(arguments, 1);
                return format(translated, args);
            }
            return translated;
        }

        return reportError(key);
    }

    translate.init = function (editorAPI) {
        error = editorAPI.bi.error;
        errors.forEach(function (args) {
            error.apply(null, args);
        });
        errors.length = 0;
    };

    return translate;
});
