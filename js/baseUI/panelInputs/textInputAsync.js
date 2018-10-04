define([
    'react-dom',
    'lodash',
    'jquery',
    'react',
    'util',
    'baseUI/panelInputs/inputMixin',
    'baseUI/mixins/inputFocusMixin',
    'baseUI/panelInputs/inputValidationMixin',
    'baseUI/panelInputs/inputValidationAsyncMixin',
    'baseUI/popovers/tooltipManager',
    'baseUI/panelInputs/textInputCommon.rt'
], function(
    ReactDOM,
    _,
    $,
    React,
    util,
    inputMixin,
    inputFocusMixin,
    inputValidationMixin,
    inputValidationAsyncMixin,
    tooltipManager,
    template) {
    'use strict';

    var SUCCESS_DURATION = 1000;
    var TEXT_INPUT_TOOLTIP_ERROR = 'text-input-async-validation-error-';
    var KEYS = {
        ESC: 27,
        ENTER: 13
    };

    return React.createClass({
        displayName: 'textInputAsync',
        mixins: [React.addons.LinkedStateMixin, inputMixin, inputFocusMixin, inputValidationMixin, inputValidationAsyncMixin, util.translationMixin, util.blockOuterScrollMixin],
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
            textAreaClass: React.PropTypes.string
        },
        ValidationStatus: {
            NONE: 'none',
            SUCCESS: 'success',
            ERROR: 'error'
        },
        getInitialState: function () {
            var value = this.getInitialValue();
            //todo Shimi_Liderman 7/6/15 20:55 should validate initial value? if not valid what is the initial lastValidValue?
            this.lastValidValue = value;
            return {
                value: value,
                validationStatus: this.ValidationStatus.NONE,
                isFocused: false
            };
        },
        getInitialValue: function () {
            var valueFromProps = this.getValueFromProps();
            return valueFromProps ? valueFromProps : this.translateIfNeeded(this.props.defaultText) || '';
        },
        getWrapperClasses: function () {
            var classes = {
                'control-text-input': true,
                'success': this.state.validationStatus === this.ValidationStatus.SUCCESS,
                'error': this.state.validationStatus === this.ValidationStatus.ERROR,
                'is-disabled': this.isDisabled(),
                'focused': this.state.isFocused,
                'has-label': this.props.label
            };

            if (this.props.className) {
                classes[this.props.className] = true;
            }

            return classes;
        },
        getInputElementClass: function () {
            return this.props.isMultiLine ? 'textarea' : 'input';
        },
        getTooltipId: function () {
            if (!this.uniqueTooltipId) {
                this.uniqueTooltipId = TEXT_INPUT_TOOLTIP_ERROR + _.uniqueId();
            }

            return this.uniqueTooltipId;
        },
        hasValueBeenChangedByUser: function (value) {
            return value !== this.lastValidValue;
        },
        onValidationSuccess: function (value, result) {
            if (this.isMounted()) {
                this.successResultObject = result;
                this.setState({validationStatus: this.ValidationStatus.SUCCESS});
            } else {
                this.callOnChangeIfExists(value, this.successResultObject);
            }
        },
        onValidationFailure: function () {
            if (this.isMounted()) {
                this.setState({validationStatus: this.ValidationStatus.ERROR});
            }
        },
        validate: function (value, onSuccess, onFailure) {
            if (this.isValid(value)) {
                this.isAsyncValid(value, onSuccess, onFailure);
            } else {
                onFailure(this.getInvalidMessage());
            }
        },
        hideSuccessIndicator: function () {
            if (this.isMounted()) {
                this.setState({validationStatus: this.ValidationStatus.NONE});
            }
        },
        onValueValid: function (value) {
            setTimeout(this.hideSuccessIndicator, SUCCESS_DURATION);
            tooltipManager.hide(this.getTooltipId());
            this.lastValidValue = value;
            this.callOnChangeIfExists(value, this.successResultObject);
        },
        toggleErrorTooltip: function () {
            var isFocused = this.state.isFocused;
            var validationStatus = this.state.validationStatus;
            var tooltipId = this.getTooltipId();

            if (!isFocused && validationStatus === this.ValidationStatus.ERROR) {
                tooltipManager.show(tooltipId);
            } else {
                tooltipManager.hide(tooltipId);
            }
        },
        scrollInputToTopIfNeeded: function () {
            if (this.props.isMultiLine) {
                ReactDOM.findDOMNode(this.refs.input).scrollTop = 0;
            }
        },
        componentWillReceiveProps: function (nextProps) {
            var nextValue = this.getValueFromProps(nextProps);
            if (nextValue !== this.getValueFromProps() && nextValue !== this.state.value) {
                this.lastValidValue = nextValue;
                this.setState({value: nextValue});
            }
        },
        componentDidUpdate: function (prevProps, prevState) {
            var value = this.state.value;
            var validationStatus = this.state.validationStatus;
            var hasGainedFocus = !prevState.isFocused && this.state.isFocused;
            var hasLostFocus = prevState.isFocused && !this.state.isFocused;
            var hasValidationStatusChanged = prevState.validationStatus !== validationStatus;

            this.handleAutoFocusIfNeeded(prevProps);

            this.toggleErrorTooltip();

            if (hasGainedFocus) {
                this.selectContent();
            } else if (hasLostFocus) {
                this.scrollInputToTopIfNeeded();
                if (this.hasValueBeenChangedByUser(value)) {
                    this.validate(value, this.onValidationSuccess.bind(this, value), this.onValidationFailure);
                }
            }

            if (hasValidationStatusChanged && validationStatus === this.ValidationStatus.SUCCESS) {
                this.onValueValid(value);
            }
        },
        selectContent: function () {
            var $input = $(ReactDOM.findDOMNode(this.refs.input));
            $input.select().one('mouseup', function (e) {
                e.preventDefault();
            });
        },
        handleCancel: function () {
            var self = this;
            this.setState({value: this.lastValidValue, validationStatus: this.ValidationStatus.NONE}, function () {
                $(ReactDOM.findDOMNode(self.refs.input)).blur();
            });
        },
        handleKeyDown: function (evt) {
            var keyCode = evt.keyCode;
            switch (keyCode) {
                case KEYS.ESC: //esc
                    this.handleCancel();
                    break;
                case KEYS.ENTER: //enter
                    if (!this.props.isMultiLine) {
                        $(ReactDOM.findDOMNode(this.refs.input)).blur();
                    }
                    break;
            }
        },
        render: template
    });
});
