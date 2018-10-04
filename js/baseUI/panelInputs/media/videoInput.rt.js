define([
    'react/addons',
    'lodash',
    'util',
    'baseUI/controls/button',
    'symbols'
], function (React, _, util, UIButton, symbols) {
    'use strict';
    function mergeProps(inline, external) {
        var res = _.assign({}, inline, external);
        if (inline.hasOwnProperty('style')) {
            res.style = _.defaults(res.style, inline.style);
        }
        if (inline.hasOwnProperty('className') && external.hasOwnProperty('className')) {
            res.className = external.className + ' ' + inline.className;
        }
        return res;
    }
    function onClick2(e) {
        e.preventDefault();
    }
    function onClick3() {
        this.state.isPlaying ? this.pauseVideo() : this.playVideo();
    }
    function onClick4(button) {
        this.onClick(button);
    }
    function scopeButton5() {
        var button = this.getButton();
        return !this.state.isPlaying ? React.createElement('span', {
            'className': 'button-wrapper',
            'key': 'button'
        }, React.createElement(UIButton, {
            'className': 'action' + (!!this.getButtonIcon(button) ? ' has-icon' : '') + ' btn-confirm-secondary',
            'label': this.getButtonLabel(button),
            'icon': this.getButtonIcon(button),
            'key': this.getButtonLabel(button),
            'onClick': onClick4.bind(this, button)
        })) : null;
    }
    return function () {
        return React.createElement('div', mergeProps({
            'className': util.inheritClassName(this.props, 'video-input') + (this.isEmpty() ? ' empty' : ''),
            'onMouseEnter': this.onMouseEnter,
            'onMouseLeave': this.onMouseLeave
        }, this.filteredProps()), !this.isEmpty() ? React.createElement('div', {
            'className': 'video-wrapper',
            'key': 'wrapper'
        }, React.createElement('iframe', { 'src': this.getURL() })) : null, !this.isEmpty() ? React.createElement('div', {
            'className': 'video-controls',
            'key': 'videoControls'
        }, React.createElement('div', {
            'className': _.keys(_.pickBy({
                'blocking-layer': true,
                'pause': !this.state.isPlaying,
                'play': this.state.isPlaying
            }, _.identity)).join(' '),
            'onClick': onClick2.bind(this)
        }), React.createElement('div', {
            'className': _.keys(_.pickBy({
                'play-button': !this.state.isPlaying,
                'pause-button': this.state.isPlaying && this.state.isMouseHovering
            }, _.identity)).join(' '),
            'onClick': onClick3.bind(this)
        }, React.createElement('span', {
            'className': _.keys(_.pickBy({
                'triangle': !this.state.isPlaying,
                'pause': this.state.isPlaying
            }, _.identity)).join(' ')
        }))) : null, this.isEmpty() ? React.createElement('div', {
            'className': _.keys(_.pickBy({ 'placeholder-wrapper': true }, _.identity)).join(' '),
            'key': 'placeholder'
        }, React.createElement(symbols.symbol, {
            'name': 'videoInvalid',
            'key': 'symbol'
        })) : null, scopeButton5.apply(this, []));
    };
});