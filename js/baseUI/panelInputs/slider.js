define([
    'react-dom',
    'jquery',
    'lodash',
    'react',
    'baseUI/panelInputs/inputMixin',
    'util',
    'baseUI/panelInputs/normalizeNumber',
    'baseUI/mixins/reportUIChangeMixin',
    'baseUI/panelInputs/slider.rt'
],
    function(
        ReactDOM,
        $,
        _,
        React,
        inputMixin,
        util,
        normalizeNumber,
        reportUIChangeMixin,
        template) {
        'use strict';

        var sliderRadius = 8;

        /**
         * @property {number} min
         * @property {number} max
         * @property {number} step
         * @property {string} units
         * @property {string} defaultValue
         */

        var slider = React.createClass({
            displayName: 'slider',
            mixins: [inputMixin, util.translationMixin, reportUIChangeMixin],
            contextTypes: {
                reportUIChange: React.PropTypes.func
            },
            propTypes: {
                min: React.PropTypes.number,
                max: React.PropTypes.number,
                stepperMin: React.PropTypes.number,
                stepperMax: React.PropTypes.number,
                units: React.PropTypes.string,
                step: React.PropTypes.number,
                defaultValue: React.PropTypes.number,
                infoText: React.PropTypes.string,
                infoTitle: React.PropTypes.string,
                onSlideEnd: React.PropTypes.func,
                isSmallStepper: React.PropTypes.bool
            },

            getDefaultProps: function () {
                return {
                    max: 100,
                    min: 0,
                    step: 1,
                    units: '',
                    isSmallStepper: false
                };
            },

            getSliderValue: function(props){
                var value = this.getValueFromProps(props);
                if (!_.isUndefined(value)) {
                    return parseFloat(value);
                }
                return value;
            },
            getInitialState: function () {
                this.sliderX = 0;
                this.sliderWidth = 0;

                var value = this.getSliderValue();
                var defaultValue = this.props.defaultValue !== undefined ? Number(this.props.defaultValue) : this.props.min;
                var finalizedValue = _.isNumber(value) ? value : defaultValue;

                return {value: normalizeNumber(finalizedValue, this.props.min, this.props.max, this.props.step)};
            },
            /**
             * @param {number} val
             * @return {number}
             */
            getValueInPercent: function () {
                var value = this.state.value;
                if (this.state.value > this.props.max) {
                    value = this.props.max;
                } else if (this.state.value < this.props.min) {
                    value = this.props.min;
                }
                return Math.round((value - this.props.min) / (this.props.max - this.props.min) * 100);
            },
            /**
             * @param {number} percent
             * @return {*}
             */
            fromPercent: function (percent) {
                return this.props.min + ((this.props.max - this.props.min) * percent / 100);
            },
            calcPositionOnSlider: function (mouseX) {
                var percent = ((mouseX - this.sliderX) / this.sliderWidth) * 100;
                return Math.min(Math.max(percent, 0), 100);
            },

            calcNewValueFromKnob: function (mouseX) {
                var pos = this.calcPositionOnSlider(mouseX);
                var newVal = normalizeNumber(this.fromPercent(pos), this.props.min, this.props.max, this.props.step);
                return newVal;
            },

            handleKnobPositionChange: function (e) {
                var val = this.calcNewValueFromKnob(e.pageX - sliderRadius); // reducing sliderRadius is to compensate for slider width (so that mouse will be in the middle of knob)
                this.handleChange(val);
            },

            mouseUp: function () {
                var doc = $(document);
                $(document.body).removeClass('block-selection');
                doc.off('mousemove', this.handleKnobPositionChange);
                doc.off('mouseup', this.mouseUp);
                this.reportUIChange({value: this.state.value, value_change_origin: 'Slider'});
                if (this.props.onSlideEnd) {
                    this.props.onSlideEnd();
                }
            },

            mouseDown: function (e) {
                $(document.body).addClass('block-selection');
                var doc = $(document);
                doc.off('mousemove', this.handleKnobPositionChange);
                doc.off('mouseup', this.mouseUp);

                var sliderContainer = $(ReactDOM.findDOMNode(this.refs.slider));

                this.sliderX = sliderContainer.offset().left;
                this.sliderWidth = sliderContainer.width() - (2 * sliderRadius); // this compensates for slider size

                this.handleKnobPositionChange(e);

                doc.on('mousemove', this.handleKnobPositionChange);
                doc.on('mouseup', this.mouseUp);
            },

            handleChange: function (newVal, handleStepperChange) {
                if (this.state.value !== newVal) {
                    this.setState({value: newVal}, function () {
                        if (this.props.handleStepperChange && handleStepperChange) {
                            this.props.handleStepperChange();
                        }
                    }.bind(this));
                    this.callOnChangeIfExists(newVal);
                }
            },

            handleStepperChange: function (newVal) {
                newVal = normalizeNumber(newVal, this.getStepperMin(), this.getStepperMax(), this.props.step);
                this.handleChange(newVal, true);
                this.reportUIChange({value: newVal, value_change_origin: 'Input'});

            },

            getStepperMax: function (optionalProps) {
                var stepperMax;

                if (optionalProps) {
                    stepperMax = optionalProps.stepperMax || optionalProps.max;
                }

                if (!stepperMax) {
                    stepperMax = this.props.stepperMax || this.props.max;
                }

                return stepperMax;
            },

            getStepperMin: function (optionalProps) {
                var stepperMin;

                if (optionalProps) {
                    stepperMin = optionalProps.stepperMin;
                    if (isNaN(stepperMin)) {
                        stepperMin = optionalProps.min;
                    }
                }

                if (isNaN(stepperMin)) {
                    stepperMin = this.props.stepperMin;
                    if (isNaN(stepperMin)) {
                        stepperMin = this.props.min;
                    }
                }

                return stepperMin;
            },

            componentWillReceiveProps: function (nextProps) {
                var valueFromProps = this.getSliderValue(nextProps);
                if (valueFromProps !== this.state.value) {
                    var newVal = normalizeNumber(
                        valueFromProps,
                        this.getStepperMin(nextProps),
                        this.getStepperMax(nextProps),
                        nextProps.step || this.props.step);
                    this.setState({value: newVal});
                }
            },

            getTopLevelProps: function () {
                return _.omit(this.props, ['min', 'max', 'value', 'units', 'defaultValue', 'onChange', 'step']);
            },

            render: template
        });

        return slider;
    });
