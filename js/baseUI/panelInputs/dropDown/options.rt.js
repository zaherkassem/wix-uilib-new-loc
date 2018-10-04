define([
    'react/addons',
    'lodash',
    'symbols'
], function (React, _, symbols) {
    'use strict';
    function onMouseEnter1(direction) {
        this.scrollTo(-1);
    }
    function onMouseEnter2(direction) {
        this.scrollTo(1);
    }
    return function () {
        return React.createElement('section', { 'className': 'dropdown-options ' + this.state.className + ' ' + (this.state.visible ? 'expanded' : '') }, React.createElement('div', {
            'className': 'options',
            'ref': 'options',
            'onWheel': this.wheelScroll,
            'tabIndex': '0',
            'onBlur': this.onBlur,
            'onMouseLeave': this.onMouseLeave,
            'onMouseDown': this.disableBlur,
            'onMouseUp': this.enableBlur
        }, React.createElement('i', {
            'className': 'top arrow',
            'onMouseEnter': onMouseEnter1.bind(this),
            'onMouseLeave': this.stopScrollAnimation
        }, React.createElement(symbols.symbol, { 'name': 'arrowDown' })), React.createElement('ol', {
            'className': 'list',
            'ref': 'list'
        }, this.getCached('options')), this.getCached('footer') ? React.createElement('footer', {
            'ref': 'footer',
            'key': 'options-footer'
        }, this.getCached('footer')) : null, React.createElement('i', {
            'className': 'bottom arrow',
            'onMouseEnter': onMouseEnter2.bind(this),
            'onMouseLeave': this.stopScrollAnimation
        }, React.createElement(symbols.symbol, { 'name': 'arrowDown' }))));
    };
});