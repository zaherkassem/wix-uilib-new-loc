define([
    'react/addons',
    'lodash',
    'symbols',
    'baseUI'
], function (React, _, symbols, UI) {
    'use strict';
    return function () {
        return React.createElement(UI.tooltip, {
            'value': this.props.tooltipValue,
            'disabled': !this.props.tooltipValue,
            'styleType': this.props.tooltipStyleType
        }, React.createElement('div', { 'className': 'icon-button-container' }, React.createElement('button', {
            'className': this.getClassName(),
            'onClick': this.props.onClick,
            'style': this.props.style
        }, this.props.name ? React.createElement('span', { 'key': 'key' + this.props.name }, React.createElement(symbols.symbol, { 'name': this.props.name })) : null, React.createElement('span', {}, this.props.children), this.props.popupMode ? React.createElement(UI.arrowButton, {
            'key': 'iconButtonArrow',
            'withoutBorder': true
        }) : null)));
    };
});