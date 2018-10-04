define([
    'react/addons',
    'lodash',
    'baseUI/controls/button',
    'baseUI/controls/toggle',
    'symbols',
    'util'
], function (React, _, UIButton, toggle, symbols, util) {
    'use strict';
    function scopeIsChecked1() {
        var isChecked = this.getValueFromProps(this.props);
        return React.createElement('div', { 'className': util.inheritClassName(this.props, 'control-checkbox-with-button') }, React.createElement('div', { 'className': 'controls-wrapper' }, React.createElement(toggle, {
            'name': 'checkbox',
            'data-indeterminate': this.props.indeterminate,
            'value': isChecked,
            'onChange': this.handleChange,
            'ref': 'checkbox',
            'disabled': this.props.isCheckboxDisabled,
            'label': this.props.label,
            'shouldTranslate': this.props.shouldTranslate,
            'labelAfterSymbol': true
        }), isChecked ? React.createElement(UIButton, {
            'key': 'ui-button',
            'className': 'checkbox-button',
            'label': this.props.buttonLabel,
            'onClick': this.props.onButtonClick,
            'shouldTranslate': this.props.shouldTranslate,
            'disabled': Boolean(this.props.isButtonDisabled)
        }) : null));
    }
    return function () {
        return scopeIsChecked1.apply(this, []);
    };
});