define([
    'react-dom',
    'react',
    'lodash',
    'jquery',
    'util',
    'baseUI/mixins/reportUIChangeMixin',
    'baseUI/controls/angle.rt'
], function(ReactDOM, React, _, $, util, reportUIChangeMixin, template) {
    'use strict';

    var degreesPerRad = 180 / Math.PI;

    return React.createClass({
        displayName: 'angle',
        mixins: [util.valueLinkMixin, reportUIChangeMixin, util.translationMixin],
        translate: util.translate,
        componentDidMount: function(){
            this.previousValue = this.getValueFromProps();
        },
        onKnobMouseDown: function(){
            var root = $(ReactDOM.findDOMNode(this));
            var circle = root.find('.circle-center')[0];
            var boundingRectangle = circle.getBoundingClientRect();
            //TODO: find a better method to get a circleCenter independent of scroll, i.e. using screen coordinates instead of page
            this.circleCenter = {
                x: boundingRectangle.left,
                y: boundingRectangle.top + window.pageYOffset
            };
            $(document).on('mousemove', this.changeAngle);
            $(document).on('mouseup', this.removeListenersAndReportChange);
        },
        removeListenersAndReportChange: function(){
            $(document).off('mouseup', this.removeListenersAndReportChange);
            $(document).off('mousemove', this.changeAngle);
            this.reportChangeFromUser();
        },
        changeAngle: function(e){
            var angle = Math.atan2(e.pageY - this.circleCenter.y, e.pageX - this.circleCenter.x);
            var degrees = Math.floor((450 + angle * degreesPerRad) % 360);

            this.callOnChangeIfExists(degrees);
        },
        reportChangeFromUser: function(){
            var currentValue = this.getValueFromProps();
            if (this.previousValue !== currentValue){
                this.previousValue = currentValue;
                this.reportUIChange({value: currentValue});
            }
        },
        componentWillUnmount: function(){
            this.removeListenersAndReportChange();
        },

        getCircleStyle: function () {
            return {
                transform: 'rotate(' + this.props.value + 'deg)',
                webkitTransform: 'rotate(' + this.props.value + 'deg)'
            };
        },

        getKnobStyle: function () {
            return {
                transform: 'rotate(-' + this.props.value + 'deg)',
                webkitTransform: 'rotate(-' + this.props.value + 'deg)'
            };
        },

        render: template
    });
});
