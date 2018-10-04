define(['react',
    'lodash',
    'baseUI/panelInputs/inputValidationMixin',
    'baseUI/panelInputs/inputValidationAsyncMixin',
    'baseUI/panelInputs/textInputSync',
    'baseUI/panelInputs/textInputAsync',
    'pLoader!santa:utils',
    'baseUI/panelInputs/textInput.rt'
], function (React, _, inputValidationMixin, inputValidationAsyncMixin, textInputSync, textInputAsync, santaUtils, template) {
    'use strict';

    var browserDetection = santaUtils.browserDetection;

    function getBrowserName() {
        if (typeof window !== 'undefined' && browserDetection) {
            var detectionData = browserDetection(window.navigator.userAgent);
            var browser = detectionData && detectionData.browser;

            if (browser) {
                if (browser.chrome) {
                    return 'chrome';
                } else if (browser.safari) {
                    return 'safari';
                } else if (browser.firefox) {
                    return 'firefox';
                } else if (browser.ie) {
                    return 'ie';
                }
            }
        }
    }

    return React.createClass({
        displayName: 'textInput',
        mixins: [inputValidationMixin, inputValidationAsyncMixin],
        propTypes: {
            label: React.PropTypes.string,
            type: React.PropTypes.string,
            placeholder: React.PropTypes.string,
            defaultText: React.PropTypes.string,
            maxLength: React.PropTypes.number,
            focus: React.PropTypes.bool,
            className: React.PropTypes.string,
            isMultiLine: React.PropTypes.bool,
            infoText: React.PropTypes.string,
            infoTitle: React.PropTypes.string,
            onChangeInValidationStatus: React.PropTypes.func,
            validateOnBlurOnly: React.PropTypes.bool
        },
        getInputComponent: function () {
            if (this.props.validateOnBlurOnly || this.hasAsyncValidator()) {
                return textInputAsync;
            }
            return textInputSync;
        },
        getPropsForInputComponent: function () {
            var props = _.clone(this.props);
            props.textAreaClass = 'textarea-' + getBrowserName();
            return props;
        },
        isValueValid: function () {
            return this.refs.inputComp.isValid();
        },
        focus: function () {
            this.refs.inputComp.focus();
        },
        render: template
    });
});
