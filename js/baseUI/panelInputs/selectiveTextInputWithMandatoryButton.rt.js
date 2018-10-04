define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/textInput',
    'baseUI/controls/mandatory',
    'baseUI/controls/toggle'
], function (React, _, textInput, mandatory, toggle) {
    'use strict';
    function onChange1(disableUI, evt) {
        this.fieldNameChanged(evt);
    }
    function onChange2(disableUI) {
        this.enabledChanged();
    }
    function onChange3(disableUI) {
        this.requiredChanged();
    }
    function scopeDisableUI4() {
        var disableUI = !this.state.enabled;
        return React.createElement('div', { 'className': 'selective-text-input' }, React.createElement(textInput, {
            'disabled': disableUI,
            'onChange': onChange1.bind(this, disableUI),
            'className': 'textInput',
            'maxLength': this.props.maxLength,
            'placeholder': this.props.placeholder,
            'value': this.state.fieldName
        }), React.createElement(toggle, {
            'name': 'checkbox',
            'disabled': this.props.forceDisable,
            'onChange': onChange2.bind(this, disableUI),
            'value': this.state.enabled
        }), React.createElement(mandatory, {
            'displayName': this.props.displayName,
            'hoverToolTipsKeys': this.props.hoverToolTipsKeys,
            'disabled': disableUI || this.props.forceDisable,
            'forceDisable': this.props.forceDisable,
            'onChange': onChange3.bind(this, disableUI),
            'value': this.state.required
        }));
    }
    return function () {
        return scopeDisableUI4.apply(this, []);
    };
});