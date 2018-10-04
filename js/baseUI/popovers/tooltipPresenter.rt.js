define([
    'react/addons',
    'lodash',
    'baseUI/popovers/bubble'
], function (React, _, bubble) {
    'use strict';
    return function () {
        return React.createElement(bubble, this.getBubbleProps());
    };
});