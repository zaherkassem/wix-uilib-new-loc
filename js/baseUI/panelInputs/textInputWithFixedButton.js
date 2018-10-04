define([
    'react-dom',
    'react',
    'jquery',
    'lodash',
    'util',
    'baseUI/panelInputs/statefulInputMixin',
    'baseUI/panelInputs/inputValidationMixin',
    'baseUI/popovers/tooltipManager',
    'baseUI/panelInputs/textInputWithFixedButton.rt'
], function(
    ReactDOM,
    React,
    $,
    _,
    util,
    statefulInputMixin,
    inputValidationMixin,
    tooltipManager,
    template) {
    'use strict';

    return React.createClass({
        mixins: [statefulInputMixin, inputValidationMixin, util.translationMixin],
        displayName: 'textInputWithButton',
        propTypes: {
            buttonLabel: React.PropTypes.string.isRequired,
            defaultValue: React.PropTypes.string,
            maxLength: React.PropTypes.number,
            focus: React.PropTypes.bool,
            selectOnFocus: React.PropTypes.bool
        },

        uniqueTooltipId: '',

        getInitialState: function () {
            this.uniqueTooltipId = _.uniqueId();
            var value = this.getValueFromProps() || this.props.defaultValue;
            return {
                value: value,
                origValue: value,
                invalidMessage: '',
                showValidationIcon: true,
                isFocused: false
            };
        },

        setFocusState: function (isFocused) {
            var selectText = isFocused && this.props.selectOnFocus && function () {
                $('input', ReactDOM.findDOMNode(this)).select();
            };

            this.setState({isFocused: isFocused}, selectText);
        },

        handleChange: function (evt) {
            var value = evt.target.value;
            this.setState({value: value}, function () {
                if (!this.isValid()) {
                    tooltipManager.show(this.getTooltipId());
                } else {
                    tooltipManager.hide(this.getTooltipId());
                }
            }.bind(this));
        },

        handleClick: function () {
            if (this.isValid(this.state.value)) {
                this.callOnChangeIfExists(this.state.value);
                this.setFocusState(false);
            }
        },

        onKeyPress: function (e) {
            if (e.key === 'Enter') {
                this.handleClick();
            }
        },

        getTooltipId: function () {
            return 'text-input-with-button-validation-error' + this.uniqueTooltipId;
        },

        getTextInputNode: function () {
            // tooltip.getDOMNode will return input's DOM node, which is strange but it works
            // also not possible to set ref to children of tooltip
            return ReactDOM.findDOMNode(this.refs.tooltip);
        },

        focusControl: function () {
            this.setFocusState(true);
            this.getTextInputNode().select();
        },

        render: template
    });
});