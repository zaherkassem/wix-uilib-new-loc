define(['react-dom', 'react/addons', 'lodash', 'util'], function(ReactDOM, React, _, util) {
    'use strict';
    function onClick1() {
        ReactDOM.findDOMNode(this.refs.input).focus();
    }
    function onFocus2() {
        this.onFocus();
    }
    function onBlur3() {
        this.handleBlur();
    }
    return function () {
        return React.createElement('div', {
            'className': _.keys(_.pickBy(this.getWrapperClasses(), _.identity)).join(' '),
            'onClick': onClick1.bind(this)
        }, React.createElement('input', {
            'ref': 'input',
            'className': 'input',
            'type': 'text',
            'value': this.state.value,
            'disabled': !!this.props.disabled,
            'readOnly': !this.state.edited,
            'maxLength': '8',
            'step': this.props.step,
            'onChange': this.handleChange,
            'onKeyDown': this.handleKeyDown,
            'onFocus': onFocus2.bind(this),
            'onBlur': onBlur3.bind(this)
        }), this.props.units ? React.createElement('span', {
            'className': 'units',
            'key': 'units'
        }, this.props.units) : null);
    };
});