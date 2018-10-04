define([
    'react/addons',
    'lodash',
    'util',
    'symbols'
], function (React, _, util, symbols) {
    'use strict';
    function onChange1(selectedValue, option, optionIndex) {
        this.handleChange(option.value, option.type);
    }
    function repeatOption2(selectedValue, option, optionIndex) {
        return React.createElement('label', { 'className': 'item' }, React.createElement('input', {
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'value': option.value,
            'checked': option.value === selectedValue,
            'onChange': onChange1.bind(this, selectedValue, option, optionIndex)
        }), React.createElement('span', {}, option.symbolName ? React.createElement(symbols.symbol, {
            'key': 'symbol',
            'name': option.symbolName
        }) : null));
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return _.map(this.props.options, repeatOption2.bind(this, selectedValue));
    }
    return function () {
        return React.createElement('div', { 'className': this.getClassName('control-alignment') }, React.createElement('div', { 'className': 'label' }, util.translate(this.props.label)), React.createElement.apply(this, [
            'div',
            { 'className': 'items' },
            scopeSelectedValue3.apply(this, [])
        ]));
    };
});