define([
    'react/addons',
    'lodash',
    'baseUI/popovers/tooltip'
], function (React, _, tooltip) {
    'use strict';
    function onChange1(e) {
        this.onMandatoryFieldChecked(e);
    }
    return function () {
        return React.createElement(tooltip, {
            'disabled': !this.props.forceDisable && !!this.props.disabled,
            'value': this.state.mandatoryTooltip
        }, React.createElement('label', { 'className': this.getClassName('control-mandatory') }, React.createElement('input', {
            'type': 'checkbox',
            'checked': this.getValueFromProps(this.props),
            'disabled': !!this.props.disabled,
            'onChange': onChange1.bind(this)
        }), React.createElement('span', {})));
    };
});