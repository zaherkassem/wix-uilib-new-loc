define([
    'react/addons',
    'lodash',
    'baseUI'
], function (React, _, UI) {
    'use strict';
    function onChange1(value) {
        this.selectionChange(value);
    }
    return function () {
        return React.createElement('div', { 'className': 'control-line-height' }, this.props.infoText || this.props.infoTitle ? React.createElement(UI.infoIcon, {
            'key': 'lineHeightInfo',
            'title': this.props.infoTitle,
            'text': this.props.infoText
        }) : null, React.createElement(UI.radioButtons, {
            'value': this.getSelectedOption(),
            'label': 'text_editor_line_spacing_label',
            'onChange': onChange1.bind(this),
            'options': this.props.options
        }), React.createElement('div', { 'style': { display: _.isNumber(this.state.value) ? 'block' : 'none' } }, React.createElement(UI.slider, {
            'value': this.props.value,
            'min': 0.5,
            'max': 3,
            'stepperMax': 9,
            'step': 0.1,
            'onChange': this.handleSliderChange,
            'onSlideEnd': this.props.onSlideEnd
        })));
    };
});