define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/slider',
    'baseUI/colorPicker/colorPickerInputWithOpacity',
    'baseUI/controls/angle'
], function (React, _, slider, colorPickerInputWithOpacity, angle) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'shadow-control' }, React.createElement(angle, {
            'disabled': this.props.disabled,
            'label': 'CustomDesign_Shadow_Angle',
            'onChange': this.changeAngle,
            'value': this.getAngleValue(),
            'step': 1
        }), React.createElement('hr', { 'className': 'divider-short' }), React.createElement(slider, {
            'disabled': this.props.disabled,
            'label': 'CustomDesign_Shadow_Distance',
            'onChange': this.distanceChanged,
            'value': this.getDistanceValue(),
            'min': 0,
            'max': 50
        }), React.createElement('hr', { 'className': 'divider-short' }), React.createElement(slider, {
            'disabled': this.props.disabled,
            'label': 'CustomDesign_Shadow_Size',
            'onChange': this.sizeChanged,
            'value': this.getSizeValue(),
            'min': 0,
            'max': 50
        }), React.createElement('hr', { 'className': 'divider-short' }), React.createElement(slider, {
            'disabled': this.props.disabled,
            'label': 'CustomDesign_Shadow_Blur',
            'onChange': this.blurChanged,
            'value': this.getBlurValue(),
            'min': 0,
            'max': 50
        }), React.createElement('hr', { 'className': 'divider-short' }), React.createElement(colorPickerInputWithOpacity, _.assign({}, {
            'disabled': this.props.disabled,
            'label': 'CustomDesign_Shadow_Color&Opacity',
            'valueLink': this.linkColorWithOpacity()
        }, this.getColorPickerProps())), this.props.disabled ? React.createElement('div', {
            'className': 'blocking-layer',
            'key': 'blockingLayer'
        }) : null);
    };
});