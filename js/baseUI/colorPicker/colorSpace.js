define([
    'react-dom',
    'jquery',
    'lodash',
    'react',
    'util',
    'baseUI/colorPicker/colorSpace.rt'
], function(ReactDOM, $, _, React, util, template) {
    'use strict';

    return React.createClass({
        displayName: 'colorSpace',
        mixins: [util.valueLinkMixin],
        propTypes: {
            valueLink: React.PropTypes.object,
            value: React.PropTypes.object
        },
        getInitialState: function() {
            this.layout = {
                colorSpace: {}
            };
            return {
                hueIndicatorDrag: false
            };
        },
        updateLayoutDimensions: function() {
            var domNode = $(ReactDOM.findDOMNode(this));
            var colorSpaceNode = $(ReactDOM.findDOMNode(this.refs.colorSpace));
            this.layout = {
                colorSpace: {
                    width: colorSpaceNode.width(),
                    height: colorSpaceNode.height()
                },
                width: domNode.width(),
                left: domNode.offset().left,
                top: domNode.offset().top
            };
        },
        componentDidMount: function(){
            this.updateLayoutDimensions();
            this.forceUpdate();
        },
        componentDidUpdate: function() {
            this.updateLayoutDimensions();
        },
        shouldComponentUpdate: function(nextProps, nextState) {
            return !_.isEqual(this.getValueFromProps(), this.getValueFromProps(nextProps)) || !_.isEqual(nextState, this.state);
        },
        getSelectedColor: function(){
            var color = this.getValueFromProps();
            var HSB;
            if (!_.isUndefined(color.hue) && !_.isUndefined(color.saturation) && !_.isUndefined(color.brightness)) {
                HSB = _.clone(color);
            } else {
                throw 'no HSB color was provided to custom color picker';
            }
            return HSB;
        },
        getBrightnessOptions: function() {
            var options = [];
            var color = this.getSelectedColor();
            var option;
            for (var i = 5; i > 0; i--) {
                option = {
                    hue: color.hue,
                    saturation: color.saturation,
                    brightness: i * 20 - 10
                };

                options.push(util.colors.hsbToRgb(option));
            }
            return options;
        },
        hueScaleClicked: function(event) {
            this.hueSelected(event);
            this.setState({
                hueIndicatorDrag: true
            }, function(){
                $(document).on('mousemove', this.hueSelected);
                $(document).on('mouseup', this.hueIndicatorDragEnd);
            }.bind(this));
        },
        hueSelected: function(event) {
            var x = util.math.ensureWithinLimits(event.pageX, this.layout.left, this.layout.left + this.layout.width);
            var percent = Math.floor(util.math.percentFromValue(x, this.layout.left, this.layout.left + this.layout.width));
            var hue = parseInt(util.math.valueFromPercent(percent, 0, 359), 10);
            this.updateColor({
                hue: hue
            });
        },
        hueIndicatorDragEnd: function() {
            this.setState({
                hueIndicatorDrag: false
            });
            $(document).off('mousemove', this.hueSelected);
            $(document).off('mouseup', this.hueIndicatorDragEnd);
        },
        updateColor: function(newColorProps) {
            var currentColor = this.getSelectedColor();
            var newColor = _.assign({}, currentColor, newColorProps);
            this.callOnChangeIfExists(newColor);
        },
        brightnessOptionSelected: function(index) {
            this.updateColor({
                brightness: (5 - index) * 20 - 10
            });
        },
        getIndicatorStyle: function() {
            if (!this.layout.colorSpace.width){
                return {};
            }
            var indicatorSize = 10;
            var currentColor = this.getSelectedColor();
            return {
                left: util.math.valueFromPercent(currentColor.saturation, 0, this.layout.colorSpace.width) - indicatorSize / 2,
                bottom: util.math.valueFromPercent(currentColor.brightness, 0, this.layout.colorSpace.height) - indicatorSize / 2
            };
        },
        getHueIndicatorStyle: function() {
            if (!this.layout.width) {
                return {};
            }
            var indicatorSize = 14;
            var currentColor = this.getSelectedColor();
            var huePercent = 100 * currentColor.hue / 359;
            return {
                left: util.math.valueFromPercent(huePercent, 0, this.layout.width) - indicatorSize / 2
            };
        },

        selectAreaClicked: function(event) {
            this.saturationBrightnessSelected(event);
            $(document).on('mousemove', this.saturationBrightnessSelected);
            $(document).on('mouseup', this.colorIndicatorDragEnd);
        },

        saturationBrightnessSelected: function(event){
            var x = util.math.ensureWithinLimits(event.pageX, this.layout.left, this.layout.left + this.layout.colorSpace.width);
            var y = util.math.ensureWithinLimits(event.pageY, this.layout.top, this.layout.top + this.layout.colorSpace.height);

            var saturation = util.math.percentFromValue(x, this.layout.left, this.layout.left + this.layout.colorSpace.width);
            var brightness = 100 - util.math.percentFromValue(y, this.layout.top, this.layout.top + this.layout.colorSpace.height);
            this.updateColor({
                saturation: parseInt(saturation, 10),
                brightness: parseInt(brightness, 10)
            });
        },

        colorIndicatorDragEnd: function(){
            $(document).off('mousemove', this.saturationBrightnessSelected);
            $(document).off('mouseup', this.colorIndicatorDragEnd);
        },

        render: template
    });
});
