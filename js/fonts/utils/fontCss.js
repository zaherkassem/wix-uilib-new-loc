define(['lodash', 'fonts/utils/fontUtils'], function (_, fontUtils) {
    'use strict';

    function getFullFontFamily(fontFamily){
        var fullFontFamily = fontFamily + ',' + fontUtils.getFontFallback(fontFamily);
        //surround fonts with quotes if font name contains spaces or non-latin chars
        fullFontFamily = fullFontFamily.replace(/[^,]*[^\w,\d\-][^,]*/g, function (fontFamilyStr) {
            return "'" + fontFamilyStr.replace(/\+/g, " ") + "'";
        });
        return fullFontFamily;
    }

    function getColorCSSFromFontString(fullFontString, themeData){
        var colorParts = fullFontString.match(/{color_(\d+)}/);
        if (!colorParts){
            var colorFromFontString = fullFontString.match(/#[A-Z0-9]{3,6}/);
            if (colorFromFontString){
                return 'color:' + colorFromFontString[0] + ';';
            }
            return '';
        }
        var colorIndexInTheme = colorParts[1];
        var colorFromTheme = themeData.color[colorIndexInTheme];
        if (colorFromTheme.indexOf('#') === 0){
            return 'color:' + colorFromTheme + ';';
        }
        return 'color:rgba(' + colorFromTheme + ');';
    }

    function getFontCSSFromFontString(fontVal){
        var font = fontVal;
        if (_.includes(font, '#')){
            font = font.slice(0, font.indexOf("#"));
        }
        font = font.replace(/\{color_\d+\}/, '');
        var fontFamily = fontUtils.getFontFamily(font);
        var fullFontFamily = getFullFontFamily(fontFamily);
        var childFont = font.replace(fontFamily, fullFontFamily);
        return childFont + ';';
    }

    /**
     *
     * @param fontString
     * @param themeData
     * @returns {*}
     */
    function getFontVal(fontString, themeData){
        var fontParts = fontString.split('font_');
        if (fontParts.length === 2) {
            return themeData.font[fontParts[1]];
        }
        return fontString;
    }

    /**
     *
     * @param font
     * @param themeData
     * @returns {*}
     */
    function fontToCSSWithColor(font, themeData) {
        var fontVal = getFontVal(font);
        var fontCss = getFontCSSFromFontString(fontVal);
        var colorCss = getColorCSSFromFontString(fontVal, themeData);

        return fontCss + colorCss;
    }

    /**
     *
     * @param fontString
     * @param themeData
     * @returns {*}
     */
    function fontToCSSWithoutColor(fontString, themeData) {
        var fontVal = getFontVal(fontString, themeData);
        return getFontCSSFromFontString(fontVal);
    }

    return {
        fontToCSSWithColor: fontToCSSWithColor,
        fontToCSSWithoutColor: fontToCSSWithoutColor
    };
});