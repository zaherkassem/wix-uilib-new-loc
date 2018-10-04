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
        return React.createElement('div', this.getWrapperProps({ class: 'control-button2-wrapper' }), React.createElement('div', mergeProps({
            'className': this.getClassName('control-button2'),
            'disabled': this.props.disabled ? 'disabled' : ''
        }, this.filteredProps()), React.createElement('input', {
            'type': 'button',
            'disabled': this.props.disabled ? 'disabled' : ''
        }), this.props.symbolName ? React.createElement(symbols.symbol, {
            'name': this.props.symbolName,
            'className': 'symbol',
            'key': 'symbol'
        }) : null, this.props.label ? React.createElement('span', {
            'className': 'label ' + this.props.customLabelClass,
            'key': 'label'
        }, this.translateIfNeeded(this.props.label)) : null));
    };
});