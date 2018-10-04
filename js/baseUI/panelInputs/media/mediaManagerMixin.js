define(['react', 'lodash', 'util'], function (React, _, util) {
    'use strict';

    return {
        mixins: [util.valueLinkMixin],
        propTypes: {
            mediaManager: React.PropTypes.shape({
                open: React.PropTypes.func.isRequired,
                categories: React.PropTypes.object.isRequired
            }).isRequired,
            mediaManagerCategory: React.PropTypes.string,
            mediaManagerPath: React.PropTypes.string,
            mediaManagerHeaderLabel: React.PropTypes.string,
            mediaManagerButtonLabel: React.PropTypes.string
        },
        componentWillMount: function () {
            this.dataKeys = _.keys(this.getValueFromProps());
        },
        _changeImage: function (doneCB, payload) {
            if (!payload) {
                return;
            }

            var newImageData = _.pick(payload[0], this.dataKeys);
            newImageData.uri = payload[0].fileName;
            newImageData.originalImageDataRef = null;
            newImageData.type = 'Image';

            doneCB(newImageData);
        },
        openMediaGallery: function (doneCB) {
            var mediaManager = this.props.mediaManager;
            var category = this.props.mediaManagerCategory || mediaManager.categories.IMAGE;
            var mediaManagerKeys;

            if (this.props.mediaManagerHeaderLabel || this.props.mediaManagerButtonLabel) {
                mediaManagerKeys = {};
                mediaManagerKeys.title = util.translate(this.props.mediaManagerHeaderLabel);
                mediaManagerKeys.submitButton = util.translate(this.props.mediaManagerButtonLabel);
            }
            mediaManager.open(category, {
                multiSelect: false,
                callback: this._changeImage.bind(this, doneCB),
                path: this.props.mediaManagerPath,
                translation: mediaManagerKeys
            });
        }
    };
});