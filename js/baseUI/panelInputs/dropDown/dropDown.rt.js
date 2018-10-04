define([
    'react/addons',
    'lodash',
    'symbols',
    'baseUI/controls/infoIcon'
], function (React, _, symbols, infoIcon) {
    'use strict';
    return function () {
        return React.createElement('div', {
            'className': 'dropdown ' + this.getDDClassName(),
            'style': this.props.style,
            'tabIndex': this.props.tabIndex || 0,
            'onKeyDown': this.onKeyDown
        }, this.hasLabel() ? React.createElement('label', { 'key': 'dropdownLabel' }, this.translateIfNeeded(this.getLabel())) : null, this.hasLabel() && (this.props.infoText || this.props.infoTitle) ? React.createElement(infoIcon, {
            'key': 'infoIcon',
            'text': this.props.infoText,
            'title': this.props.infoTitle
        }) : null, React.createElement('div', {
            'className': 'dd',
            'ref': 'dropdown',
            'onClick': this.toggle
        }    /* tabindex="0" */
             /* onBlur="{this.onBlur}" */, React.createElement('div', {
            'className': 'selected-container',
            'ref': 'selectedContainer'
        }, this.props.template.call(this)), this.props.toggleIcon ? React.createElement('i', {
            'key': 'toggleIcon',
            'className': 'expand arrow'
        }, React.createElement(symbols.symbol, { 'name': 'arrowDown' })) : null));
    };
});