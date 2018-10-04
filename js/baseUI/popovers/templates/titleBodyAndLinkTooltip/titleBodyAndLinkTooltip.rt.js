define([
    'react/addons',
    'lodash',
    'util'
], function (React, _, util) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'titleBodyAndLinkTooltip' }, !!this.props.title ? React.createElement('div', {
            'className': 'title',
            'key': 'title'
        }, util.translate(this.props.title)) : null, !!this.props.text ? React.createElement('div', {
            'className': 'text',
            'key': 'text'
        }, util.translate(this.props.text)) : null, !!this.props.link ? React.createElement('div', {
            'className': 'link',
            'key': 'link',
            'onClick': this.onLinkClick
        }, util.translate(this.props.link)) : null);
    };
});