define([
    'react/addons',
    'lodash',
    'symbols',
    'util',
    'baseUI/controls/infoIcon'
], function (React, _, symbols, util, infoIcon) {
    'use strict';
    function onChange1(e) {
        this.handleChange(e);
    }
    return function () {
        return React.createElement('label', {
            'className': _.keys(_.pickBy(this.getClasses(), _.identity)).join(' '),
            'disabled': !!this.props.disabled
        }, React.createElement('input', {
            'className': 'input-' + this.props.name,
            'type': 'checkbox',
            'checked': this.getValueFromProps(this.props),
            'disabled': !!this.props.disabled,
            'data-indeterminate': !!this.props.indeterminate,
            'onChange': onChange1.bind(this)
        }), this.props.label && !this.props.labelAfterSymbol ? React.createElement('span', {
            'key': 'labelBefore',
            'className': 'label label-' + this.props.name
        }, this.translateIfNeeded(this.props.label)) : null, React.createElement(symbols.symbol, { 'name': this.props.name }), this.props.label && this.props.labelAfterSymbol ? React.createElement('span', {
            'key': 'labelAfter',
            'className': 'label label-' + this.props.name
        }, this.translateIfNeeded(this.props.label)) : null, this.props.shouldDisplayInfoIcon || this.props.infoText || this.props.infoTitle ? React.createElement(infoIcon, {
            'className': 'info-' + this.props.name,
            'key': 'infoIcon',
            'title': this.props.infoTitle,
            'text': this.props.infoText,
            'alignment': this.props.infoAlignment,
            'fitToBounds': this.props.infoFitToBounds
        }) : null);
    };
});