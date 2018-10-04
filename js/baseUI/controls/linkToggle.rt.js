define([
    'react/addons',
    'lodash',
    'symbols'
], function (React, _, symbols) {
    'use strict';
    return function () {
        return React.createElement('label', { 'className': 'control-link' }, React.createElement('input', {
            'type': 'checkbox',
            'defaultChecked': this.props.value
        }), React.createElement('div', { 'onClick': this.props.onClick }, React.createElement(symbols.symbol, { 'name': 'linkBtn' })));
    };
});