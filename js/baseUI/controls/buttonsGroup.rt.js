define([
    'react/addons',
    'lodash',
    'baseUI/controls/infoIcon',
    'util'
], function (React, _, infoIcon, util) {
    'use strict';
    function onChange1(selectedValue, option, optionIndex) {
        this.handleChange(option.value);
    }
    function repeatOption2(selectedValue, option, optionIndex) {
        return React.createElement('label', {
            'key': option.value,
            'className': option.className
        }, React.createElement('input', {
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'value': option.value,
            'checked': option.value === selectedValue,
            'onChange': onChange1.bind(this, selectedValue, option, optionIndex)
        }), React.createElement('span', {}, this.translateIfNeeded(option.label)));
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return _.map(this.props.options, repeatOption2.bind(this, selectedValue));
    }
    return function () {
        return React.createElement('div', { 'className': 'control-buttons-group' }, this.props.title ? React.createElement('p', { 'key': 'title' }, util.translate(this.props.title)) : null, this.props.title && (this.props.infoText || this.props.infoTitle) ? React.createElement(infoIcon, {
            'key': 'infoIcon',
            'text': this.props.infoText,
            'title': this.props.infoTitle,
            'size': 18
        }) : null, React.createElement.apply(this, [
            'div',
            { 'className': 'group-buttons-container' + (this.props.align ? '-' + this.props.align : '') },
            scopeSelectedValue3.apply(this, [])
        ]));
    };
});