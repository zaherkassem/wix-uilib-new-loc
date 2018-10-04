define(['lodash', 'fonts/utils/fontMetadata'], function (_, fontsMetadata) {
    'use strict';
    var GOOGLE_FONT_SERVICE_URL = "//fonts.googleapis.com/css?family=";
    var POSSIBLE_CHARACTERS_SETS = ['latin-ext', 'cyrillic', 'japanese', 'korean', 'arabic', 'hebrew', 'latin'];

    var fontOverridesRegex = /(<[^>]+["']font-family:\s*)([^,;]+)([,;])/g;
    var styleFontsRegex = /<[^>]+class="[^"]*(font_[0-9]+)[^"]*"/g;

    var customTextDataGetterMap = {
        StyledText: function (siteData, dataItem) {
            return [dataItem.text];
        },
        RichText: function (siteData, dataItem) {
            return [dataItem.text];
        }
    };

    function registerCustomTextDataGetter (type, getter) {
        customTextDataGetterMap[type] = getter;
    }

    var customFontFamiliesGetterMap = {};

    function registerCustomFontFamiliesGetter(type, getter) {
        customFontFamiliesGetterMap[type] = getter;
    }

    function parseFontStr(fontStr) {
        var split = fontStr.split(' ');
        var sizeSplit = split[3] ? split[3].split('/') : [];
        return {
            style: split[0],
            variant: split[1],
            weight: split[2],
            size: sizeSplit[0],
            lineHeight: sizeSplit[1],
            family: split[4].replace(/\+/g, ' '),
            color: split[5],
            bold: split[2] === 'bold' || parseInt(split[2], 10) >= 700,
            italic: split[0] === 'italic'
        };
    }

    function getFontFamily(fontStr) {
        return fontStr.split(' ')[4];
    }

    function getMetadata(fontNames) {
        return _.compact(_.map(fontNames, function (fontName) {
            return fontsMetadata[fontName];
        }));
    }

    function getFontFallback(fontFamily) {
        var cleanFontName = fontFamily.replace(/\+/g, " ").toLowerCase();
        var fontMeta = fontsMetadata[cleanFontName];
        var fallback = fontMeta.fallbacks;
        if (fallback) {
            fallback += ",";
        }
        fallback += fontMeta.genericFamily;
        return fallback;
    }

    function formatFallbackList(fallbacks) {
      var fallbacksArray = fallbacks.split(',');
      fallbacksArray = _.map(fallbacksArray, function (fallBackFont) {
        //surround fonts with quotes if font name contains spaces or non-latin chars
        return fallBackFont.replace(/.*[^\w\d\-].*/, '"$&"');
      });
      return fallbacksArray.join(',');
    }

    function getFontFallbacksCss(fontName) {
        var font = fontsMetadata[fontName.toLowerCase()];
        var fontFamily = font.fontFamily,
            fallbacks;
        if (font) {
            fallbacks = fontFamily;
            if (font.fallbacks !== '') {
                fallbacks += ',' + font.fallbacks;
            }
            fallbacks += ',' + font.genericFamily;
        } else {
            fallbacks = fontName;
        }

        return formatFallbackList(fallbacks);
    }

    function getGoogleFontsUrl(fonts, characterSets) {
        if (fonts.length === 0) {
            return undefined;
        }

        var fontQuery = _.map(fonts, function (font) {
            return font.cdnName + ':n,b,i,bi|';
        });
        if (characterSets) {
            fontQuery.push('&subset=');
            fontQuery.push(characterSets.join(','));
        }

        return GOOGLE_FONT_SERVICE_URL + fontQuery.join("");
    }

    function getPageFontsMetaData(siteData, pageId) {
        return getMetadata(getPageUsedFontsList(siteData, pageId));
    }

    function getPageUsedFontsList(siteData, pageId) {
        return computePageUsedFontsList(siteData, pageId);
    }

    function collectFontFamiliesFromStyles (siteData) {
        var styles = _.times(11, function (n) {
            return "font_" + n;
        });
        return getFontFamilyFromStyleIds(siteData, styles);
    }

    function collectFontsFromTextDataArray (textDataArray) {
        return _.reduce(textDataArray, function (acc, textData) {
            fontOverridesRegex.lastIndex = 0;
            var match;
            while ((match = fontOverridesRegex.exec(textData))) {
                acc.push(match[2].replace(/['"]/g, ''));
            }
            return acc;
        }, []);
    }

    function computePageUsedFontsList(siteData, pageId) {
        var currentPageData = siteData.getPageData(pageId).data.document_data;

        var fontFamiliesFromTextData = _(currentPageData)
            .filter(function (data) {
                return _.has(customTextDataGetterMap, data.type);
            })
            .map(function (data) {
                var textDataArray = customTextDataGetterMap[data.type](siteData, data);
                return _.union(collectFontsFromTextDataArray(textDataArray));
            })
            .flattenDeep()
            .value();

        var customFontFamilies = _(currentPageData)
            .filter(function (data) {
                return _.has(customFontFamiliesGetterMap, data.type);
            })
            .map(function (data) {
                return customFontFamiliesGetterMap[data.type](siteData, data) || [];
            })
            .flattenDeep()
            .value();

        var fontFamilies = _.union(fontFamiliesFromTextData, customFontFamilies, collectFontFamiliesFromStyles(siteData));

        return _.filter(fontFamilies, function (fontFamilyName) {
            return _.has(fontsMetadata, fontFamilyName);
        });
    }

    function getFontFamilyFromStyleIds(siteData, fontStylesIds) {
        var generalThemeData = siteData.getGeneralTheme();
        return _.map(fontStylesIds, function (fontStyleId) {
            return getFontFamilyByStyleId(generalThemeData, fontStyleId);
        });
    }

    function getFontFamilyByStyleId(generalThemeData, stylesId) {
        var fontStyles = generalThemeData.font;
        var fontIndex = parseInt(stylesId.substring(stylesId.indexOf("_") + 1), 10);
        var fontStyleString = fontStyles[fontIndex];
        var fontFamily = '';
        if (fontStyleString) {
            fontFamily = parseFontStr(fontStyleString).family.toLowerCase();
        }
        return fontFamily;
    }

    function getFontFamilyWithFallbacks(fontName) {
        var font = fontsMetadata[fontName.toLowerCase()];
        var fontFamily = font && font.fontFamily,
            fallbacks;

        if (font) {
            fallbacks = fontFamily;
            if (font.fallbacks !== '') {
                fallbacks += ',' + font.fallbacks;
            }
            fallbacks += ',' + font.genericFamily;
        } else {
            fallbacks = fontName;
        }

        return formatFallbackList(fallbacks);
    }

    function getWixStoredFontsCssUrlsWithParams(baseUrl, characterSets) {
        var urls = [];
        var slashDivider = "/";
        baseUrl = _.includes(baseUrl, 'localhost') ? baseUrl : baseUrl.replace("http://", "//");
        if (baseUrl.charAt( baseUrl.length - 1) === "/") {
            //no need to add a slash to the base url
            slashDivider = "";
        }

        var fontsCssBaseUrl = baseUrl + slashDivider + 'static/css/user-site-fonts/';

        if (characterSets) {
            for (var i = 0; i < characterSets.length; i++) {
                urls.push(fontsCssBaseUrl + characterSets[i] + ".css");
            }
        }
        return urls;
    }

    function getWixStoredFontsCssUrls(siteData) {
        return getWixStoredFontsCssUrlsWithParams(siteData.santaBase, siteData.getDataByQuery("SITE_STRUCTURE").characterSets);
    }

    function getCurrentSelectablefontsWithParams(documentType, characterSets) {
        var fonts = [];
        var languagesFontsLists = addFontsByPermissionToFontsList(documentType);
        for (var i = 0; i < POSSIBLE_CHARACTERS_SETS.length; i++) {
            var currentCharSet = POSSIBLE_CHARACTERS_SETS[i];
            if (_.includes(characterSets, currentCharSet)) {
                fonts.push({
                    lang: currentCharSet,
                    fonts: languagesFontsLists[currentCharSet]
                });
            }
        }
        return fonts;
    }

    function getCurrentSelectablefonts(siteData) {
        return getCurrentSelectablefontsWithParams(siteData.rendererModel.siteInfo.documentType, siteData.getDataByQuery("SITE_STRUCTURE").characterSets);
    }

    function addFontsByPermissionToFontsList(documentType) {
        var permissions = ['all', 'legacy'];
        if (documentType === 'WixSite') {
            permissions.push('studio');
        }
        var langs = _.reduce(fontsMetadata, function (res, value, key) {
            var fontCharacterSets = value.characterSets;
            if (_.includes(permissions, value.permissions)) {
                value.cssFontFamily = getFontFallbacksCss(key);
                _.forEach(fontCharacterSets, function (charSet) {
                    if (!res[charSet]) {
                        res[charSet] = [];
                    }
                    res[charSet].push(value);
                }, this);
            }
            return res;
        }, {});

        return _.forOwn(langs, function (fontList, charSet) {
            langs[charSet] = _.sortBy(fontList, function (font) {
                return font.displayName;
            });
        }, this);
    }

    function getFontsUrlWithParams(fontNamesObject, documentType, characterSets) {
        var fontsFamiliesArray = (_.isArray(fontNamesObject) ? fontNamesObject : _.keys(fontNamesObject));
        var query = getFontsQuery(fontsFamiliesArray, documentType, characterSets);
        if (query) {
            return GOOGLE_FONT_SERVICE_URL + query;
        }

        return "";
    }

    function getFontsUrl(fontNamesObject, siteData) {
        return getFontsUrlWithParams(fontNamesObject, siteData.rendererModel.siteInfo.documentType, siteData.getDataByQuery("SITE_STRUCTURE").characterSets);
    }

    function getFontsPermissions(documentType) {
        var permissions = ['all', 'legacy'];
        if (documentType === 'WixSite') {
            permissions.push('studio');
        }
        return permissions;
    }

    function getFontsQuery(fontsFamiliesArray, documentType, characterSets) {
        var fontQuery = '';
        var permissions = getFontsPermissions(documentType);
        _.forEach(fontsFamiliesArray, function (fontFamily) {
            var font = fontsMetadata[fontFamily];
            if (font && font.cdnName && _.includes(permissions, font.permissions)) {
                fontQuery += font.cdnName;
                fontQuery += ':n,b,i,bi|';
            }
        });
        if (fontQuery === '') {
            return null;
        }
        if (characterSets) {
            fontQuery += '&subset=' + characterSets.join(',');
        }
        return fontQuery;
    }

    function getFontClassName(text) {
        styleFontsRegex.lastIndex = 0;
        var match = styleFontsRegex.exec(text);
        return match ? match[1] : undefined;
    }

    function parseStyleFont(fontStyleName, themeFonts, themeColors) {
        if (themeFonts[fontStyleName]) {
            var fontObject = parseStringFont(themeFonts[fontStyleName]);
            return parseThemeFontColor(fontObject, themeColors);
        }
        return parseStringFont(fontStyleName);
    }

    function parseThemeFontColor(fontObject, themeColors) {
        var fontColor = fontObject.color && fontObject.color.match(/{([^}]+)}/);
        if (themeColors && fontColor && themeColors[fontColor[1]]) {
            fontObject.cssColor = themeColors[fontColor[1]];
        } else {
            fontObject.cssColor = fontObject.color;
        }
        return fontObject;
    }

    function parseStringFont(fontValue) {
        var fontObject = parseFontStr(fontValue);
        fontObject.fontWithFallbacks = getFontFamilyWithFallbacks(fontObject.family);
        return fontObject;
    }

    return {
        parseFontStr: parseFontStr,
        parseStyleFont: parseStyleFont,
        getMetadata: getMetadata,
        getGoogleFontsUrl: getGoogleFontsUrl,
        getFontFamily: getFontFamily,
        getFontFallback: getFontFallback,
        getPageFontsMetaData: getPageFontsMetaData,
        getFontFamilyWithFallbacks: getFontFamilyWithFallbacks,
        getWixStoredFontsCssUrls: getWixStoredFontsCssUrls,
        getWixStoredFontsCssUrlsWithParams: getWixStoredFontsCssUrlsWithParams,
        getCurrentSelectablefonts: getCurrentSelectablefonts,
        getCurrentSelectablefontsWithParams: getCurrentSelectablefontsWithParams,
        getFontsUrl: getFontsUrl,
        getFontsUrlWithParams: getFontsUrlWithParams,
        getFontFamilyByStyleId: getFontFamilyByStyleId,
        getFontClassName: getFontClassName,
        registerCustomTextDataGetter: registerCustomTextDataGetter,
        registerCustomFontFamiliesGetter: registerCustomFontFamiliesGetter,
        getPageUsedFontsList: getPageUsedFontsList,
        collectFontsFromTextDataArray: collectFontsFromTextDataArray
    };
});
