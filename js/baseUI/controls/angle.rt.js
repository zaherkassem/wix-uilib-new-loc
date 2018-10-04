define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/stepper'
], function (React, _, stepper) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'control-angle' }, React.createElement('label', { 'className': _.keys(_.pickBy({ disabled: this.props.disabled }, _.identity)).join(' ') }, this.translate(this.props.label)), React.createElement('div', {
            'className': _.keys(_.pickBy({
                circle: true,
                disabled: this.props.disabled
            }, _.identity)).join(' '),
            'style': this.getCircleStyle()
        }, React.createElement('div', { 'className': 'circle-center' }), React.createElement('div', {
            'className': 'knob',
            'style': this.getKnobStyle(),
            'onMouseDown': this.onKnobMouseDown
        })), React.createElement(stepper, {
            'disabled': this.props.disabled,
            'units': '\xB0',
            'value': this.getValueFromProps(),
            'onChange': this.callOnChangeIfExists,
            'onBlur': this.reportChangeFromUser,
            'min': -1,
            'max': 360,
            'step': 1
        }));
    };
});