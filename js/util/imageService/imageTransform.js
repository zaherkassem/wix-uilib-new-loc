define(['pLoader!santa:utils'], function (utils) {
    'use strict';
    function getData(fittingType, src, target, imageFilters) {
        var UA;
        if (typeof window === 'undefined') {
            UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36';
        } else {
            UA = window.navigator.userAgent;
        }
        var detectionData = utils.browserDetection(UA);
        target.width = parseInt(target.width, 10);
        target.height = parseInt(target.height, 10);
        return utils.imageTransform.getData(fittingType, src, target, imageFilters, detectionData.browser);
    }

    function getImageScale(imageData, containerWidth, containerHeight) {
        if (imageData.width > 0 && imageData.width <= containerWidth && imageData.height > 0 && imageData.height <= containerHeight) {
            return utils.imageTransform.fittingTypes.ORIGINAL_SIZE;
        }
        if (imageData.width <= imageData.height) {
            return utils.imageTransform.fittingTypes.SCALE_TO_FIT;
        } else if (imageData.height < containerHeight) {
            return utils.imageTransform.fittingTypes.SCALE_TO_FIT;
        }
        return utils.imageTransform.fittingTypes.SCALE_TO_FILL;
    }

    return {
        getData: getData,
        fittingTypes: utils.imageTransform.fittingTypes,
        alignTypes: utils.imageTransform.alignTypes,
        getImageScale: getImageScale
    };
});