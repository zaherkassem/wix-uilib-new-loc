define([
    'react/addons',
    'lodash',
    'baseUI/popovers/tooltip',
    'symbols',
    'baseUI/framework/uiConstants'
], function (React, _, tooltip, symbols, uiConstants) {
    'use strict';
    function onClick1(e) {
        this.onClick(e);
    }
    return function () {
        return React.createElement(tooltip, {
            'value': this.getTooltipValue(),
            'alignment': this.props.alignment,
            'width': this.props.tooltipWidth
        }, React.createElement('span', {
            'className': this.generateClassName('info-icon'),
            'onMouseEnter': this.handleMouseEnter,
            'onMouseLeave': this.handleMouseLeave
        }, React.createElement(symbols.symbol, {
            'name': this.props.symbolName,
            'onClick': onClick1.bind(this)
        })));
    };
});