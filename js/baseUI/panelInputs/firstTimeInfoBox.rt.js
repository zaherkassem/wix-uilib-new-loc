define([
    'react/addons',
    'lodash',
    'util',
    'baseUI/controls/button',
    'symbols'
], function (React, _, util, UIButton, symbols) {
    'use strict';
    return function () {
        return this.shouldShowTeaser() ? React.createElement('div', {
            'className': util.inheritClassName(this.props, 'first-time-info-box') + ' in-' + this.props.context,
            'key': this.props.id
        }, React.createElement('div', { 'className': 'pointer' }), React.createElement('div', { 'className': 'top-line' }, React.createElement('div', {
            'className': 'close',
            'onClick': this.close.bind(this, 'x')
        }, React.createElement(symbols.symbol, { 'name': 'firstTimeInfoBoxClose' }))), React.createElement('div', { 'className': 'content ' + (!!this.props.linkText ? 'has-link' : 'no-link') }, !!this.props.title ? React.createElement('div', {
            'className': 'title',
            'key': 'title'
        }, util.translate(this.props.title)) : null, React.createElement('div', { 'className': 'text' }, util.translate(this.props.text))), React.createElement('div', { 'className': 'bottom-line' }, !!this.props.linkText ? React.createElement(UIButton, {
            'label': 'add_category_teaser_link',
            'className': 'link no-margin btn-sm btn-text',
            'onClick': this.link,
            'key': 'learnMoreButton'
        }) : null, !!this.props.linkText ? React.createElement(symbols.symbol, {
            'className': 'arrow',
            'name': 'firstTimeInfoBoxArrowRight',
            'onClick': this.link,
            'key': 'learnMoreSymbol'
        }) : null, React.createElement('div', { 'className': 'space' }), React.createElement(UIButton, {
            'label': 'Settings_First_Time_Help_Gotit_button',
            'className': 'got-it btn-back',
            'onClick': this.close.bind(this, 'gotit')
        }))) : null;
    };
});