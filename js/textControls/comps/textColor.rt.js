define([
    'react/addons',
    'lodash',
    'textControls/comps/colorDrop',
    'textControls/comps/iconButton'
], function (React, _, colorDrop, iconButton) {
    'use strict';
    return function () {
        return React.createElement('span', {}, React.createElement(iconButton, {
            'onClick': this.props.onClick,
            'tooltipValue': this.props.tooltipValue,
            'tooltipStyleType': this.props.tooltipStyleType
        }, React.createElement(colorDrop, {
            'isBackColor': this.props.isBackColor,
            'fill': this.props.value
        })));
    };
});