define([
    'react/addons',
    'lodash',
    'util',
    'baseUI/controls/infoIcon'
], function (React, _, util, infoIcon) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'control-section-divider labeled' }, util.translate(this.props.label), '\r\n    ', this.props.infoText ? React.createElement(infoIcon, {
            'key': 'icon',
            'size': 18,
            'text': this.props.infoText,
            'fitToBoundsWidth': false
        }) : null);
    };
});