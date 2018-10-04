define([
    'react/addons',
    'lodash',
    'baseUI/popovers/tooltip',
    'baseUI/framework/uiConstants',
    'symbols'
], function (React, _, tooltip, uiConstants, symbols) {
    'use strict';
    function onFocus1() {
        this.setFocusState(true);
    }
    return function () {
        return React.createElement('span', { 'className': 'domain-input-wrapper' }, React.createElement('span', { 'className': 'mini-toolbar' }, React.createElement(symbols.symbol, { 'name': 'addressBarMiniToolbar' })), React.createElement('div', { 'className': 'full-domain-wrapper' + (this.state.isFocused ? ' focus' : '') }, this.props.prefix ? React.createElement('span', {
            'key': 'domainPrefix',
            'ref': 'prefix',
            'className': 'domain-prefix',
            'onClick': this.reportPrefixClicked
        }, this.props.prefix) : null, React.createElement('span', {
            'className': 'input-wrapper',
            'onClick': this.handleDomainNameClickBI
        }, React.createElement('input', {
            'ref': 'domain',
            'type': 'text',
            'value': this.state.value,
            'className': this.state.invalidMessage ? 'invalid' : '',
            'onFocus': onFocus1.bind(this),
            'onBlur': this.handleInputBlur,
            'onChange': this.handleChange,
            'onKeyDown': this.handleInputKeyDown,
            'onClick': this.reportValueClickedIfNeeded,
            'disabled': !this.props.isEditable,
            'spellCheck': 'false'
        })), React.createElement(tooltip, {
            'className': 'domain-tooltip',
            'id': this.getTooltipId(),
            'value': this.state.invalidMessage,
            'alignment': uiConstants.TOOLTIP.ALIGNMENT.TOP,
            'openTriggers': [],
            'closeTriggers': []
        }, React.createElement('div', { 'className': 'tooltip-anchor' }))));
    };
});