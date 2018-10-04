define([
    'react/addons',
    'lodash'
], function (React, _) {
    'use strict';
    function onClick1(selectedColor, option, optionIndex) {
        this.brightnessOptionSelected(optionIndex);
    }
    function repeatOption2(selectedColor, option, optionIndex) {
        return React.createElement('div', {
            'key': 'brightnessOption-' + optionIndex,
            'className': 'option',
            'style': { backgroundColor: 'rgb(' + option.red + ', ' + option.green + ', ' + option.blue + ')' },
            'onClick': onClick1.bind(this, selectedColor, option, optionIndex)
        });
    }
    function scopeSelectedColor3() {
        var selectedColor = this.getSelectedColor();
        return React.createElement('div', { 'className': 'colorSpace' }, React.createElement('div', { 'className': 'top-section' }, React.createElement('div', {
            'ref': 'colorSpace',
            'className': 'select-area',
            'onMouseDown': this.selectAreaClicked
        }, React.createElement('div', {
            'className': 'selector-layer',
            'style': { backgroundColor: 'hsl(' + selectedColor.hue + ', 100%, 50%)' }
        }), React.createElement('div', { 'className': 'selector-layer saturation-layer' }), React.createElement('div', { 'className': 'selector-layer brightness-layer' }), React.createElement('div', {
            'className': 'color-indicator ' + (selectedColor.brightness > 60 ? 'bright-background' : 'dark-background'),
            'style': this.getIndicatorStyle()
        })), React.createElement.apply(this, [
            'div',
            { 'className': 'brightness-options' },
            _.map(this.getBrightnessOptions(), repeatOption2.bind(this, selectedColor))
        ])), React.createElement('div', {
            'className': 'hue-scale',
            'onMouseDown': this.hueScaleClicked
        }, React.createElement('div', {
            'className': 'hue-indicator ' + (this.state.hueIndicatorDrag ? 'hue-indicator-drag' : ''),
            'style': this.getHueIndicatorStyle()
        })));
    }
    return function () {
        return scopeSelectedColor3.apply(this, []);
    };
});