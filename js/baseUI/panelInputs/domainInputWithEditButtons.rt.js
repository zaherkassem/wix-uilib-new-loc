define([
    'react/addons',
    'lodash',
    'baseUI/controls/button',
    'baseUI/popovers/tooltip',
    'baseUI/framework/uiConstants',
    'symbols'
], function (React, _, BaseButton, tooltip, uiConstants, symbols) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'domain-input-with-buttons' }, React.createElement('span', { 'className': 'address-part' }, React.createElement('span', { 'className': 'mini-toolbar' }, React.createElement(symbols.symbol, { 'name': 'addressBarMiniToolbar' })), React.createElement('div', { 'className': 'full-domain-wrapper' + (!this.state.isEditingDisabled ? ' focus' : '') }, this.props.prefix ? React.createElement('div', {
            'key': 'domainPrefix',
            'ref': 'prefix',
            'className': 'domain-prefix',
            'onClick': this.reportPrefixClicked
        }, this.props.prefix) : null, React.createElement('span', { 'className': 'input-wrapper' }, React.createElement('input', {
            'ref': 'domain',
            'type': 'text',
            'className': this.state.invalidMessage ? 'invalid' : '',
            'value': this.state.value,
            'onChange': this.handleChange,
            'onKeyDown': this.handleInputKeyDown,
            'onClick': this.reportValueClickedIfNeeded,
            'onBlur': this.reportInvalidValueIfNeeded,
            'disabled': this.state.isEditingDisabled,
            'spellCheck': 'false'
        })), React.createElement(tooltip, {
            'className': 'domain-tooltip',
            'id': this.getTooltipId(),
            'value': this.state.invalidMessage,
            'alignment': uiConstants.TOOLTIP.ALIGNMENT.TOP,
            'openTriggers': [],
            'closeTriggers': []
        }, React.createElement('div', { 'className': 'tooltip-anchor' })))), this.props.isEditable ? React.createElement('div', {
            'key': 'buttonsContainer',
            'className': 'button-container'
        }, React.createElement(BaseButton, {
            'className': 'edit-button' + (this.shouldDisplayEditButton() ? ' displayed' : ''),
            'label': 'SAVE_SITE_SAVED_BUTTON_EDIT',
            'onClick': this.enableEditing
        }), React.createElement('div', { 'className': 'dual-button-container' + (this.shouldDisplayApplyCancelButtons() ? ' displayed' : '') }, React.createElement('button', {
            'className': 'cancel-button',
            'onClick': this.cancelEditing
        }, React.createElement(symbols.symbol, { 'name': 'x' })), React.createElement('button', {
            'className': 'apply-button',
            'disabled': !!this.state.invalidMessage,
            'onClick': this.applyEditing
        }, React.createElement(symbols.symbol, { 'name': 'check' })))) : null);
    };
});