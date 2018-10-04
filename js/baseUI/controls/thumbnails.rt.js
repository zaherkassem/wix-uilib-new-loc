define([
    'react/addons',
    'lodash',
    'util',
    'symbols',
    'baseUI/controls/infoIcon',
    'baseUI/controls/radio'
], function (React, _, util, symbols, infoIcon, UIRadio) {
    'use strict';
    function onChange1(selectedValue, option, optionIndex) {
        this.handleChange(option.value, option.type);
    }
    function repeatOption2(selectedValue, option, optionIndex) {
        return React.createElement(UIRadio, {
            'key': option.value,
            'radioType': this.props.radioType,
            'name': option.symbolName || option.className,
            'label': option.label,
            'ellipsis': true,
            'group': this.getRadioGroupId(),
            'value': option.value === selectedValue,
            'onChange': onChange1.bind(this, selectedValue, option, optionIndex)
        });
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return _.map(this.props.options, repeatOption2.bind(this, selectedValue));
    }
    return function () {
        return React.createElement.apply(this, [
            'div',
            {
                'className': this.getClassName('control-thumbnails') + ' ' + (this.props.title ? 'with-title' : ''),
                'data-max-thumbs-per-row': this.props.maxThumbsPerRow
            },
            this.props.infoText ? React.createElement(infoIcon, {
                'key': 'infoIcon',
                'title': this.props.infoTitle,
                'text': this.props.infoText
            }) : null,
            this.props.title ? React.createElement('div', { 'key': 'title' }, util.translate(this.props.title)) : null,
            scopeSelectedValue3.apply(this, [])
        ]);
    };
});