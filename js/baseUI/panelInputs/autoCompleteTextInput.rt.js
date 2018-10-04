define([
    'react/addons',
    'lodash',
    'baseUI/controls/button'
], function (React, _, buttonControl) {
    'use strict';
    return function () {
        return React.createElement('div', this.getContainerProps(), React.createElement('input', {
            'ref': 'input',
            'type': 'text',
            'value': this.state.value,
            'placeholder': this.props.placeholder,
            'onKeyDown': this.onKeyDown,
            'onChange': this.onChange
        }), this.state.value ? React.createElement(buttonControl, {
            'key': 'cancel',
            'icon': this.props.cancelIcon,
            'onClick': this.onClickCancel
        }) : null);
    };
});