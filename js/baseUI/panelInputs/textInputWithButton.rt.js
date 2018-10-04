define([
    'react/addons',
    'lodash',
    'baseUI/controls/button',
    'baseUI/framework/uiConstants',
    'baseUI/panelInputs/textInput',
    'symbols'
], function (React, _, UIButton, uiConstants, textInput, symbols) {
    'use strict';
    function mergeProps(inline, external) {
        var res = _.assign({}, inline, external);
        if (inline.hasOwnProperty('style')) {
            res.style = _.defaults(res.style, inline.style);
        }
        if (inline.hasOwnProperty('className') && external.hasOwnProperty('className')) {
            res.className = external.className + ' ' + inline.className;
        }
        return res;
    }
    function onFocus2(isDisabled) {
        this.toggleFocus(true);
    }
    function onBlur3(isDisabled) {
        this.toggleFocus(false);
    }
    function scopeIsDisabled4() {
        var isDisabled = this.isDisabled();
        return React.createElement('div', mergeProps({ 'className': 'control-text-input-with-button' + (isDisabled ? ' disabled' : '') }, this.filteredProps()), React.createElement(textInput, {
            'valueLink': {
                value: this.getValueFromProps(),
                requestChange: this.updateValue
            },
            'label': this.props.label,
            'placeholder': this.props.placeholder,
            'defaultText': this.props.defaultText,
            'maxLength': this.props.maxLength,
            'focus': this.props.focus,
            'isMultiLine': this.props.multiLine,
            'validator': this.props.validator,
            'asyncValidator': this.props.asyncValidator,
            'invalidMessage': this.props.invalidMessage,
            'processValue': this.props.processValue,
            'onFocus': onFocus2.bind(this, isDisabled),
            'onBlur': onBlur3.bind(this, isDisabled),
            'infoText': this.props.infoText,
            'infoTitle': this.props.infoTitle,
            'validateOnBlurOnly': true
        }), this.shouldShowButton() ? React.createElement(UIButton, {
            'key': 'textInputWithButtonButton',
            'ref': 'actionButton',
            'onClick': this.handleClick,
            'disabled': !this.state.isFocused,
            'label': this.props.buttonLabel
        }) : null);
    }
    return function () {
        return scopeIsDisabled4.apply(this, []);
    };
});