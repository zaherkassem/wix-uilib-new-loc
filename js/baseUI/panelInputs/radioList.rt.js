define([
    'react/addons',
    'lodash',
    'symbols',
    'baseUI/controls/infoIcon'
], function (React, _, symbols, infoIcon) {
    'use strict';
    function onChange1(selectedValue, option, optionIndex) {
        this.handleChange(option.value);
    }
    function repeatOption2(selectedValue, option, optionIndex) {
        return React.createElement('label', {
            'className': option.className,
            'key': option.value
        }, React.createElement('input', {
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'value': option.value,
            'checked': option.value === selectedValue,
            'onChange': onChange1.bind(this, selectedValue, option, optionIndex)
        }), React.createElement('span', {}), option.symbolName ? React.createElement('div', {
            'key': 'symbol',
            'className': option.symbolClass
        }, React.createElement('div', {}, React.createElement(symbols.symbol, { 'name': option.symbolName }))) : null, React.createElement('span', {}, this.translateIfNeeded(option.label)));
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return _.map(this.props.options, repeatOption2.bind(this, selectedValue));
    }
    return function () {
        return React.createElement.apply(this, [
            'div',
            { 'className': 'control-radio-list' },
            this.props.label ? React.createElement('div', {
                'className': 'title',
                'key': 'label'
            }, this.translateIfNeeded(this.props.label)) : null,
            this.hasLabel() && (this.props.infoText || this.props.infoText) ? React.createElement(infoIcon, {
                'key': 'tooltip',
                'title': this.props.infoTitle,
                'text': this.props.infoText,
                'size': 18
            }) : null,
            scopeSelectedValue3.apply(this, [])
        ]);
    };
});