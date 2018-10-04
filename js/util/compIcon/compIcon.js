/**
 * Created by talm on 16/03/2015.
 */
define(['lodash', 'util/compIcon/svgForComp', 'util/imageService/imageTransform'], function (_, svgForComp, imageTransform) {
    'use strict';
    var compsWithRealImages = ['wysiwyg.viewer.components.ClipArt', 'wysiwyg.viewer.components.MatrixGallery', 'wysiwyg.viewer.components.SliderGallery', 'wysiwyg.viewer.components.SlideShowGallery', 'wysiwyg.viewer.components.PaginatedGridGallery', 'wysiwyg.viewer.components.WPhoto'];

    var MEDIA_URL_PREFIX = 'http://static.wixstatic.com/media/';
    var DEFAULT_CONTAINER_SIZE = 50;

    function getImageSrc(compRef, containerSizes, editorAPI) {
        var compData = editorAPI.components.data.get(compRef);
        containerSizes = containerSizes || {width: DEFAULT_CONTAINER_SIZE, height: DEFAULT_CONTAINER_SIZE};
        if (compData.type !== 'ImageList' && compData.type !== 'Image') {
            return null;
        }
        var imageData;
        if (compData.type === 'ImageList') {
            imageData = compData.items[0];
        } else {
            imageData = compData;
        }
        var imageTransfromData = imageTransform.getData(
            imageTransform.fittingTypes.SCALE_TO_FILL,
            {width: imageData.width, height: imageData.height, id: imageData.uri},
            {
                width: containerSizes.width || DEFAULT_CONTAINER_SIZE,
                height: containerSizes.height || DEFAULT_CONTAINER_SIZE,
                alignment: imageTransform.alignTypes.CENTER,
                htmlTag: 'bg'
            });
        return {url: MEDIA_URL_PREFIX + imageTransfromData.uri, css: imageTransfromData.css.container};
    }

    function getCompIconInfo(compRef, compType, containerSizes, editorAPI) {
        var src, svgName, css;
        if (_.includes(compsWithRealImages, compType)) {
            var imageData = getImageSrc(compRef, containerSizes, editorAPI);
            src = imageData.url;
            css = imageData.css;
        } else {
            svgName = svgForComp.getSvgNameForComp(compType);
        }
        return {src: src, svgName: svgName, css: css};
    }

    return {
        getCompIconInfo: getCompIconInfo
    };
});
