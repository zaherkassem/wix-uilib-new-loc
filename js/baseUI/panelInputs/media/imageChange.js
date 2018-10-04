define(['react', 'lodash', 'util', 'baseUI/panelInputs/media/mediaManagerMixin', 'baseUI/panelInputs/media/wixStaticMediaMixin', 'baseUI/panelInputs/media/imageChange.rt'], function (React, _, util, mediaManagerMixin, wixStaticMediaMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'imageChange',
        mixins: [util.propTypesFilterMixin, mediaManagerMixin, wixStaticMediaMixin],
        propTypes: {
            addButtonLabel: React.PropTypes.string,
            changeButtonLabel: React.PropTypes.string,
            additionalButtons: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array])
        },
        getDefaultProps: function () {
            return {
                additionalButtons: []
            };
        },
        getButtons: function () {
            var loadImageFromMediaGalleryButton = {
                nonEmptyButtonLabel: this.props.changeButtonLabel,
                nonEmptyButtonIcon: 'image-change',
                emptyButtonLabel: this.props.addButtonLabel,
                emptyButtonIcon: 'plus',
                onClick: this.openMediaGallery
            };
            return [].concat(loadImageFromMediaGalleryButton, this.props.additionalButtons);
        },
        render: template
    });
});
