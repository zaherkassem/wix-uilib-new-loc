var _ = require('lodash');

define([], function () {
    var DEFAULT_COLOR_NAME = 'color-1';
    var DEFAULT_STANDALONE_COLOR = '#3D9BE9';
    var DEFAULT_OPACITY = 1;

    function getColorNameByRef (siteColors, reference) {
        return _.result(_.find(siteColors, {reference: reference}), 'name') || '';
    }

    return {
        componentDidMount: function() {
            var wixParam = this.props['wix-param'];
            document.addEventListener('paletteChange', this.paletteChangeHandler, false);
            if (Wix.Utils.getViewMode() === 'standalone') {
                this.setComponentState(this.props.startWithOpacity || DEFAULT_OPACITY, DEFAULT_STANDALONE_COLOR, '');
            } else {
                var colorName;
                Wix.Styles.getSiteColors(function(siteColors) {
                    Wix.Styles.getStyleParams(function (styleParams) {
                        var colorVal;
                        var color = styleParams.colors[wixParam];
                        if (color) {
                            colorVal = color.value || color.rgba;
                            var alpha = colorVal  ? parseFloat(this.getAlphFromRgba(colorVal)) : DEFAULT_OPACITY;
                            colorName = getColorNameByRef(siteColors, color.themeName);
                            this.setComponentState(alpha, this.rgb2hex(colorVal), colorName);
                        } else {
                            if (_.startsWith(this.props.startWithColor, '#')) {
                                colorVal = this.props.startWithColor;
                                colorName = '';
                            } else {
                                colorVal = Wix.Styles.getColorByreference(this.state.colorData.name).value;
                                colorName = getColorNameByRef(siteColors, this.state.colorData.name);
                            }
                            this.setComponentState(parseFloat(this.state.colorData.alpha), colorVal, colorName, function() {
                                this.updateStyleAndUiLib();
                            }.bind(this));
                        }
                    }.bind(this));
                }.bind(this));
            }
        },

        componentWillUnmount: function () {
            document.removeEventListener('paletteChange', this.paletteChangeHandler, false);
        },

        setComponentState: function(alpha, color, name, callback) {
            if (this.isMounted()) {
                this.setState({
                    colorData: {
                        alpha: alpha,
                        color: color,
                        name: name
                    }
                }, callback);
            }
        },

        getInitialState: function() {
            return {
                colorData: {
                    alpha: this.props.startWithOpacity || DEFAULT_OPACITY,
                    color: '',
                    name: this.props.startWithColor || DEFAULT_COLOR_NAME
                }
            };
        },

        callOnChange: function (color, alpha) {
            if (this.props.onChange) {
                this.props.onChange({
                    color: color,
                    opacity: alpha
                });
            }
        },

        openColorPicker: function (onClose) {
            var colorElmPosition = ReactDOM.findDOMNode(this).getBoundingClientRect();
            Wix.Styles.openColorPicker({
                left: colorElmPosition.right + 12,
                top: colorElmPosition.top,
                wixParam : this.props['wix-param'],
                color: this.state.colorData.name || (_.isString(this.state.colorData.color) ? this.state.colorData.color.toUpperCase(): this.state.colorData.color)
            }, _.partial(this.onColorPickerResponse, onClose));
        },

        onColorPickerResponse: function (onClose, data) {
            if (data.panelClose) {
                onClose();
            } else if (data.paletteChange) {
                var themeEvent = document.createEvent('CustomEvent');
                themeEvent.initCustomEvent('paletteChange', true, true, { colors: data.colors });
                document.dispatchEvent(themeEvent);
            } else if (data && !_.isEmpty(data)) {
                var colorVal = this.rgb2hex(data.colorParam.value) || this.state.colorData.color;
                var rgba = this.convertHex(colorVal, this.state.colorData.alpha);
                var uiLibVal = {};
                uiLibVal.value = rgba;
                if (!_.isEmpty(data.colorParam.themeName)){
                    uiLibVal.themeName = data.colorParam.themeName;
                }
                this.setComponentState(this.state.colorData.alpha, colorVal, data.colorParam.themeName || '');
                Wix.Styles.setUILIBParamValue('colors', this.props['wix-param'], uiLibVal);
                this.callOnChange(colorVal, this.state.colorData.alpha);
            }
        },

        paletteChangeHandler: function (event) {
            var wixParam = this.props['wix-param'];
            var colors = event.detail.colors;
            var color = colors[wixParam];
            if (color) {
                var colorVal = this.rgb2hex(color.value || color.rgba);
                this.callOnChange(colorVal, this.state.colorData.alpha);
                this.setComponentState(this.state.colorData.alpha, colorVal, this.state.colorData.name);
                var uiLibVal = {};
                var rgba = this.convertHex(colorVal, this.state.colorData.alpha);
                uiLibVal.value = rgba;
                if (!_.isEmpty(this.state.colorData.name)){
                    uiLibVal.themeName = this.state.colorData.name;
                }
                Wix.Styles.setUILIBParamValue('colors', wixParam, uiLibVal);
            }

        },

        getValueLink: function getValueLink(valueName) {
            return {
                value: this.state.colorData,
                requestChange: function requestChange(newValue) {
                    this.setComponentState(newValue.alpha, this.state.colorData.color, this.state.colorData.name);
                }.bind(this)
            };
        },

        getValue: function() {
            return {
                color: this.state.colorData.color,
                name: this.state.colorData.name,
                opacity: this.state.colorData.alpha
            };
        },

        setValue: function (obj) {
            var colorData = _.clone(this.state.colorData);
            var color = _.get(obj, 'color');
            var alpha = _.get(obj, 'opacity');

            if (_.inRange(alpha, 0, 1) || alpha === 1) {
                colorData.alpha = alpha;
            }
            if (color) {
                if (_.includes(color, 'rgb')) {
                    color = this.rgb2hex(color);
                }
                var isValidColor = /(^#[0-9A-F]{6}$)/i.test(color);
                if (isValidColor) {
                    colorData.name = '';
                    colorData.color = color;
                }
            }

            this.setComponentState(colorData.alpha, colorData.color, colorData.name, this.updateStyleAndUiLib.bind(this));
        },

        updateStyleAndUiLib: function() {
            var rgba = this.convertHex(this.state.colorData.color, this.state.colorData.alpha);
            var value = {
                rgba: rgba,
                opacity: this.state.colorData.alpha
            };
            if (!_.isEmpty(this.state.colorData.name)){
                value.color = {
                    name: this.state.colorData.name
                };
            }
            var wixParam = this.props['wix-param'];
            Wix.Styles.setColorParam(wixParam, {
                value: value
            });

            var uiLibVal = {};
            uiLibVal.value = rgba;
            if (!_.isEmpty(this.state.colorData.name)){
                uiLibVal.themeName = this.state.colorData.name;
            }
            Wix.Styles.setUILIBParamValue('colors', wixParam, uiLibVal);
        },

        handleSlideEnd: function () {
            this.updateStyleAndUiLib();
            this.callOnChange(this.state.colorData.color, this.state.colorData.alpha);
        },

        rgb2hex: function (rgb) {
            if (_.includes(rgb, 'rgb')) {
                rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
                return (rgb && rgb.length === 4) ? "#" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
            } else {
                return rgb;
            }
        },

        convertHex: function (hex, opacity) {
            var result;
            if (_.includes(hex, 'rgba')) {
                var tokens = hex.split(',');
                tokens[3] = opacity + ')';
                result = tokens.join(',');
            } else {
                hex = hex.replace('#', '');
                var r = parseInt(hex.substring(0, 2), 16);
                var g = parseInt(hex.substring(2, 4), 16);
                var b = parseInt(hex.substring(4, 6), 16);

                result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
            }

            return result;
        },

        getAlphFromRgba: function (rgba) {
            if (_.isUndefined(rgba)) {
                return 1;
            }

            if (!_.includes(rgba, 'rgba')) {
                return 1;
            }

            if (_.includes(rgba, '#')) {
                return 1;
            }
            var tokens = rgba.split(',');
            var alpha = tokens[3];
            return alpha.split(')')[0];
        }

    };
});
