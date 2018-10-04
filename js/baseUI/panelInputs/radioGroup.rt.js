define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function onClick1(selectedValue, option, optionIndex) {
        this.handleOnRadioSelect(option.value);
    }
    function onMouseOver2(selectedValue, option, optionIndex) {
        this.handleOnMouseOver(option.value);
    }
    function onChange3(selectedValue, option, optionIndex) {
        this.handleChange(option.value);
    }
    function repeatOption4(selectedValue, option, optionIndex) {
        return React.createElement('label', {}, React.createElement('input', {
            'ref': 'radio_' + optionIndex,
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'onClick': onClick1.bind(this, selectedValue, option, optionIndex),
            'onMouseOver': onMouseOver2.bind(this, selectedValue, option, optionIndex),
            'onChange': onChange3.bind(this, selectedValue, option, optionIndex),
            'checked': selectedValue === option.value
        }), React.createElement('span', {
            'ref': 'option_' + optionIndex,
            'className': 'option'
        }, this.translateIfNeeded(option.label)));
    }
    function scopeSelectedValue5() {
        var selectedValue = this.getValueFromProps(this.props);
        return _.map(this.props.options, repeatOption4.bind(this, selectedValue));
    }
    return function () {
        return React.createElement.apply(this, [
            'span',
            {},
            React.createElement('span', {
                'ref': 'label',
                'className': 'label'
            }, this.translateIfNeeded(this.getLabel())),
            scopeSelectedValue5.apply(this, [])
        ]);
    };
});