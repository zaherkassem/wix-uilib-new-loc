define([
    'react/addons',
    'lodash',
    'textControls/comps/colorDrop',
    'textControls/comps/textColor',
    'textControls/utils/constants',
    'baseUI'
], function (React, _, colorDrop, textColor, constants, UI) {
    'use strict';
    function onClick1() {
        this.props.onClick();
    }
    function repeatItem2(item, itemIndex) {
        return React.createElement(UI.dropDown.option, {
            'value': item,
            'className': 'icons-dd-option',
            'key': itemIndex
        }, React.createElement(UI.symbol, { 'name': itemIndex }));
    }
    return function () {
        return React.createElement('span', {}, !this.shouldRenderDropOwn() ? React.createElement(textColor, {
            'onClick': onClick1.bind(this),
            'tooltipValue': this.props.tooltipValue,
            'key': 'backColorButton',
            'tooltipStyleType': this.props.tooltipStyleType,
            'isBackColor': true,
            'value': this.props.color
        }) : null, this.shouldRenderDropOwn() ? React.createElement(UI.tooltip, {
            'value': this.props.tooltipValue,
            'styleType': this.props.tooltipStyleType,
            'key': 'backColorDropdown'
        }, React.createElement('span', {}, React.createElement.apply(this, [
            UI.dropDown.select,
            {
                'ref': 'dropdown',
                'autotranslate': false,
                'value': this.getDropDownValue(),
                'onChange': this.handleChange,
                'className': 'back-color-dd',
                'optionsWidth': 40,
                'toggleIcon': false,
                'template': this.getTemplate,
                'setSelectedAnyway': true,
                'doNotFocus': this.props.doNotFocus
            },
            _.map(constants.TEXT_BACK_COLOR_TYPES, repeatItem2.bind(this)),
            this.props.colorDrop ? React.createElement(UI.dropDown.option, {
                'key': 'colorDropOption',
                'value': 'customColor',
                'className': 'icons-dd-option'
            }, React.createElement(colorDrop, {
                'colorDropOnly': true,
                'fill': this.props.color
            })) : null
        ]))) : null);
    };
});