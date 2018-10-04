define([
    'react/addons',
    'lodash',
    'symbols'
], function (React, _, symbols) {
    'use strict';
    function mergeProps(inline, external) {
        var res = _.assign({}, inline, external);
        if (inline.hasOwnProperty('style')) {
            res.style = _.defaults(res.style, inline.style);
        }
        if (inline.hasOwnProperty('className') && external.hasOwnProperty('className')) {
            res.className = external.className + ' ' + inline.className;
        }
        return res;
    }
    return function () {
        return React.createElement('button', mergeProps({
            'className': this.getClassName('control-button'),
            'disabled': this.props.disabled ? 'disabled' : ''
        }, this.filteredProps()), this.props.icon ? React.createElement(symbols.symbol, {
            'key': 'symbol-' + this.props.icon,
            'className': this.props.label ? 'symbol-with-label' : '',
            'name': this.props.icon
        }) : null, React.createElement('span', {}, this.translateIfNeeded(this.props.label)));
    };
});