define([
    'react/addons',
    'lodash',
    'baseUI'
], function (React, _, UI) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'control-accordion' }, React.createElement('div', {
            'className': 'accordion-header',
            'onClick': this.toggle
        }, React.createElement('span', {
            'className': _.keys(_.pickBy({
                'accordion-icon': true,
                open: this.state.opened
            }, _.identity)).join(' ')
        }, React.createElement(UI.symbol, { 'name': this.state.opened ? 'accordionOpen' : 'accordionClose' })), React.createElement('label', {}, this.translateIfNeeded(this.getLabel())), this.props.isOptionSelected ? React.createElement('span', {
            'key': 'textEffectsIndicator',
            'className': 'selected-indicator'
        }, React.createElement(UI.symbol, { 'name': 'textEffectsIndicator' })) : null, this.props.infoText || this.props.infoTitle ? React.createElement(UI.infoIcon, {
            'key': 'accordionInfoIcon',
            'title': this.props.infoTitle,
            'text': this.props.infoText
        }) : null), this.state.opened ? React.createElement('div', {
            'key': 'accordionContent',
            'className': 'content'
        }, this.props.children) : null);
    };
});