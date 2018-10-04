define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/textInput'
], function (React, _, textInput) {
    'use strict';
    function mergeProps(inline, external) {
        var res = _.assign({}, inline, external);
        if (inline.hasOwnProperty('style')) {
            res.style = _.defaults(res.style, inline.style);
        }
        if (inline.hasOwnProperty('className') && external.hasOwnProperty('className')) {
            res.className = external.className + ' ' + inline.className;
        }
        return res;
    }
    return function () {
        return React.createElement('div', mergeProps({ 'className': 'prefixed-text-input-container' }, this.filteredProps()), this.hasLabel() ? React.createElement('label', {
            'key': 'title',
            'className': 'label'
        }, this.translateIfNeeded(this.getLabel())) : null, React.createElement('div', {}, React.createElement('label', { 'className': 'prefixed-text-input-label' }, this.translateIfNeeded(this.getInputPrefix())), React.createElement(textInput, this.getInputProps())));
    };
});