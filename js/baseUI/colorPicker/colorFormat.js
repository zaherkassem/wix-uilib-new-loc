define(['react', 'lodash', 'util', 'baseUI/framework/uiConstants', 'baseUI/colorPicker/colorFormat.rt'], function
    (React, _, util, uiConstants, template) {
    'use strict';

    return React.createClass({
        displayName: 'colorFormat',
        propTypes: {
            value: React.PropTypes.object.isRequired,
            onChangeInValidationStatus: React.PropTypes.func
        },
        mixins: [React.addons.LinkedStateMixin, util.valueLinkMixin, React.addons.PureRenderMixin],
        getInitialState: function() {
            var hsb = this.getValueFromProps();
            var rgb = util.colors.hsbToRgb(hsb);
            return {
                selectedFormat: uiConstants.COLOR_FORMATS.HEX,
                currentExactHSB: hsb,
                currentRGB: rgb,
                currentHEX: util.colors.rgbToHex(rgb)
            };
        },
        componentWillReceiveProps: function(nextProps){
            if (!_.isEqual(nextProps.value, this.props.value) && !_.isEqual(nextProps.value, this.state.currentExactHSB)){
                var rgb = util.colors.hsbToRgb(nextProps.value);
                this.setState({
                    currentExactHSB: nextProps.value,
                    currentRGB: rgb,
                    currentHEX: util.colors.rgbToHex(rgb)
                });
            }
        },
        componentDidUpdate: function(prevProps, prevState) {
            if (prevState.selectedFormat !== this.state.selectedFormat && this.props.onChangeInValidationStatus) {
                this.props.onChangeInValidationStatus(true);
            }
        },
        getFormatOptions: function() {
            return [
                { label: 'HEX', value: uiConstants.COLOR_FORMATS.HEX},
                { label: 'RGB', value: uiConstants.COLOR_FORMATS.RGB},
                { label: 'HSB', value: uiConstants.COLOR_FORMATS.HSB}
            ];
        },
        getColorAsExactHSB: function() {
          return _.clone(this.state.currentExactHSB);
        },
        getColorAsHEX: function() {
            var colorAsHEX = this.state.currentHEX;
            return colorAsHEX.substr(1);
        },
        getColorAsRGB: function() {
            return _.clone(this.state.currentRGB);
        },
        handleRedChange: function(redVal) {
            var colorAsRGB = this.getColorAsRGB();
            colorAsRGB.red = redVal;
            var colorAsHSB = util.colors.rgbToHsbExact(colorAsRGB);
            this.setState({
                currentExactHSB: colorAsHSB,
                currentRGB: colorAsRGB,
                currentHEX: util.colors.rgbToHex(colorAsRGB)
            }, this.callOnChangeIfExists.bind(this, _.clone(colorAsHSB)));

        },
        handleGreenChange: function(greenVal) {
            var colorAsRGB = this.getColorAsRGB();
            colorAsRGB.green = greenVal;
            var colorAsHSB = util.colors.rgbToHsbExact(colorAsRGB);
            this.setState({
                currentExactHSB: colorAsHSB,
                currentRGB: colorAsRGB,
                currentHEX: util.colors.rgbToHex(colorAsRGB)
            }, this.callOnChangeIfExists.bind(this, _.clone(colorAsHSB)));
        },
        handleBlueChange: function(blueVal) {
            var colorAsRGB = this.getColorAsRGB();
            colorAsRGB.blue = blueVal;
            var colorAsHSB = util.colors.rgbToHsbExact(colorAsRGB);
            this.setState({
                currentExactHSB: colorAsHSB,
                currentRGB: colorAsRGB,
                currentHEX: util.colors.rgbToHex(colorAsRGB)
            }, this.callOnChangeIfExists.bind(this, _.clone(colorAsHSB)));
        },
        handleHueChange: function(hueVal) {
            var colorAsHSB = this.getColorAsExactHSB();
            if (Math.round(colorAsHSB.hue) !== hueVal) {
                colorAsHSB.hue = util.math.ensureWithinLimits(hueVal, 0, 359);
                var colorAsRGB = util.colors.hsbToRgb(colorAsHSB);
                this.setState({
                    currentExactHSB: colorAsHSB,
                    currentRGB: colorAsRGB,
                    currentHEX: util.colors.rgbToHex(colorAsRGB)
                }, this.callOnChangeIfExists.bind(this, _.clone(colorAsHSB)));
            }
        },
        handleSaturationChange: function(saturationVal) {
            var colorAsHSB = this.getColorAsExactHSB();
            if (Math.round(colorAsHSB.saturation) !== saturationVal) {
                colorAsHSB.saturation = saturationVal;
                var colorAsRGB = util.colors.hsbToRgb(colorAsHSB);
                this.setState({
                    currentExactHSB: colorAsHSB,
                    currentRGB: colorAsRGB,
                    currentHEX: util.colors.rgbToHex(colorAsRGB)
                }, this.callOnChangeIfExists.bind(this, _.clone(colorAsHSB)));
            }
        },
        handleBrightnessChange: function(brightnessVal) {
            var colorAsHSB = this.getColorAsExactHSB();
            if (Math.round(colorAsHSB.brightness) !== brightnessVal) {
                colorAsHSB.brightness = brightnessVal;
                var colorAsRGB = util.colors.hsbToRgb(colorAsHSB);
                this.setState({
                    currentExactHSB: colorAsHSB,
                    currentRGB: colorAsRGB,
                    currentHEX: util.colors.rgbToHex(colorAsRGB)
                }, this.callOnChangeIfExists.bind(this, _.clone(colorAsHSB)));
            }
        },
        handleHexChange: function(hexVal) {
            hexVal = '#' + hexVal;
            var colorAsRGB = util.colors.hexToRgb(hexVal);
            var colorAsHSB = util.colors.rgbToHsbExact(colorAsRGB);
            this.setState({
                currentExactHSB: colorAsHSB,
                currentRGB: colorAsRGB,
                currentHEX: hexVal
            }, this.callOnChangeIfExists.bind(this, _.clone(colorAsHSB)));
        },
        validateHexValue: function(hexVal) {
            return /^[0-9A-F]{6}$/i.test(hexVal);
        },
        render: template
    });
});
