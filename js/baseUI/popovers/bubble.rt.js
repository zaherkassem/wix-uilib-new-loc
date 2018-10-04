define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('div', {
            'className': _.keys(_.pickBy(this.getClasses(), _.identity)).join(' '),
            'style': { maxWidth: this.props.width },
            'onMouseLeave': this.onMouseLeave,
            'onMouseEnter': this.onMouseEnter
        }, React.createElement('div', {
            'className': 'arrow',
            'style': this.getArrowStyle()
        }), React.createElement('div', { 'className': 'content-wrapper' }, this.getContent()));
    };
});