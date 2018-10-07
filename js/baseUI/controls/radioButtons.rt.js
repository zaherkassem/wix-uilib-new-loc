define([
    'react/addons',
    'lodash',
    'baseUI/controls/infoIcon'
], function (React, _, infoIcon) {
    'use strict';
    function onChange1(selectedValue, option, optionIndex) {
        this.handleChange(option.value, option.type);
    }
    function repeatOption2(selectedValue, option, optionIndex) {
        return React.createElement('label', {
            'className': option.className,
            'onMouseOver': this.onMouseOver,
            'key': 'option-' + option.value
        }, React.createElement('input', {
            'type': 'radio',
            'name': this.getRadioGroupId(),
            'value': option.value,
            'disabled': this.props.disabled,
            'checked': option.value === selectedValue,
            'onChange': onChange1.bind(this, selectedValue, option, optionIndex)
        }), React.createElement('span', {}), 
        	option.infoText ? React.createElement('span' , {
        			'className': 'option-info',
        		},
        		React.createElement( infoIcon, {
                	'key': 'optionInfoIcon',
                	'text': option.infoText,
                	'title': option.infoTitle
            	})
            ) : null,
        	React.createElement('span', { 'onClick': this.onClick }, this.translateIfNeeded(option.label))
        );
    }
    function scopeSelectedValue3() {
        var selectedValue = this.getValueFromProps(this.props);
        return _.map(this.props.options, repeatOption2.bind(this, selectedValue));
    }
    return function () {
        return React.createElement.apply(this, [
            'div',
            { 'className': 'control-radio-buttons' + (this.props.disabled ? ' disabled' : '') },
            this.props.infoText ? React.createElement(infoIcon, {
                'key': 'infoIcon',
                'text': this.props.infoText,
                'title': this.props.infoTitle
            }) : null,
            this.props.label ? React.createElement('div', { 'key': 'label' }, this.translateIfNeeded(this.props.label)) : null,
            scopeSelectedValue3.apply(this, [])
        ]);
    };
});