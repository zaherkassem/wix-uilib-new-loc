define([
    'react/addons',
    'lodash',
    'util',
    'baseUI/controls/button',
    'symbols'
], function (React, _, util, UIButton, symbols) {
    'use strict';
    function onMouseEnter1() {
        this.setState({ 'isMouseHovering': true });
    }
    function onMouseLeave2() {
        this.setState({ 'isMouseHovering': false });
    }
    function onClick3() {
        this.state.isPlaying ? this.pauseVideo() : this.playVideo();
    }
    return function () {
        return React.createElement('div', {
            'className': util.inheritClassName(this.props, 'control-video-change') + (this.isEmpty() ? ' empty' : ''),
            'onMouseEnter': onMouseEnter1.bind(this),
            'onMouseLeave': onMouseLeave2.bind(this)
        }, React.createElement('iframe', {
            'style': { display: this.isEmpty() ? 'none' : 'block' },
            'className': 'video',
            'src': this.getVideoSrc()
        }), !this.isEmpty() ? React.createElement('div', {
            'key': 'blocking-layer',
            'className': 'blocking-layer-' + (this.state.isPlaying ? 'play' : 'pause'),
            'onClick': this.blockEvent
        }) : null, !this.isEmpty() ? React.createElement('div', {
            'key': 'play',
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
        })) : null, !this.state.isPlaying && this.props.searchable ? React.createElement('span', {
            'className': 'button-wrapper',
            'key': 'search'
        }, React.createElement(UIButton, {
            'label': this.getButtonLabel(),
            'icon': 'magnifyingGlass',
            'onClick': this.openVideoSearchPanel
        })) : null, !this.state.isPlaying ? React.createElement('div', { 'key': 'controls' }, this.isEmpty() ? React.createElement(symbols.symbol, {
            'name': 'videoCamera',
            'key': 'camera'
        }) : null, this.isEmpty() ? React.createElement('div', {
            'className': 'corner-borders top',
            'key': 'top'
        }) : null, this.isEmpty() ? React.createElement('div', {
            'className': 'corner-borders bottom',
            'key': 'bottom'
        }) : null) : null);
    };
});