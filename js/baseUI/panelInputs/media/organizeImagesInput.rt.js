define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/media/imagePreview'
], function (React, _, imagePreview) {
    'use strict';
    return function () {
        return React.createElement(imagePreview, _.assign({}, {
            'buttons': this.getButton(),
            'getURL': this.getURL,
            'getStyle': this.getStyle,
            'emptySymbolName': 'camera'
        }, this.props));
    };
});