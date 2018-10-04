define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function scopeInputComp1() {
        var inputComp = this.getInputComponent();
        return React.createElement(inputComp, _.assign({}, { 'ref': 'inputComp' }, this.getPropsForInputComponent()));
    }
    return function () {
        return scopeInputComp1.apply(this, []);
    };
});