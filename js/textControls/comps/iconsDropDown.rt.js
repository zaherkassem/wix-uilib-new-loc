define([
    'react/addons',
    'lodash',
    'baseUI'
], function (React, _, UI) {
    'use strict';
    function repeatItem1(item, itemIndex) {
        return React.createElement(UI.dropDown.option, {
            'value': item,
            'className': 'icons-dd-option',
            'key': itemIndex
        }, React.createElement(UI.symbol, { 'name': itemIndex }));
    }
    return function () {
        return React.createElement(UI.tooltip, {
            'value': this.props.tooltipValue,
            'disabled': !this.props.tooltipValue,
            'styleType': this.props.tooltipStyleType
        }, React.createElement('div', {
            'style': {
                display: 'inline-block',
                verticalAlign: 'middle'
            }
        }, React.createElement.apply(this, [
            UI.dropDown.select,
            {
                'ref': 'dropdown',
                'autotranslate': false,
                'value': this.props.value,
                'onChange': this.props.onChange,
                'className': 'icons-dd ' + this.props.className,
                'optionsWidth': 56,
                'template': this.props.fixedIconName ? this.getFixedIcon : undefined,
                'doNotFocus': this.props.doNotFocus
            },
            _.map(this.props.items, repeatItem1.bind(this))
        ])));
    };
});