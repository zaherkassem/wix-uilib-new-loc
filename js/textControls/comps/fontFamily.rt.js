define([
    'react/addons',
    'lodash',
    'baseUI'
], function (React, _, UI) {
    'use strict';
    function repeatFont1(font, fontIndex) {
        return React.createElement(UI.dropDown.option, {
            'value': font.value,
            'className': 'font-option ' + (this.props.optionsClass ? this.props.optionsClass : ''),
            'key': this.props.value
        }, React.createElement('div', { 'className': 'font-option-container' }, React.createElement('div', {
            'className': 'font-image',
            'style': font.style
        }), React.createElement('span', { 'className': 'font-label' }, font.label)));
    }
    return function () {
        return React.createElement(UI.tooltip, {
            'value': this.props.tooltipValue,
            'disabled': !this.props.tooltipValue,
            'styleType': this.props.tooltipStyleType
        }, React.createElement('div', { 'style': { display: 'inline' } }, React.createElement.apply(this, [
            UI.dropDown.combobox,
            {
                'label': this.props.label,
                'ref': 'combobox',
                'optionsWidth': this.props.optionsWidth,
                'autotranslate': false,
                'valueLink': this.props.valueLink,
                'value': this.props.value,
                'className': 'font-family-dd ' + (this.props.toolbarMode ? 'toolbar-mode' : ''),
                'onChange': this.props.onChange,
                'infoText': this.props.infoText,
                'infoTitle': this.props.infoTitle
            },
            _.map(this.state.fontsItems, repeatFont1.bind(this)),
            this.props.footerText && (this.props.footerOnClick || this.props.footerText) ? React.createElement(UI.dropDown.footer, { 'key': 'font_family_footer' }, React.createElement('span', { 'onClick': this.handleFooterOnClick }, this.props.footerText)) : null
        ])));
    };
});