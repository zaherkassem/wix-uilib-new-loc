define([
    'react/addons',
    'lodash',
    'baseUI'
], function (React, _, UI) {
    'use strict';
    function repeatStyle1(style, styleIndex) {
        return React.createElement(UI.dropDown.option, {
            'value': style.cssClass,
            'key': style.displayName + style.family,
            'className': 'style-option ' + (this.props.optionsClass ? this.props.optionsClass : '')
        }, React.createElement('div', { 'className': 'style-option-header' }, React.createElement('div', { 'className': 'style-color-container' }, React.createElement('span', {
            'className': 'style-color',
            'style': { backgroundColor: style.cssColor }
        })), React.createElement('span', {
            'className': 'style-name',
            'style': this.getDisplayStyle(style)
        }, this.translateIfNeeded(style.displayName))), React.createElement('div', { 'className': 'style-option-footer' }, React.createElement('span', { 'className': 'style-size' }, style.size), React.createElement('span', { 'className': 'style-tag' }, '<', style.tag, '>')), React.createElement('div', { 'className': 'style-option-label' }, this.translateIfNeeded(style.displayName)));
    }
    return function () {
        return React.createElement(UI.tooltip, {
            'value': this.props.tooltipValue,
            'disabled': !this.props.tooltipValue,
            'styleType': this.props.tooltipStyleType
        }, React.createElement('div', { 'style': { display: 'inline' } }, React.createElement.apply(this, [
            UI.dropDown.select,
            {
                'label': this.props.label,
                'value': this.props.value,
                'onChange': this.props.onChange,
                'autotranslate': false,
                'ref': 'dropdown',
                'infoText': this.props.infoText,
                'infoTitle': this.props.infoTitle,
                'optionsWidth': this.props.optionsWidth,
                'className': 'text-style-dd ' + (this.props.toolbarMode ? 'toolbar-mode' : ''),
                'doNotFocus': this.props.doNotFocus
            },
            _.map(this.getStyleOptions(), repeatStyle1.bind(this)),
            this.isCustom() ? React.createElement(UI.dropDown.option, {
                'key': 'textStyleCustom',
                'value': this.props.value,
                'className': 'style-option',
                'style': { display: 'none' }
            }, '\n                ', this.state.nullLabel, '\n            ') : null
        ])));
    };
});