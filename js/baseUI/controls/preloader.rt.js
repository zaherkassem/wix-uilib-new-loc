define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'circle-preloader ' + (this.props.className || '') });
    };
});