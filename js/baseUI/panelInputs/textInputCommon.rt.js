define([
    'react/addons',
    'lodash',
    'baseUI/popovers/tooltip',
    'baseUI/framework/uiConstants',
    'symbols',
    'baseUI/controls/infoIcon'
], function (React, _, tooltip, uiConstants, symbols, infoIcon) {
    'use strict';
    function onFocus1(inputClass) {
        this.setState({ isFocused: true });
    }
    function onBlur2(inputClass) {
        this.setState({ isFocused: false });
    }
    function scopeInputClass3() {
        var inputClass = this.getInputElementClass();
        return React.createElement('div', _.assign({}, { 'className': _.keys(_.pickBy(this.getWrapperClasses(), _.identity)).join(' ') }, this.filteredProps()), this.hasLabel() ? React.createElement('label', { 'key': 'textInputControlTitle' }, this.translateIfNeeded(this.getLabel())) : null, this.hasLabel() && (this.props.infoText || this.props.infoTitle) ? React.createElement(infoIcon, {
            'key': 'infoIcon',
            'text': this.props.infoText,
            'title': this.props.infoTitle,
            'size': 18
        }) : null, React.createElement(inputClass, {
            'ref': 'input',
            'type': this.props.type || 'text',
            'className': this.props.isMultiLine ? this.props.textAreaClass : '',
            'valueLink': this.linkState('value'),
            'onWheel': this.handleWheel,
            'disabled': this.isDisabled(),
            'placeholder': this.translateIfNeeded(this.props.placeholder) || '',
            'maxLength': this.props.maxLength,
            'spellCheck': false,
            'autoFocus': this.props.focus,
            'onKeyDown': this.handleKeyDown,
            'onFocus': onFocus1.bind(this, inputClass),
            'onBlur': onBlur2.bind(this, inputClass)
        }), React.createElement(tooltip, {
            'id': this.getTooltipId(),
            'value': this.getInvalidMessage(),
            'width': '300px',
            'styleType': uiConstants.TOOLTIP.STYLE_TYPE.SMALL,
            'openTriggers': [],
            'closeTriggers': []
        }, React.createElement('span', {
            'className': 'validation-icon validation-icon-error',
            'onClick': this.selectContent
        }, React.createElement(symbols.symbol, { 'name': 'inputValidationError' }))), React.createElement('span', { 'className': 'validation-icon validation-icon-success' }, React.createElement(symbols.symbol, { 'name': 'inputValidationSuccess' })));
    }
    return function () {
        return scopeInputClass3.apply(this, []);
    };
});