define(['lodash'], function(_){
    'use strict';

    function realMod(value, mod){
        var result = value > 0 ? value % mod : ((mod + value) % mod);
        return result;
    }

    function colorComponentToHex(c) {
        var hex = c.toString(16);
        var result = hex.length === 1 ? '0' + hex : hex;
        return result.toUpperCase();
    }

    /**
     * convert HSB color to RGB format
     * @param hue - 0-359
     * @param s - 0-100
     * @param br - 0-100
     * @returns {*}
     */
    function hsbToRgb(hsb){
        var hue = hsb.hue, saturation = hsb.saturation, brightness = hsb.brightness;
        if (hue < 0 || hue > 359){
            console.error('hue is out of range');
            return null;
        }
        var s = saturation / 100;
        var br = brightness / 100;
        var r, g, b;
        var c = s * br;
        var x = c * (1 - Math.abs((hue / 60) % 2 - 1));
        var m = br - c;
        switch (Math.floor(hue / 60)){
            case 0:
                r = c;
                g = x;
                b = 0;
                break;
            case 1:
                r = x;
                g = c;
                b = 0;
                break;
            case 2:
                r = 0;
                g = c;
                b = x;
                break;
            case 3:
                r = 0;
                g = x;
                b = c;
                break;
            case 4:
                r = x;
                g = 0;
                b = c;
                break;
            case 5:
                r = c;
                g = 0;
                b = x;
                break;
        }

        return {
            red: Math.round(255 * (r + m)),
            green: Math.round(255 * (g + m)),
            blue: Math.round(255 * (b + m))
        };
    }

    var hsbToHex = _.compose(rgbToHex, hsbToRgb);

    /**
     *convert RGB color to HSB format
     * @param red - 0-255
     * @param green - 0-255
     * @param blue - 0-255
     * @returns {{hue: number, saturation: number, brightness: number}}
     */
    function rgbToHsbExact(rgb) {
        var hue, saturation, brightness;
        var red = rgb.red, green = rgb.green, blue = rgb.blue;
        var r = red / 255;
        var g = green / 255;
        var b = blue / 255;
        var cMax = Math.max(r, g, b);
        var cMin = Math.min(r, g, b);
        var delta = cMax - cMin;
        if (delta === 0) {
            hue = 0;
        } else {
            switch (cMax){
                case r:
                    hue = 60 * realMod((g - b) / delta, 6);
                    break;
                case g:
                    hue = 60 * ((b - r) / delta + 2);
                    break;
                case b:
                    hue = 60 * ((r - g) / delta + 4);
                    break;
            }
        }

        saturation = cMax === 0 ? 0 : delta / cMax;
        brightness = cMax;

        return {
            hue: hue,
            saturation: 100 * saturation,
            brightness: 100 * brightness
        };
    }

    /**
     *convert RGB color to HSB format
     * @param red - 0-255
     * @param green - 0-255
     * @param blue - 0-255
     * @returns {{hue: number, saturation: number, brightness: number}}
     */
    function rgbToHsb(rgb){
        var hsbExact = rgbToHsbExact(rgb);
        return {
            hue: Math.round(hsbExact.hue),
            saturation: Math.round(hsbExact.saturation),
            brightness: Math.round(hsbExact.brightness)
        };
    }

    function hsbToHsl(hsb){
        var hue = hsb.hue, saturation = hsb.saturation, brightness = hsb.brightness;
        var S = saturation / 100;
        var B = brightness / 100;
        var L;
        var result = {
            hue: hue,
            saturation: 0,
            lightness: 0
        };

        L = 0.5 * B * (2 - S);
        result.lightness = Math.round(100 * L);
        result.saturation = Math.round(100 * (B * S) / (1 - Math.abs(2 * L - 1)));

        return result;
    }

    function hslToHsb(hsl){
        var hue = hsl.hue, saturation = hsl.saturation, lightness = hsl.lightness;
        var S = saturation / 100;
        var L = lightness / 100;
        var B;
        var result = {
            hue: hue,
            saturation: 0,
            brightness: 0
        };

        B = 0.5 * (2 * L + S * (1 - Math.abs(2 * L - 1)));

        result.saturation = Math.round(100 * 2 * (B - L) / B);
        result.brightness = Math.round(100 * B);

        return result;
    }

    function rgbToHex(rgb) {
        return '#' + colorComponentToHex(rgb.red) + colorComponentToHex(rgb.green) + colorComponentToHex(rgb.blue);
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        } : null;
    }

    var hexToHsb = _.compose(rgbToHsb, hexToRgb);

    var hexToHsbExact = _.compose(rgbToHsbExact, hexToRgb);

    function rgbStringToObject (rgbStr) {
        var extractColorValsRegex = /rgb\((.+)\)/;
        var colorVals = _.map(extractColorValsRegex.exec(rgbStr)[1].split(','), function(val) {
            return parseInt(val, 10);
        });
        return _.zipObject(['red', 'green', 'blue'], colorVals);
    }

    function rgbObjectToString (rgbaObj) {
        return 'rgb(' + _.values(rgbaObj).join(',') + ')';
    }

    function rgbaStringToObject (rgbaStr) {
        var extractColorValsRegex = /rgba\((.+)\)/;
        var colorVals = _.map(extractColorValsRegex.exec(rgbaStr)[1].split(','), function(val) {
            return parseFloat(val, 10);
        });
        return _.zipObject(['red', 'green', 'blue', 'alpha'], colorVals);
    }

    function rgbaObjectToString (rgbaObj) {
        return 'rgba(' + _.values(rgbaObj).join(',') + ')';
    }

    /**
     *
     * @param color
     * @return {number}
     */
    function getDistanceToWhite(color) {
        if (_.isString(color)) {
            color = hexToHsb(color);
        } else if (color.red) {
            color = rgbToHsb(color);
        } else if (color.lightness) {
            color = hslToHsb(color);
        }

        return Math.sqrt(Math.pow(100 - color.brightness, 2) + Math.pow(color.saturation, 2));
    }

    /**
     * retrieve a 5-color group, with a root color as its median, and 4 other collated colors around it in the (brightness, saturation) plane
     * @param rootColor the middle color in the group
     * @param {object} [paletteColors] the palette colors to maintain brightness order
     * @param {Array} [sequenceColorNames] the colorNames to access the palette colors so as to maintain brightness order
     * @return {[]|object}
     */
    function createGradientColorsFromRoot(rootColor, paletteColors, sequenceColorNames){
        var NUM_OF_COLORS = 5;
        var rootBrightness, distanceToWhite, brightnessBucket,
            newSaturation, newBrightness;
        var gradientColors = [];

        if (_.isString(rootColor)) {
            rootColor = hexToHsbExact(rootColor);
        }
        rootBrightness = rootColor.brightness;
        distanceToWhite = getDistanceToWhite(rootColor);
        brightnessBucket = Math.floor(5 * rootBrightness / (rootBrightness + distanceToWhite));

        for (var i = 0; i < NUM_OF_COLORS; i++){
            newSaturation = rootColor.saturation;

            if (i < brightnessBucket) {
                newBrightness = (i + 1) / (brightnessBucket + 1) * rootBrightness;
            } else if (i === brightnessBucket){
                newBrightness = rootBrightness;
            } else {
                newBrightness = (i - brightnessBucket) / (5 - brightnessBucket) * (100 - rootBrightness) + rootBrightness;
                newSaturation = rootColor.saturation / (i - brightnessBucket + 1);
            }

            gradientColors.unshift(hsbToHex({
                hue: rootColor.hue,
                saturation: newSaturation,
                brightness: newBrightness}));
        }

        if (!_.isEmpty(paletteColors) && !!sequenceColorNames) {
            var firstColor = hexToHsbExact(paletteColors[sequenceColorNames[0]]);
            var lastColor = hexToHsbExact(paletteColors[sequenceColorNames[4]]);

            if (getDistanceToWhite(firstColor) > getDistanceToWhite(lastColor)) {
                gradientColors.reverse();
            }
            gradientColors = _.zipObject(sequenceColorNames, gradientColors);
        }

        return gradientColors;
    }
    function getColorInHex(color) {
        if (_.includes(color, 'rgba')) {
            return rgbToHex(rgbaStringToObject(color));
        } else if (_.includes(color, 'rgb')) {
            return rgbToHex(rgbStringToObject(color));
        }
        return color;
    }

    return {
        rgbToHsb: rgbToHsb,
        rgbToHsbExact: rgbToHsbExact,
        rgbToHex: rgbToHex,
        hsbToRgb: hsbToRgb,
        hsbToHex: hsbToHex,
        hexToRgb: hexToRgb,
        hexToHsb: hexToHsb,
        hexToHsbExact: hexToHsbExact,
        hslToHsb: hslToHsb,
        hsbToHsl: hsbToHsl,
        rgbStringToObject: rgbStringToObject,
        rgbObjectToString: rgbObjectToString,
        rgbaStringToObject: rgbaStringToObject,
        rgbaObjectToString: rgbaObjectToString,
        getDistanceToWhite: getDistanceToWhite,
        createGradientColorsFromRoot: createGradientColorsFromRoot,
        getColorInHex: getColorInHex
    };
});
