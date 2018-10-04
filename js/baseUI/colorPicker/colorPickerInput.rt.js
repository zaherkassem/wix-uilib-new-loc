define([
    'react/addons',
    'lodash',
    'util'
], function (React, _, util) {
    'use strict';
    return function () {
        return React.createElement('div', {
            'onClick': this.openColorPicker,
            'className': this.getClassName('color-picker-input') + (this.props.label ? ' with-label' : '')
        }, this.props.label ? React.createElement('label', {
            'className': 'color-picker-label',
            'key': 'colorPickerLabel'
        }, util.translate(this.props.label)) : null, React.createElement('div', {
            'className': _.keys(_.pickBy({
                'color-picker-wrapper': true,
                disabled: this.props.disabled,
                colorPickerOpen: this.state.forceHighlight
            }, _.identity)).join(' ')
        }, React.createElement('div', {
            'className': 'color-picker-color',
            'style': {
                backgroundColor: this.resolveColor(),
                opacity: this.getOpacity()
            }
        })));
    };
});