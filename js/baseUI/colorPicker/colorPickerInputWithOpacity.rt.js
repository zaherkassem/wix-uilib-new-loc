define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/slider',
    'baseUI/colorPicker/colorPickerInput'
], function (React, _, slider, colorPicker) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'color-picker-input-with-opacity' }, this.props.label ? React.createElement('label', {
            'key': 'label',
            'className': _.keys(_.pickBy({
                'color-picker-input-with-opacity-label': true,
                disabled: this.props.disabled
            }, _.identity)).join(' ')
        }, this.translateIfNeeded(this.props.label)) : null, React.createElement('div', { 'className': 'color-picker-input-with-opacity-slider' }, React.createElement(slider, {
            'isSmallStepper': this.props.isSmallStepper,
            'disabled': this.props.disabled,
            'units': '%',
            'valueLink': this.linkOpacity(),
            'min': 0,
            'max': 100,
            'step': 1
        }), React.createElement(colorPicker, _.assign({}, {
            'disabled': this.props.disabled,
            'valueLink': this.linkColor()
        }, this.getPropsForColorInput()))));
    };
});