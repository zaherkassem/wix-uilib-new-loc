define([
    'react/addons',
    'lodash',
    'util'
], function (React, _, util) {
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
        }), React.createElement('span', { 'className': 'tab-decorator' }, React.createElement('span', {}, util.translate(option.label))));
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return _.map(this.props.options, repeatOption2.bind(this, selectedValue));
    }
    return function () {
        return React.createElement.apply(this, [
            'div',
            { 'className': this.getClassName('control-tabs-horizontal') },
            scopeSelectedValue3.apply(this, [])
        ]);
    };
});