define(['lodash', 'jquery', 'textControls/utils/fontUtils'], function (_, $, fontUtils) {
    'use strict';

    function getMostCommonTextSize(html, themeFonts) {
        var fontSizesToCharsCount = {};
        var tempDiv = document.createElement('div');

        tempDiv.innerHTML = html;
        countCharsForEachFontSize(tempDiv, fontSizesToCharsCount, themeFonts, '');
        return parseInt(getMaxValueKey(fontSizesToCharsCount), 10);
    }

    function getMaxValueKey(map) {
        var max;
        var maxKey = '';
        _.forEach(map, function (value, key) {
            if (max === undefined || max < value) {
                max = value;
                maxKey = key;
            }
        });

        return maxKey;
    }

    function countCharsForEachFontSize(node, fontSizesToCharsCount, themeFonts, fontSize) {
        if (node.nodeName === '#text') {
            return;
        }
        fontSize = (getFontSize(node, themeFonts)) ? getFontSize(node, themeFonts) : fontSize;
        _.forEach(node.childNodes, function (childNode) {
            if (childNode.nodeName === '#text') {
                if (fontSize) {
                    var innerTextLength = childNode.textContent.replace(/ /g, '').length;
                    if (!fontSizesToCharsCount[fontSize]) {
                        fontSizesToCharsCount[fontSize] = 0;
                    }
                    fontSizesToCharsCount[fontSize] += innerTextLength;
                }
            } else {
                countCharsForEachFontSize(childNode, fontSizesToCharsCount, themeFonts, fontSize);
            }
        });
    }

    function getFontSize(node, themeFonts) {
        var fontSize = $(node).css('fontSize');

        if (!fontSize) {
            _.forEach(node.classList, function (className) {
                if (themeFonts[className]) {
                    fontSize = fontUtils.parseStyleFont(className, themeFonts).size;
                }
            });
        }
        return fontSize;
    }

    return {
        getMostCommonTextSize: getMostCommonTextSize
    };

});
