define([
    'react/addons',
    'lodash',
    'util',
    'symbols'
], function (React, _, util, symbols) {
    'use strict';
    function onClick1() {
        this.onItemClick();
    }
    return function () {
        return React.createElement('div', {
            'className': 'listItem',
            'onClick': onClick1.bind(this)
        }, React.createElement('img', {
            'className': 'image',
            'src': this.props.url
        }), React.createElement('div', { 'className': 'content' }, this.props.title ? React.createElement('div', {
            'key': 'title',
            'className': 'title ellipsis'
        }, util.translate(this.props.title)) : null, this.props.desc ? React.createElement('div', {
            'key': 'desc',
            'className': 'desc ellipsis'
        }, util.translate(this.props.desc)) : null), React.createElement(symbols.symbol, {
            'className': 'arrow',
            'name': 'arrowWithStates'
        }));
    };
});