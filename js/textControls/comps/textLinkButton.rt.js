define([
    'react/addons',
    'lodash',
    'textControls/comps/iconButton'
], function (React, _, iconButton) {
    'use strict';
    return function () {
        return React.createElement(iconButton, _.assign({}, {
            'name': 'Link',
            'onClick': this.openLinkDialog
        }, this.props));
    };
});