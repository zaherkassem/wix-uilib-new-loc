define([
    'react/addons',
    'lodash',
    'symbols'
], function (React, _, symbols) {
    'use strict';
    function onChange1(option, optionIndex) {
        this.handleChange(option.value);
    }
    function repeatOption2(option, optionIndex) {
        return React.createElement('label', { 'key': 'option_' + optionIndex }, React.createElement('input', {
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'value': option.value,
            'checked': this.isCurrentValue(option.value),
            'onChange': onChange1.bind(this, option, optionIndex)
        }), React.createElement('div', { 'className': 'thumbnail-container ' + this.props.align }, option.imgSrc ? React.createElement('img', {
            'key': 'imgsrc',
            'className': _.keys(_.pickBy({ withoutLabel: !option.title }, _.identity)).join(' '),
            'src': option.imgSrc,
            'width': option.width || '',
            'height': option.height || ''
        }) : null, option.symbolName ? React.createElement(symbols.symbol, {
            'key': 'thumbnailContainerSymbol',
            'name': option.symbolName
        }) : null, option.title ? React.createElement('span', {
            'key': 'title',
            'className': 'thumbnail-title'
        }, this.translateIfNeeded(option.title)) : null));
    }
    return function () {
        return React.createElement.apply(this, [
            'div',
            { 'className': 'thumbnails-vertical' },
            _.map(this.props.options, repeatOption2.bind(this))
        ]);
    };
});