define(['lodash', 'jquery', 'util'], function (_, $, util) {
    'use strict';

    function _getCssRgbRegEx () {

        return new RegExp(/(rgba?\([^\)]*\))/g);
    }
    function _getCssHexRgbRegEx() {
        return new RegExp(/(#[0-9a-f]{3,6})/g);
    }

    /**
     * convert the css string to lower case, remove spaces and convert the hex color values (IE) to rgb functions
     */
    function _normalizeString(cssString) {
        var noHexValues = _hexToRGB(cssString);
        return noHexValues.replace(/\s+/g, '').toLowerCase();
    }

    function _hexToRGB(cssString) {
        var cssToRGBRegex = _getCssHexRgbRegEx();

        var hexValues = cssString.match(cssToRGBRegex);
        var result = cssString;

        if (hexValues !== null) {
            for (var i = 0; i < hexValues.length; i++) {
                var rgbObject = util.colors.hexToRgb(hexValues[i]);
                var hexToRgbString = util.colors.rgbObjectToString(rgbObject);
                result = result.replace(hexValues[i], hexToRgbString);
            }
        }

        return result;
    }

    function _compareRgbParts(cssShadow1, cssShadow2) {
        /*
         * mtach the rgba parts of both css's and check that they appear in the same order of parts in the string
         */
        var cssToRGBRegex = _getCssRgbRegEx();
        var rgba1 = cssShadow1.match(cssToRGBRegex);
        var rgba2 = cssShadow2.match(cssToRGBRegex);

        return _.isEqual(rgba1, rgba2) || _compareWithAlphaDiff(rgba1, rgba2);
    }

    function _compareRgbaValues(rgba1Values, rgba2Values) {
        //compare rgb
        for (var i = 0; i < 3; i++) {
            if (rgba1Values[i] !== rgba2Values[i]) {
                return false;
            }
        }

        return (Math.floor(rgba1Values[3] * 1000) === Math.floor(rgba2Values[3] * 1000));
    }

    function _compareWithAlphaDiff(rgba1, rgba2) {
        if (rgba1.length !== rgba2.length) {
            return false;
        }

        for (var j = 0; j < rgba1.length; j++) {
            if (rgba1[j].indexOf('rgba') === 0 && rgba2[j].indexOf('rgba') === 0) {
                var rgba1Values = _parseRgba(rgba1[j]),
                    rgba2Values = _parseRgba(rgba2[j]);

                if (!_compareRgbaValues(rgba1Values, rgba2Values)) {
                    return false;
                }
            } else if (rgba1[j] !== rgba2[j]) {
                return false;
            }
        }

        return true;
    }

    function _parseRgba(rgba) {
        return rgba.replace('rgba(', '').replace(')', '').split(',');
    }

    function _compareNonRgbParts(cssShadow1, cssShadow2) {
        /*
         * remove the rgb\a parts form the css and test if the remaining is the same
         */
        var noRgb1 = cssShadow1.replace(_getCssRgbRegEx(), ''),
            noRgb2 = cssShadow2.replace(_getCssRgbRegEx(), '');

        return noRgb1 === noRgb2;
    }

    function _compShadowCssCrossBrowsers(cssShadow1noSpaces, cssShadow2noSpaces) {
        return _compareRgbParts(cssShadow1noSpaces, cssShadow2noSpaces) &&
            _compareNonRgbParts(cssShadow1noSpaces, cssShadow2noSpaces);
    }

    /**
     * The css text-shadow string value is different between browsers, you can check the spec - RTShadowDDSpec.js.
     *   Example:
     *       IE (value):     1px 1px 0px #c8c8c8, 0px 2px 0px #b4b4b4, 0px 3px 0px #a0a0a0, 0px 4px 0px rgba(140,140,140,0.498039), 0px 0px 0px #787878, 0px 5px 10px rgba(0,0,0,0.498039)
     *       Chrome (value): rgb(200, 200, 200) 1px 1px 0px, rgb(180, 180, 180) 0px 2px 0px, rgb(160, 160, 160) 0px 3px 0px, rgba(140, 140, 140, 0.498039) 0px 4px 0px, rgb(120, 120, 120) 0px 0px 0px, rgba(0, 0, 0, 0.498039) 0px 5px 10px
     *
     * This function will 'flip flop' the strings and will try to compare them together
     */
    function cssTextShadowCompare(cssShadow1, cssShadow2) {
        var cssShadow1noSpaces = _normalizeString(cssShadow1),
            cssShadow2noSpaces = _normalizeString(cssShadow2);

        return cssShadow1noSpaces === cssShadow2noSpaces || _compShadowCssCrossBrowsers(cssShadow1noSpaces, cssShadow2noSpaces);
    }


    return {
        cssTextShadowCompare: cssTextShadowCompare
    };

});
