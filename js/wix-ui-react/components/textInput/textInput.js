define([
    'react',
    'lodash',
    'baseUI/panelInputs/textInputSync',
    'baseUI/panelInputs/textInputAsync',
'wix-ui-react/components/textInput/textInput.rt'
], function (
    React,
    _,
    textInputSync,
    textInputAsync,
    template
) {
    'use strict';

    return React.createClass({
        displayName: 'textInput',
        propTypes: {
            title: React.PropTypes.string,
            type: React.PropTypes.string,
            placeholder: React.PropTypes.string,
            defaultText: React.PropTypes.string,
            maxLength: React.PropTypes.number,
            className: React.PropTypes.string,
            isMultiLine: React.PropTypes.bool,
            infoText: React.PropTypes.string,
            infoTitle: React.PropTypes.string,
            onChangeInValidationStatus: React.PropTypes.func,
            validateOnBlurOnly: React.PropTypes.bool
        },
        getInputComponent: function () {
            if (this.props.validateOnBlurOnly) {
                return textInputAsync;
            }
            return textInputSync;
        },
        getPropsForInputComponent: function () {
            var props = _.clone(this.props);
            props.label = props.title;
            props.textAreaClass = 'textarea';
            return props;
        },
        isValueValid: function () {
            return this.refs.inputComp.isValid();
        },
        focus: function () {
            this.refs.inputComp.focus();
        },
        getValue: function() {
            return this.refs.inputComp.lastValidValue;
        },
        setValue: function(newValue) {
            this.refs.inputComp.setState({
                value: newValue
            });
        },
        render: template
    });
});
