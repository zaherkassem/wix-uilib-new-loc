define([
    'react',
    'lodash',
    'baseUI/panelInputs/multiValueLinksMixin',
    'baseUI/panelInputs/selectiveTextInputWithMandatoryButton.rt',
    'util'
], function (React, _, multiValueLinksMixin, template, util) {
    'use strict';

    return React.createClass({
        displayName: 'selectiveTextInputWithMandatoryButton',
        mixins: [util.translationMixin, multiValueLinksMixin, React.addons.LinkedStateMixin],
        propTypes: {
            placeholder: React.PropTypes.string,
            // TODO: add validation for these links to be valid "valueLinks"
            enabledLink: React.PropTypes.any,
            fieldNameLink: React.PropTypes.any,
            requiredLink: React.PropTypes.any
        },

        getInitialState: function () {
            return {
                enabled: this.props.alwaysEnabledAndRequired ||
                    this.getFieldValueFromProps(this.props, 'enabled') ||
                    this.props.defaultEnabled,
                required: this.props.alwaysEnabledAndRequired ||
                    this.getFieldValueFromProps(this.props, 'required') ||
                    this.props.defaultRequired,
                fieldName: this.getFieldValueFromProps(this.props, 'fieldName') ||
                    this.translateIfNeeded(this.props.defaultFieldName)
            };
        },

        render: template,

        enabledChanged: function () {
            var newVal = !this.state.enabled;
            this.setState({
                enabled: newVal
            });
            this.callOnFieldChangeIfExists('enabled', newVal);
        },

        requiredChanged: function () {
            var newVal = !this.state.required;
            this.setState({
                required: newVal
            });
            this.callOnFieldChangeIfExists('required', newVal);
        },

        fieldNameChanged: function (newVal) {
            this.setState({
                fieldName: newVal
            });
            this.callOnFieldChangeIfExists('fieldName', newVal);
        }
    });
});
