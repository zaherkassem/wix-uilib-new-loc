define(['react', 'lodash', 'core', 'baseUI/popovers/templates/imageAndTextTooltip/imageAndTextTooltip.rt'], function (React, _, core, template) {
    'use strict';

    return React.createClass({
        displayName: 'imageAndTextTooltip',
        mixins: [core.mixins.editorAPIMixin],
        propTypes: {
            title: React.PropTypes.string,
            text: React.PropTypes.string,
            image: React.PropTypes.string,
            imageContainerStyle: React.PropTypes.object,
            calculatedAlignment: React.PropTypes.string
        },
        render: template,
        onLinkClick: function () {
            if (this.props.linkAction) {
                this.props.linkAction();
            }
        },
        getImageContainerStyle: function(){
            return this.props.imageContainerStyle || {};
        }
    });
});
