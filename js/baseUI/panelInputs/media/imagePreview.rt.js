define([
    'react/addons',
    'lodash',
    'util',
    'baseUI/controls/button',
    'baseUI/popovers/tooltip',
    'symbols'
], function (React, _, util, UIButton, tooltip, symbols) {
    'use strict';
    function onClick1(buttons, button, buttonIndex) {
        this.onClick(button);
    }
    function repeatButton2(buttons, button, buttonIndex) {
        return React.createElement(tooltip, {
            'key': this.getButtonLabel(button) || 'button' + buttonIndex,
            'value': this.getButtonTooltip(button),
            'disabled': !this.getButtonTooltip(button)
        }, React.createElement(UIButton, {
            'className': _.keys(_.pickBy(this.getButtonClasses(button), _.identity)).join(' '),
            'label': this.getButtonLabel(button),
            'icon': this.getButtonIcon(button),
            'onClick': onClick1.bind(this, buttons, button, buttonIndex)
        }));
    }
    function scopeButtons3() {
        var buttons = this.getButtons();
        return buttons.length > 0 ? React.createElement.apply(this, [
            'span',
            {
                'className': 'button-wrapper',
                'key': 'buttons'
            },
            _.map(buttons, repeatButton2.bind(this, buttons))
        ]) : null;
    }
    return function () {
        return React.createElement('div', { 'className': util.inheritClassName(this.props, 'image-preview') + (this.isEmpty() ? ' empty' : '') }, !this.isEmpty() ? React.createElement('div', {
            'className': 'image-wrapper',
            'key': 'wrapper'
        }, React.createElement('img', {
            'src': this.getURL(),
            'style': this.getStyle(),
            'onLoad': this.updateStyle
        })) : null, this.getNumberOfImages() > 1 ? React.createElement('span', {
            'onClick': this.showPrevImage,
            'className': 'arrow-button prev',
            'key': 'prev'
        }) : null, this.getNumberOfImages() > 1 ? React.createElement('span', {
            'onClick': this.showNextImage,
            'className': 'arrow-button next',
            'key': 'next'
        }) : null, this.isEmpty() ? React.createElement('div', {
            'className': _.keys(_.pickBy({
                'placeholder-wrapper': true,
                'symbol-in-the-middle': this.getButtons().length === 0
            }, _.identity)).join(' '),
            'key': 'placeholder'
        }, this.props.emptySymbolName ? React.createElement(symbols.symbol, {
            'name': this.props.emptySymbolName,
            'key': 'symbol'
        }) : null, React.createElement('div', { 'className': 'corner-borders top' }), React.createElement('div', { 'className': 'corner-borders bottom' })) : null, scopeButtons3.apply(this, []));
    };
});