define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/media/imagePreview'
], function (React, _, imagePreview) {
    'use strict';
    return function () {
        return React.createElement(imagePreview, _.assign({}, {
            'value': this.props.value,
            'onChange': this.props.onChange,
            'valueLink': this.props.valueLink,
            'buttons': this.getButtons(),
            'getURL': this.getURL,
            'getStyle': this.getStyle,
            'emptySymbolName': 'camera'
        }, this.filteredProps()));
    };
});