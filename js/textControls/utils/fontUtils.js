define(['lodash', 'util', 'pLoader!santa:fonts'], function (_, util, fonts) {
    'use strict';

    function getTextCustomFonts(text, documentType, languages, result) {
        if (text) {
            var customFontFamilies = fonts.fontUtils.collectFontsFromTextDataArray([text]);
            var url = getFontsUrlWithParams(customFontFamilies, documentType, languages);

            result.fonts = result.fonts.concat(customFontFamilies);
            if (url) {
                result.urls.push(url);
            }
        }
    }

    function getStylesFonts(themeFonts, result, documentType, languages) {
        var stylesFontFamilies = _(themeFonts)
            .map(function (font) {
                return fonts.fontUtils.getFontFamily(font).replace(/\+/g, ' ').toLowerCase();
            })
            .uniq()
            .value();

        var url = getFontsUrlWithParams(stylesFontFamilies, documentType, languages);

        result.fonts = result.fonts.concat(stylesFontFamilies);
        if (url) {
            result.urls.push(url);
        }
    }

    function getFontsUrlWithParams(fontFamilies, documentType, languages) {
        var result = fonts.fontUtils.getFontsUrlWithParams(fontFamilies, documentType, languages);
        if (result) {
            return result;
        }

        return '';
    }

    function getWixStoredFontsCss(languages) {
        //Wix CDN stored fonts
        //todo - get santaBase from service topology
        var santaBase = 'http://static.parastorage.com/services/santa/1.428.10/';
        return fonts.fontUtils.getWixStoredFontsCssUrlsWithParams(santaBase, languages);
    }

    function getFontsToLoad(text, documentType, languages, themeFonts) {
        var result = {
            fonts: [],
            urls: []
        };

        getTextCustomFonts(text, documentType, languages, result);
        getStylesFonts(themeFonts, result, documentType, languages);
        result.urls = result.urls.concat(getWixStoredFontsCss(languages));

        return result;
    }

    function getStyleFont(styleTagName, stylesMap, themeColors, themeFonts) {
        var fontStyle = stylesMap[styleTagName];
        if (fontStyle) {
            return fonts.fontUtils.parseStyleFont(fontStyle.cssClass, themeFonts, themeColors);
        }
    }

    function getCurrentSelectableFontsWithParams(documentSerivces, languages) {
        var documentType = documentSerivces.generalInfo.getDocumentType();
        languages = languages || documentSerivces.theme.fonts.getCharacterSet();

        return fonts.fontUtils.getCurrentSelectablefontsWithParams(documentType, languages);
    }

    function createFontsCssString(themeColorsData, stylesMap, themeFonts) {
        var fontNameToStyle = _.groupBy(stylesMap, 'cssClass');
        var cssString = '';
        _.forEach(themeFonts, function (fontValue, fontName) {
            var fontCss = 'font: ' + fonts.fontCss.fontToCSSWithColor(fontValue, themeColorsData);
            var selector = createCssSelector(fontName, fontNameToStyle);
            cssString += selector + '{' + fontCss + '}';
        });
        return cssString;
    }

    function createCssSelector(fontName, fontNameToStyle) {
        var selector = '';
        if (fontNameToStyle[fontName]) {
            _.forEach(fontNameToStyle[fontName], function (style) {
                selector += style.tag + ', ';
            });
        }

        selector += '.' + fontName;

        return selector;
    }

    function getFont(fontName) {
        fontName = fontName.toLowerCase();
        return fonts.fontMetadata[fontName];
    }

    /**
     * Used by the blog old ck editor
     * @returns {*}
     */
    function getFontsMetadata() {
        var fontMetadata = _.clone(fonts.fontMetadata);
        _.forEach(fontMetadata, function (font, fontName) {
            font.cssFontFamily = fonts.fontUtils.getFontFamilyWithFallbacks(fontName);
        });

        return fontMetadata;
    }

    /**
     * Used by the blog old ck editor
     * @returns {*}
     */
    function getAllCustomFontsUrls(documentType, languages) {
        var allCustomFonts = {};

        _.forEach(fonts.fontMetadata, function (font, fontName) {
            if (font.cdnName) {
                allCustomFonts[fontName] = fontName;
            }
        });

        var allCustomFontsUrl = getFontsUrlWithParams(_.keys(allCustomFonts), documentType, languages);


        return {
            'missingFontsNames': allCustomFonts,
            'missingFontsUrl': allCustomFontsUrl
        };
    }

    function stringifyFontWithoutColor(fontObject) {
        return this.stringifyFont(fontObject, false);
    }

    function stringifyBold(bold) {
        if (bold === true) {
            return '700';
        } else if (bold === false) {
            return 'normal';
        }

        return bold;
    }

    function stringifyItalic(italic) {
        if (italic === true) {
            return 'italic';
        } else if (italic === false) {
            return 'normal';
        }

        return italic;
    }

    function stringifyFont(fontObject, withColor, themeColors) {
        var result = stringifyItalic(fontObject.italic) + ' ' +
            fontObject.variant + ' ' +
            stringifyBold(fontObject.bold) + ' ' +
            fontObject.size + '/' + fontObject.lineHeight + ' ' +
            fontObject.family.replace(/\s/g, '+');

        if (withColor && fontObject.color) {
            var color = util.colors.getColorInHex(fontObject.color);
            if (themeColors) {
                var foundColor = _.findKey(themeColors, function(themeColor) {
                    return themeColor === color;
                });

                if (foundColor) {
                    color = '{' + foundColor + '}';
                }
            }

            result += ' ' + color;
        }

        return result;
    }

    return {
        getStyleFont: getStyleFont,
        getFontsToLoad: getFontsToLoad,
        parseStyleFont: fonts.fontUtils.parseStyleFont,
        stringifyFontWithoutColor: stringifyFontWithoutColor,
        stringifyFont: stringifyFont,
        createFontsCssString: createFontsCssString,
        getCurrentSelectableFontsWithParams: getCurrentSelectableFontsWithParams,
        getFont: getFont,
        getWixStoredFontsCss: getWixStoredFontsCss,
        getFontsMetadata: getFontsMetadata,
        getTextCustomFonts: getTextCustomFonts,
        getAllCustomFontsUrls: getAllCustomFontsUrls,
        getFontsUrlWithParams: getFontsUrlWithParams
    };
});
