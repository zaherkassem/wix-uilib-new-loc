define(['staticAssets', 'util/serviceTopology/serviceTopology'], function (staticAssets, serviceTopology) {
    'use strict';

    var assetsMap = staticAssets.staticAssetsMap;

    return {
        getMediaUrl: function (mediaPath) {
            var baseUrl = serviceTopology.editorMediaUrl || 'http://static.parastorage.com/services/santa-resources/resources/editor';
            var assetPath = assetsMap[mediaPath] || mediaPath;

            if (assetPath && assetPath[0] === '/') {
                assetPath = assetPath.substr(1);
            }
            return [baseUrl, assetPath].join('/');
        },

        getAssetUrl: function (assetPath) {
            var baseUrl = 'http://assets.parastorage.com';

            assetPath = assetPath[0] === '/' ? assetPath.substr(1) : assetPath;

            return [baseUrl, assetPath].join('/');
        }
    };
});
