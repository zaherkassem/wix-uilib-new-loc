define(['react', 'lodash', 'baseUI/panelInputs/shadowControl.rt', 'baseUI/panelInputs/inputMixin', 'core', 'panelUtils'], function (React, _, template, inputMixin, core, panelUtils) {
    'use strict';

    var degreesPerRadians = 180 / Math.PI;
    var radiansPerDegrees = 1 / degreesPerRadians;

    function calculateXYValue(distance, angle) {
        var radAngle = angle * radiansPerDegrees;
        return {
            x: (distance * Math.sin(-radAngle)).toFixed(2),
            y: (distance * Math.cos(-radAngle)).toFixed(2)
        };
    }

    function calculateAngle(offsetX, offsetY) {
        var radiansAngle = Math.atan2(offsetX, -offsetY);
        return ((180 + radiansAngle * degreesPerRadians) % 360).toFixed(2);
    }

    function calculateDistance(dx, dy) {
        return Math.sqrt(dx * dx + dy * dy).toFixed(2);
    }

    //TODO: move these functions to a util
    var extractRGBA = /rgba\(([^)]+)\)/;
    var isRGBA = /rgba\(/;
    function getRGBA(colorString){
        var rgbaValues = extractRGBA.exec(colorString)[1];
        return _.map(rgbaValues.split(','), function(val){
            return parseFloat(val);
        });
    }
    function getAlpha(colorValue){
        if (colorValue.match(isRGBA)) {
            var rgba = getRGBA(colorValue);
            return rgba[3];
        }
        return 1;
    }

    function createRGBA(colorWithAlpha){
        var rgba = getRGBA(colorWithAlpha.color);
        rgba[3] = colorWithAlpha.alpha;
        return 'rgba(' + rgba.join(',') + ')';
    }

    function getSplitValueFromProps(stringToSplit) {
        var value = this.getValueFromProps();
        return value ? value.split(stringToSplit) : [];
    }

    return React.createClass({
        displayName: 'shadowControl',
        mixins: [inputMixin, core.mixins.editorAPIMixin, panelUtils.linkColorPickerMixin],
        render: template,

        getDefaultProps: function() {
            return {
                angle: 0,
                distance: 0,
                size: 0,
                blur: 0,
                color: 'rgba(0,0,0,1)'
            };
        },

        changeAngle: function(deg){
            this.oldDistance = this.getDistanceValue();
            this.oldAngle = deg;
            this.handleChange({angle: deg});
        },
        distanceChanged: function (newDistance) {
            this.oldAngle = this.getAngleValue();
            this.oldDistance = undefined;
            this.handleChange({distance: newDistance});
        },
        sizeChanged: function (newSize) {
            this.handleChange({size: newSize});
        },
        blurChanged: function (newBlur) {
            this.handleChange({blur: newBlur});
        },

        getAngleValue: function () {
            if (this.oldAngle) {
                return this.oldAngle;
            }
            var splitValue = getSplitValueFromProps.call(this, ' ');
            var shadowValues = _.map(splitValue, function (cornerVal) {
                return parseFloat(cornerVal);
            });

            return calculateAngle(shadowValues[0], shadowValues[1]);
        },
        getDistanceValue: function () {
            if (this.oldDistance) {
                return this.oldDistance;
            }
            var splitValue = getSplitValueFromProps.call(this, ' ');
            var shadowValues = _.map(splitValue, function (cornerVal) {
                return parseFloat(cornerVal);
            });

            return calculateDistance(shadowValues[0], shadowValues[1]);
        },

        getBlurValue: function () {
            var shadowValues = getSplitValueFromProps.call(this, ' ');
            return parseFloat(shadowValues[2]);
        },

        getSizeValue: function () {
            var shadowValues = getSplitValueFromProps.call(this, ' ');
            var sizeValue = parseFloat(shadowValues[3]);
            return sizeValue ? sizeValue : 0;
        },
        getColorValue: function () {
            var colorVal = this.getValueFromProps();
            colorVal = colorVal.substr(colorVal.indexOf('rgb'));
            var regexRGBA = /rgba\(([^)]+)\)/;
            var colorMatch = regexRGBA.exec(colorVal);
            if (colorMatch) {
                return colorMatch[0];
            }
            return 'rgba(0,0,0,1)';
        },

        getStringForValues: function (values) {
            var extendedData = _.defaults(values, {
                distance: this.getDistanceValue(),
                angle: this.getAngleValue(),
                blur: this.getBlurValue(),
                size: this.getSizeValue(),
                color: this.getColorValue()
            });

            var XYVal = calculateXYValue(extendedData.distance, extendedData.angle);
            return XYVal.x + 'px ' + XYVal.y + 'px ' + extendedData.blur + 'px ' + extendedData.size + 'px ' + extendedData.color;
        },

        linkColorWithOpacity: function(){
            var color = this.getColorValue();
            var alpha = getAlpha(color);

            return {
                value: {
                    color: color,
                    alpha: alpha
                },
                requestChange: function(colorWithAlpha){
                    var newColor = createRGBA(colorWithAlpha);
                   this.handleChange({color: newColor});
                }.bind(this)
            };
        },
        getColorPickerProps: function(){
            return {
                colorResolver: this.resolveColor,
                openColorPicker: this.openColorPicker
            };
        },
        handleChange: function (values) {
            this.callOnChangeIfExists(this.getStringForValues(values));
        }
    });
});
