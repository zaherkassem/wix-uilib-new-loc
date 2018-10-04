define(['react', 'lodash', 'baseUI/controls/thumbnailPreviewPlay.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'thumbnailPreviewPlay',
        render: template,
        getIconClass: function () {
            var classes = {icon: true};
            classes[this.props.iconClass] = true;
            return classes;
        }
    });
});
