define([
    'react-dom',
    'lodash',
    'jquery',
    'react',
    'util',
    'baseUI/mixins/inputFocusMixin',
    'baseUI/panelInputs/inputMixin',
    'baseUI/panelInputs/inputValidationMixin',
    'baseUI/popovers/tooltipManager',
    'baseUI/panelInputs/textInputCommon.rt'
], function(
    ReactDOM,
    _,
    $,
    React,
    util,
    inputFocusMixin,
    inputMixin,
    inputValidationMixin,
    tooltipManager,
    template) {
    'use strict';

    var SUCCESS_DURATION = 1000;
    var TEXT_INPUT_TOOLTIP_ERROR = 'text-input-sync-validation-error-';
    var KEYS = {
        ESC: 27,
        ENTER: 13
    };

    return React.createClass({
        displayName: 'textInputSync',
        mixins: [React.addons.LinkedStateMixin, inputFocusMixin, inputMixin, inputValidationMixin, util.translationMixin, util.blockOuterScrollMixin],
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
        getInitialState: function () {
            var value = this.getInitialValue();
            //todo Shimi_Liderman 7/6/15 20:55 should validate initial value? if not valid what is the initial lastValidValue?
            this.lastValidValue = value;
            return {
                value: value,
                isFocused: false
            };
        },
        getInitialValue: function () {
            var valueFromProps = this.getValueFromProps();
            return valueFromProps ? valueFromProps : this.translateIfNeeded(this.props.defaultText) || '';
        },
        getWrapperClasses: function () {
            var isValid = this.isValid(this.state.value);
            var classes = {
                'control-text-input': true,
                'success': isValid && this.shouldDisplaySuccessIndicator,
                'error': !isValid,
                'instant-error': !isValid,
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
            return value !== this.valueOnFocus;
        },
        scrollInputToTopIfNeeded: function () {
            if (this.props.isMultiLine) {
                ReactDOM.findDOMNode(this.refs.input).scrollTop = 0;
            }
        },
        componentWillReceiveProps: function (nextProps) {
            var nextValue = this.getValueFromProps(nextProps);
            if (nextValue !== this.getValueFromProps() && nextValue !== this.state.value && this.isValid(nextValue)) {
                this.setState({value: nextValue});
                this.lastValidValue = nextValue;
                this.valueOnFocus = nextValue;
            }
        },
        componentWillUpdate: function (nextProps, nextState) {
            var self = this;
            if (shouldDisplaySuccessIndicator()) {
                this.shouldDisplaySuccessIndicator = true;
                setTimeout(hideSuccessIndicator, SUCCESS_DURATION);
            }

            function shouldDisplaySuccessIndicator() {
                return !nextState.isFocused && self.state.isFocused && self.hasValueBeenChangedByUser(nextState.value) && self.isValid(nextState.value);
            }

            function hideSuccessIndicator() {
                if (self.isMounted()) {
                    self.shouldDisplaySuccessIndicator = false;
                    self.forceUpdate();
                }
            }
        },
        componentDidUpdate: function (prevProps, prevState) {
            var hasGainedFocus = !prevState.isFocused && this.state.isFocused;
            var hasLostFocus = prevState.isFocused && !this.state.isFocused;

            this.handleAutoFocusIfNeeded(prevProps);

            if (hasGainedFocus) {
                this.selectContent();
                this.valueOnFocus = this.lastValidValue;
            } else if (hasLostFocus) {
                this.scrollInputToTopIfNeeded();
            }

            var value = this.state.value;
            if (prevState.value !== value) {
                var isValid = this.isValid(value);
                if (isValid) {
                    this.lastValidValue = value;
                    if (value !== this.getValueFromProps()) {
                        // value was not changed as a result of a new value passed in props
                        this.callOnChangeIfExists(value);
                    }
                    tooltipManager.hide(this.getTooltipId());
                } else {
                    tooltipManager.show(this.getTooltipId());
                }

                if (this.props.onChangeInValidationStatus) {
                    this.props.onChangeInValidationStatus(isValid);
                }
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
            this.lastValidValue = this.valueOnFocus;
            this.setState({value: this.valueOnFocus}, function () {
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
