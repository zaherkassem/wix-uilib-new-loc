define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/stepper',
    'baseUI/controls/infoIcon'
], function (React, _, stepper, infoIcon) {
    'use strict';
    return function () {
        return React.createElement('div', _.assign({}, {
            'className': _.keys(_.pickBy({
                'input-slider': true,
                'has-label': this.hasLabel(),
                disabled: this.isDisabled()
            }, _.identity)).join(' ')
        }, this.getTopLevelProps()), React.createElement('label', { 'className': 'label' }, this.translateIfNeeded(this.getLabel())), this.hasLabel() && (this.props.infoText || this.props.infoText) ? React.createElement(infoIcon, {
            'key': 'tooltip',
            'title': this.props.infoTitle,
            'text': this.props.infoText,
            'size': 18
        }) : null, React.createElement('div', { 'className': 'clearfix sliderArea' }, React.createElement('div', { 'className': 'sliderContainer' }, React.createElement(stepper, {
            'className': _.keys(_.pickBy({ 'small': this.props.isSmallStepper }, _.identity)).join(' '),
            'disabled': this.props.disabled,
            'min': this.getStepperMin(),
            'max': this.getStepperMax(),
            'value': this.state.value,
            'units': this.props.units,
            'step': this.props.step,
            'onChange': this.handleStepperChange
        }), React.createElement('div', {
            'className': 'slider',
            'ref': 'slider',
            'onMouseDown': this.mouseDown
        }, React.createElement('div', { 'className': 'line' }), React.createElement('div', { 'className': 'knobContainer' }, React.createElement('div', {
            'className': 'coloredLine',
            'style': { width: 'calc(' + (this.getValueInPercent() + '% + 3px') + ')' }
        }), React.createElement('div', {
            'className': 'sliderKnob',
            'style': { left: 'calc(' + (this.getValueInPercent() + '%') + ')' }
        }))))));
    };
});