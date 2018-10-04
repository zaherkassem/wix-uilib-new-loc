define([
    'react/addons',
    'lodash',
    'baseUI/controls/playButton',
    'symbols'
], function (React, _, playButton, symbols) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'thumbnail-preview-play' }, React.createElement(symbols.symbol, { 'name': this.props.iconSymbolName }), React.createElement('div', { 'className': 'label' }, this.props.label), React.createElement(playButton, { 'onClickAction': this.props.onClickAction }));
    };
});