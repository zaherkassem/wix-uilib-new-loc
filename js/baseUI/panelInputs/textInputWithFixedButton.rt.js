define([
    'react/addons',
    'lodash',
    'baseUI/controls/button',
    'baseUI/popovers/tooltip',
    'baseUI/framework/uiConstants',
    'symbols'
], function (React, _, UIButton, tooltip, uiConstants, symbols) {
    'use strict';
    function onFocus1(isValidResult) {
        this.setFocusState(true);
    }
    function scopeIsValidResult2() {
        var isValidResult = this.isValid();
        return React.createElement('div', _.assign({}, {
            'className': _.keys(_.pickBy({
                'control-text-input-with-fixed-button': true,
                'invalid': !this.isValid(),
                'success': this.isValid(),
                'focused': this.state.isFocused
            }, _.identity)).join(' ')
        }, this.filteredProps()), React.createElement(tooltip, {
            'id': this.getTooltipId(),
            'value': this.getInvalidMessage(),
            'disabled': this.isValid(),
            'ref': 'tooltip'
        }, React.createElement('input', {
            'className': 'control-text',
            'value': this.state.value,
            'onChange': this.handleChange,
            'maxLength': this.props.maxLength,
            'onFocus': onFocus1.bind(this, isValidResult),
            'onKeyPress': this.onKeyPress,
            'type': 'text',
            'autoFocus': 'true'
        })), React.createElement(UIButton, {
            'ref': 'actionButton',
            'onClick': this.handleClick,
            'label': this.props.buttonLabel,
            'className': _.keys(_.pickBy({ 'disabled': !this.isValid() }, _.identity)).join(' ')
        }));
    }
    return function () {
        return scopeIsValidResult2.apply(this, []);
    };
});