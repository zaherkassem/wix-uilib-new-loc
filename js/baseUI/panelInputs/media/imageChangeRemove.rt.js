define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/media/imageChange'
], function (React, _, imageChange) {
    'use strict';
    return function () {
        return React.createElement(imageChange, _.assign({}, {
            'value': this.props.value,
            'onChange': this.props.onChange,
            'valueLink': this.props.valueLink,
            'additionalButtons': this.getRemoveButton(),
            'emptySymbolName': 'camera'
        }, this.filteredProps()));
    };
});