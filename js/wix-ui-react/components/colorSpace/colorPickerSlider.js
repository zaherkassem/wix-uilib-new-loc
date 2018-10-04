var React = require('react');
var Wix = require('Wix');
var _ = require('lodash');

var template = require('wix-ui-react/components/colorSpace/colorPickerSlider.rt');
var colorPickerMixin = require('./colorPickerMixin');
require('baseUI/colorPicker/colorPickerInputWithOpacity.scss');
require('baseUI/colorPicker/colorPickerInput.scss');
require('baseUI/colorPicker/colorFormat.scss');

module.exports = React.createClass({
    displayName: 'ColorPickerSlider',

    propTypes: {
        title: React.PropTypes.string,
        onChange: React.PropTypes.func,
        startWithColor: React.PropTypes.string,
        startWithOpacity: React.PropTypes.number
    },
    mixins: [colorPickerMixin],
    getDefaultProps: function() {
        return {
            openColorPicker: this.openColorPicker
        };
    },
    render: template
});
