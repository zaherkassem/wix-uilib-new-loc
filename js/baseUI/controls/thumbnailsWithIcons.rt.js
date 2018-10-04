define([
    'react/addons',
    'lodash',
    'symbols'
], function (React, _, symbols) {
    'use strict';
    function onChange1(selectedValue, option, optionIndex) {
        this.handleChange(option.value);
    }
    function repeatOption2(selectedValue, option, optionIndex) {
        return React.createElement('label', {
            'className': option.className,
            'key': 'option-' + option.value
        }, React.createElement('input', {
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'value': option.value,
            'checked': option.value === selectedValue,
            'onChange': onChange1.bind(this, selectedValue, option, optionIndex)
        }), React.createElement('span', {}, React.createElement('span', { 'className': 'image-container' }, option.imageUrl ? React.createElement('span', {
            'key': 'imgurl',
            'style': {
                background: 'url(\'' + option.imageUrl + '\') 50% 50% no-repeat',
                height: '100%',
                width: '100%',
                display: 'inline-block'
            }
        }) : null, !option.imageUrl ? React.createElement(symbols.symbol, {
            'key': 'symbol',
            'name': option.symbolName
        }) : null), React.createElement('span', { 'className': 'option-title' }, this.translateIfNeeded(option.title))));
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return React.createElement.apply(this, [
            'div',
            { 'className': 'thumbnails-with-icons' },
            this.props.label ? React.createElement('div', {
                'key': 'label',
                'className': 'thumbnails-with-icons-label'
            }, this.translateIfNeeded(this.props.label)) : null,
            _.map(this.props.options, repeatOption2.bind(this, selectedValue))
        ]);
    }
    return function () {
        return scopeSelectedValue3.apply(this, []);
    };
});