define(['util'], function (util) {
    'use strict';

    /*
    Given a component which uses imagePreview with images from wixstatic, this
    mixin helps with getting the right URL and style of the image for the
    imagePreview to display, e.g.: If the imagePreview has a small dimension,
    this mixin asks wixstatic for a smaller version of the image (it's good
    for bandwidth and overall performance).
     */

    var MEDIA_PREFIX = 'http://static.wixstatic.com/media/';

    return {
        componentDidMount: function () {
            var nodeSizes = ReactDOM.findDOMNode(this).getBoundingClientRect();
            this.containerWidth = nodeSizes.width;
            this.containerHeight = nodeSizes.height;
        },
        _getImageWidth: function () {
            return this.containerWidth || 0;
        },
        _getImageHeight: function () {
            return this.containerHeight || 0;
        },
        _getImageData: function (imageData) {
            var imageTransformData = util.imageTransform.getData(
              util.imageTransform.getImageScale(imageData, this._getImageWidth(), this._getImageHeight()),
              {
                  width: imageData.width || 0,
                  height: imageData.height || 0,
                  id: imageData.uri
              },
              {
                  width: this._getImageWidth(),
                  height: this._getImageHeight(),
                  alignment: util.imageTransform.alignTypes.CENTER,
                  htmlTag: 'img'
              });
            return {
                url: imageTransformData.uri ? MEDIA_PREFIX + imageTransformData.uri : null,
                css: imageTransformData.css.img
            };
        },
        getURL: function (imageData) {
            return this._getImageData(imageData).url;
        },
        getStyle: function (imageData) {
            return this._getImageData(imageData).css;
        },
        getEmptyImageData: function(){
            return {uri: '', width: 0, height: 0, title: '', originalImageDataRef: ''};
        }
    };
});
