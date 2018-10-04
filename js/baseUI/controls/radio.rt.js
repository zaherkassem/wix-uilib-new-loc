define([
    'react/addons',
    'lodash',
    'symbols',
    'util',
    'baseUI/popovers/tooltip'
], function (React, _, symbols, util, tooltip) {
    'use strict';
    return function () {
        return React.createElement(tooltip, {
            'ref': 'tooltip',
            'value': this.props.label,
            'disabled': !(this.props.label && this.props.ellipsis && this.isEllipsisActive()),
            'shouldTranslate': true
        }, React.createElement('label', {
            'className': 'radio-control ' + this.getClassName('control-' + this.props.name),
            'key': this.props.name
        }, React.createElement('input', {
            'className': 'input-' + this.props.name,
            'type': 'radio',
            'name': this.props.group,
            'checked': this.getValueFromProps(this.props),
            'disabled': !!this.props.disabled,
            'onChange': this.props.onChange
        }), this.props.radioType === 'symbol' ? React.createElement(symbols.symbol, {
            'key': 'radio-symbol',
            'name': this.props.name
        }) : null, this.props.radioType === 'class' ? React.createElement('div', {
            'className': 'class-' + this.props.name,
            'key': 'radio-class'
        }) : null, this.props.radioType === 'image' ? React.createElement('img', {
            'src': this.props.name,
            'key': 'radio-image'
        }) : null, this.props.label ? React.createElement('span', {
            'ref': 'label',
            'className': 'label label-' + this.props.name,
            'key': 'radio-label'
        }, util.translate(this.props.label)) : null));
    };
});