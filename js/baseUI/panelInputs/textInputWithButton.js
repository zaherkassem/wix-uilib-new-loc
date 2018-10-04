define(['react',
    'lodash',
    'util',
    'baseUI/panelInputs/statefulInputMixin',
    'baseUI/panelInputs/textInputWithButton.rt'], function (React, _, util, statefulInputMixin, template) {
    'use strict';

    return React.createClass({
        mixins: [statefulInputMixin, util.translationMixin],
        displayName: 'textInputWithButton',
        propTypes: {
            label: React.PropTypes.string,
            placeholder: React.PropTypes.string,
            defaultText: React.PropTypes.string,
            multiLine: React.PropTypes.bool,
            buttonLabel: React.PropTypes.string,
            maxLength: React.PropTypes.number,
            focus: React.PropTypes.bool,
            processValue: React.PropTypes.func,
            infoText: React.PropTypes.string,
            infoTitle: React.PropTypes.string,
            fixedButton: React.PropTypes.bool
        },
        getInitialState: function () {
            return {
                isFocused: false
            };
        },
        updateValue: function (value, validationResult) {
            this.callOnChangeIfExists(value, validationResult);
        },
        toggleFocus: function (isFocused) {
            this.setState({isFocused: isFocused});
        },
        shouldShowButton: function () {
            return this.props.buttonLabel && (this.props.fixedButton || this.state.isFocused);
        },
        render: template
    });
});