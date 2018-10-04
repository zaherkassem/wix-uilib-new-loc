define([
    'react/addons',
    'lodash',
    'baseUI/controls/horizontalTabs',
    'baseUI/panelInputs/stepper',
    'baseUI/panelInputs/textInput',
    'baseUI/framework/uiConstants'
], function (React, _, horizontalTabs, stepper, textInput, uiConstants) {
    'use strict';
    function scopeColorAsHEX1(FORMATS) {
        var colorAsHEX = this.getColorAsHEX();
        return this.state.selectedFormat === FORMATS.HEX ? React.createElement('div', {
            'key': 'hexSection',
            'className': 'color-value-hex'
        }, React.createElement(textInput, {
            'validator': this.validateHexValue,
            'invalidMessage': 'ColorPicker_ColorSpace_HEXErrorTooltip',
            'value': colorAsHEX,
            'maxLength': 6,
            'onChange': this.handleHexChange,
            'onChangeInValidationStatus': this.props.onChangeInValidationStatus
        })) : null;
    }
    function scopeColorAsRGB2(FORMATS) {
        var colorAsRGB = this.getColorAsRGB();
        return this.state.selectedFormat === FORMATS.RGB ? React.createElement('div', { 'key': 'rgbSection' }, React.createElement('div', { 'className': 'color-value-item' }, React.createElement(stepper, {
            'min': 0,
            'max': 255,
            'value': colorAsRGB.red,
            'step': 1,
            'onChange': this.handleRedChange
        })), React.createElement('div', { 'className': 'color-value-item' }, React.createElement(stepper, {
            'min': 0,
            'max': 255,
            'value': colorAsRGB.green,
            'step': 1,
            'onChange': this.handleGreenChange
        })), React.createElement('div', { 'className': 'color-value-item' }, React.createElement(stepper, {
            'min': 0,
            'max': 255,
            'value': colorAsRGB.blue,
            'step': 1,
            'onChange': this.handleBlueChange
        }))) : null;
    }
    function scopeColorAsExactHSB3(FORMATS) {
        var colorAsExactHSB = this.getColorAsExactHSB();
        return this.state.selectedFormat === FORMATS.HSB ? React.createElement('div', { 'key': 'hsbSection' }, React.createElement('div', { 'className': 'color-value-item' }, React.createElement(stepper, {
            'min': 0,
            'max': 360,
            'units': '\xB0',
            'value': Math.round(colorAsExactHSB.hue),
            'step': 1,
            'onChange': this.handleHueChange
        })), React.createElement('div', { 'className': 'color-value-item' }, React.createElement(stepper, {
            'min': 0,
            'max': 100,
            'units': '%',
            'value': Math.round(colorAsExactHSB.saturation),
            'step': 1,
            'onChange': this.handleSaturationChange
        })), React.createElement('div', { 'className': 'color-value-item' }, React.createElement(stepper, {
            'min': 0,
            'max': 100,
            'units': '%',
            'value': Math.round(colorAsExactHSB.brightness),
            'step': 1,
            'onChange': this.handleBrightnessChange
        }))) : null;
    }
    function scopeFORMATS4() {
        var FORMATS = uiConstants.COLOR_FORMATS;
        return React.createElement('div', { 'className': 'color-format' }, React.createElement(horizontalTabs, {
            'options': this.getFormatOptions(),
            'valueLink': this.linkState('selectedFormat'),
            'className': 'arrowed'
        }), React.createElement('div', { 'className': 'color-values-wrapper' }, scopeColorAsHEX1.apply(this, [FORMATS]), scopeColorAsRGB2.apply(this, [FORMATS]), scopeColorAsExactHSB3.apply(this, [FORMATS])));
    }
    return function () {
        return scopeFORMATS4.apply(this, []);
    };
});