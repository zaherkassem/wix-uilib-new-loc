var React = require('react');
var Wix = require('Wix');
var _ = require('lodash');

var template = require('./colorPickerInput.rt');
var colorPickerMixin = require('./colorPickerMixin');
require("baseUI/colorPicker/colorPickerInput.scss");
require('baseUI/colorPicker/colorPickerInput.scss');
require('baseUI/colorPicker/colorFormat.scss');

module.exports = React.createClass({
    displayName: 'colorPickerInput',
    propTypes: {
        title: React.PropTypes.string,
        onChange: React.PropTypes.func,
        startWithColor: React.PropTypes.string
    },
    mixins: [colorPickerMixin],
    getDefaultProps: function () {
        return {
            colorResolver: _.identity //so that we don't need to pass resolveColor when using the colorpicker for basic colors
        };
    },
    getValueLinkWithoutOpacity: function getValueLink(valueName) {
        return {
            value: this.state.colorData.color,
            requestChange: function requestChange() {
                this.setComponentState(1, this.state.colorData.color, this.state.colorData.name);
            }.bind(this)
        };
    },
    render: template
});
