define([
    'react/addons',
    'lodash',
    'symbols'
], function (React, _, symbols) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'symbol-more' }, React.createElement(symbols.symbol, { 'name': this.props.icon || 'more' }));
    };
});