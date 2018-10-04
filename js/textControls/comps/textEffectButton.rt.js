define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('span', { 'className': this.props.className }, React.createElement('button', {
            'className': _.keys(_.pickBy({
                'text-effect-button': true,
                selected: this.props.isSelected
            }, _.identity)).join(' '),
            'onClick': this.props.onClick
        }, React.createElement('span', {}, this.props.children)));
    };
});