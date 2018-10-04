define([
    'react-dom',
    'lodash',
    'jquery',
    'react',
    'util',
    'baseUI/panelInputs/inputMixin',
    'baseUI/panelInputs/normalizeNumber',
    'baseUI/panelInputs/stepper.rt'
], function(ReactDOM, _, $, React, util, inputMixin, normalizeNumber, template) {
    'use strict';

    var DOWN = 40;
    var UP = 38;
    var ENTER = 13;
    var ESC = 27;

    var stepper = React.createClass({

        displayName: 'stepper',
        mixins: [inputMixin],
        propTypes: {
            min: React.PropTypes.number,
            max: React.PropTypes.number,
            step: React.PropTypes.number,
            units: React.PropTypes.string
        },

        getDefaultProps: function () {
            return {
                max: 100,
                min: 0,
                step: 1,
                units: ''
            };
        },

        getInitialState: function () {
            var value = this.getValueFromProps();
            return {
                value: normalizeNumber((value !== undefined ? Number(value) : 0), this.props.min, this.props.max, this.props.step),
                edited: false
            };
        },
        handleKeyDown: function (e) {
            var keyCode = e.keyCode;
            if (keyCode === ENTER) {
                e.preventDefault();
                ReactDOM.findDOMNode(this.refs.input).blur();
            }
            if (keyCode === ESC) {
                e.preventDefault();
                this.handleCancel();
            }
            if (keyCode === UP) {
                e.preventDefault();
                this.changeValueByStep(true);
            }
            if (keyCode === DOWN) {
                e.preventDefault();
                this.changeValueByStep(false);
            }

        },

        getWrapperClasses: function () {

            var classes = {
                'input-stepper': true,
                'disabled': this.isDisabled(),
                'edited': this.state.edited,
                'has-units': this.props.units
            };

            if (this.props.className) {
                classes[this.props.className] = true;
            }

            return classes;
        },
        changeValueByStep: function (isIncrease) {

            var newVal = (isIncrease) ? parseFloat(this.state.value) + this.props.step : this.state.value - this.props.step;
            newVal = normalizeNumber(newVal, this.props.min, this.props.max, this.props.step);
            this.acceptChanges(newVal);
        },

        isTemporaryValue: function (value) {
            var temporaryValue = ['.', '-'];
            return _.includes(temporaryValue, value);
        },

        handleChange: function (e) {

            var enteredValue = e.target.value;

            if (!/^-?[0-9]*(\.[0-9]*)?$/.test(enteredValue)) {
                return;
            }

            this.setState({value: enteredValue});

        },
        handleCancel: function () {
            var latestValue = this.getValueFromProps();
            var self = this;
            this.setState({value: latestValue}, function () {
                ReactDOM.findDOMNode(self.refs.input).blur();
            });
        },

        handleBlur: function () {
            this.setState({edited: false});
            if (this.props.disabled) {
                return;
            }

            var newVal = normalizeNumber(this.state.value, this.props.min, this.props.max, this.props.step);
            if (!this.isTemporaryValue(this.state.value)) {
                this.acceptChanges(newVal);
            } else {
                this.acceptChanges(this.getValueFromProps());
            }
        },
        getStepperValue: function (props) {
            var value = this.getValueFromProps(props);
            if (!_.isUndefined(value)) {
                return parseFloat(value);
            }
            return value;
        },
        componentWillReceiveProps: function (nextProps) {
            var valueFromProps = this.getStepperValue(nextProps);
            if (valueFromProps !== this.state.value) {
                var newVal = normalizeNumber(
                    valueFromProps,
                    isNaN(nextProps.min) ? this.props.min : nextProps.min,
                    nextProps.max || this.props.max,
                    nextProps.step || this.props.step);
                this.setState({value: newVal});
            }
        },

        onFocus: function () {
            var $input = $(ReactDOM.findDOMNode(this.refs.input));
            this.setState({edited: true}, function () {
                $input.select().one('mouseup', function (e) {
                    e.preventDefault();
                });
            });
        },
        acceptChanges: function (value) {
            this.setState({value: value});
            this.callOnChangeIfExists(value);
        },

        render: template
    });

    return stepper;
});
