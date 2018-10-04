define([], function() {
    'use strict';

    function getSvgV1SkinName(url) {
        var split = url.replace('_', '.').replace('/', '.').split('.');
        return [split[2], split[3], 'svg_' + split[1], split[4]].join('.');
    }

    function getSvgV2SkinName(url) {
        //Example fileName: shapes/083ab0e246b24019a44c3d1e7096147f.svg
        //Example skinName: svgshape.v2.Svg_083ab0e246b24019a44c3d1e7096147f
        var regEx = /^shapes\/([a-z0-9]{32})\.svg$/i;
        var partsArr = regEx.exec(url);
        var md5Hash = partsArr[1];
        return 'svgshape.v2.Svg_' + md5Hash;
    }

    return {
        parseSvgSkinFromUrl: function parseSvgSkinFromUrl(url) {
            return url.indexOf('.v1.') !== -1 ? getSvgV1SkinName(url) : getSvgV2SkinName(url);
        }
    };
});