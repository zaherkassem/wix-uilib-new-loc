define([
    'react/addons',
    'lodash',
    'symbols',
    'baseUI/popovers/tooltip',
    'baseUI/framework/uiConstants'
], function (React, _, symbols, tooltip, uiConstants) {
    'use strict';
    function onChange1(selectedValue, option, optionIndex) {
        this.handleChange(option.value);
    }
    function repeatOption2(selectedValue, option, optionIndex) {
        return React.createElement('div', {
            'key': 'option-' + option.value,
            'name': option.value
        }, React.createElement(tooltip, {
            'shouldTranslate': false,
            'disabled': this.props.closed,
            'value': option.text,
            'alignment': uiConstants.TOOLTIP.ALIGNMENT.RIGHT,
            'styleType': uiConstants.TOOLTIP.STYLE_TYPE.SMALL,
            'interactive': false
        }, React.createElement('label', {}, React.createElement('input', {
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'value': option.value,
            'checked': option.value === selectedValue,
            'onChange': onChange1.bind(this, selectedValue, option, optionIndex)
        }), React.createElement('span', { 'onClick': this.reportTabClicked }, React.createElement(symbols.symbol, { 'name': option.symbolName }), this.props.closed ? React.createElement('span', {
            'className': 'tab-text',
            'key': 'verticalTabText'
        }, option.text) : null), this.props.closed ? React.createElement('hr', {
            'className': 'divider-long',
            'key': 'divider'
        }) : null)));
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return React.createElement.apply(this, [
            'div',
            {
                'className': _.keys(_.pickBy({
                    'control-vertical-tabs': true,
                    closed: this.props.closed
                }, _.identity)).join(' ')
            },
            _.map(this.props.options, repeatOption2.bind(this, selectedValue))
        ]);
    }
    return function () {
        return scopeSelectedValue3.apply(this, []);
    };
});