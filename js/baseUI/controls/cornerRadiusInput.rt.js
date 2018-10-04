define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/stepper',
    'baseUI/controls/linkToggle'
], function (React, _, stepper, linkToggle) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'control-border-radius' }, React.createElement('label', { 'className': 'inputLabel' }, this.translateIfNeeded(this.props.label)), React.createElement('div', { 'className': 'inputContainer' }, React.createElement(stepper, {
            'className': 'small',
            'name': 'top_left',
            'ref': 'top_left',
            'value': this.getCornerValue('top_left'),
            'onChange': this.onCornerChange.bind(this, 'top_left'),
            'min': this.props.minBorderValue,
            'max': this.props.maxBorderValue,
            'step': this.props.borderStep
        }), React.createElement(stepper, {
            'className': 'small',
            'name': 'top_right',
            'ref': 'top_right',
            'value': this.getCornerValue('top_right'),
            'onChange': this.onCornerChange.bind(this, 'top_right'),
            'min': this.props.minBorderValue,
            'max': this.props.maxBorderValue,
            'step': this.props.borderStep
        }), React.createElement(stepper, {
            'className': 'small',
            'name': 'bottom_right',
            'ref': 'bottom_right',
            'value': this.getCornerValue('bottom_right'),
            'onChange': this.onCornerChange.bind(this, 'bottom_right'),
            'min': this.props.minBorderValue,
            'max': this.props.maxBorderValue,
            'step': this.props.borderStep
        }), React.createElement(stepper, {
            'className': 'small',
            'name': 'bottom_left',
            'ref': 'bottom_left',
            'value': this.getCornerValue('bottom_left'),
            'onChange': this.onCornerChange.bind(this, 'bottom_left'),
            'min': this.props.minBorderValue,
            'max': this.props.maxBorderValue,
            'step': this.props.borderStep
        }), React.createElement('div', { 'className': 'cornersContainer' }, React.createElement('div', {
            'className': 'corner',
            'style': { borderTopLeftRadius: this.getCornerValue('top_left') + 'px' }
        }), React.createElement('div', {
            'className': 'corner',
            'style': { borderTopRightRadius: this.getCornerValue('top_right') + 'px' }
        }), React.createElement('div', {
            'className': 'corner',
            'style': { borderBottomRightRadius: this.getCornerValue('bottom_right') + 'px' }
        }), React.createElement('div', {
            'className': 'corner',
            'style': { borderBottomLeftRadius: this.getCornerValue('bottom_left') + 'px' }
        }), React.createElement('span', { 'className': 'link' }, React.createElement(linkToggle, {
            'name': 'link',
            'onClick': this.toggleLink,
            'value': this.getLinkedToggleValue()
        })))));
    };
});