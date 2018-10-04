define([
    'react/addons',
    'lodash',
    'symbols',
    'baseUI/controls/button'
], function (React, _, symbols, uiButton) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'media-button' }, React.createElement(uiButton, this.getButtonProps()), this.hasFile() ? React.createElement('div', {
            'key': 'hasfile',
            'className': 'filename-text'
        }, React.createElement('span', { 'className': 'wrapper' }, this.props.value, React.createElement(symbols.symbol, { 'name': 'inputValidationSuccess' }))) : null);
    };
});