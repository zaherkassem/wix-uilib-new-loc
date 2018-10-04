define([
    'react/addons',
    'lodash',
    'symbols'
], function (React, _, symbols) {
    'use strict';
    return function () {
        return React.createElement('i', {
            'className': 'arrow-button ' + this.getClassName(),
            'onClick': this.props.onClickAction
        }, React.createElement(symbols.symbol, { 'name': 'arrowDown' }));
    };
});