define([
    'react/addons',
    'lodash',
    'util',
    'symbols',
    'baseUI/framework/uiConstants'
], function (React, _, util, symbols, uiConstants) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'imageAndTextTooltip' }, this.props.calculatedAlignment === uiConstants.TOOLTIP.ALIGNMENT.TOP && !!this.props.image ? React.createElement('div', {
            'key': 'upperImage',
            'className': 'image-container upper-image',
            'style': this.getImageContainerStyle()
        }, React.createElement(symbols.symbol, { 'name': this.props.image })) : null, React.createElement('div', { 'className': 'text-container ' + (!this.props.image ? 'text-no-image' : '') }, !!this.props.title ? React.createElement('div', {
            'className': 'title',
            'key': 'tooltipTitle'
        }, util.translate(this.props.title)) : null, !!this.props.text ? React.createElement('div', {
            'className': 'text',
            'key': 'tooltipText'
        }, util.translate(this.props.text)) : null, !!this.props.linkAction ? React.createElement('div', {
            'className': 'learn-more',
            'onClick': this.onLinkClick,
            'key': 'learnMore'
        }, util.translate(this.props.learnMoreText), '\n        ') : null), this.props.calculatedAlignment === uiConstants.TOOLTIP.ALIGNMENT.BOTTOM && !!this.props.image ? React.createElement('div', {
            'key': 'lowerImage',
            'className': 'image-container lower-image',
            'style': this.getImageContainerStyle()
        }, React.createElement(symbols.symbol, { 'name': this.props.image })) : null);
    };
});