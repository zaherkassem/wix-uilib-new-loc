define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function onClick1(selectedValue, option, optionIndex) {
        this.handleClick(optionIndex);
    }
    function repeatOption2(selectedValue, option, optionIndex) {
        return React.createElement('div', { 'onClick': onClick1.bind(this, selectedValue, option, optionIndex) }, React.createElement('span', { 'className': 'option' }, option.label, ' ', selectedValue === option.value ? 'selected' : ''));
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return React.createElement.apply(this, [
            'span',
            this.topLevelProps,
            React.createElement('span', { 'className': 'label' }, this.getLabel()),
            _.map(this.props.options, repeatOption2.bind(this, selectedValue))
        ]);
    }
    return function () {
        return scopeSelectedValue3.apply(this, []);
    };
});