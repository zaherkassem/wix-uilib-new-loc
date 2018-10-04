var React = require('react');
var _ = require('lodash');
var Wix = require('Wix');
var template = require('wix-ui-react/components/alignment/dock.rt');
require('baseUI/controls/dock.scss');
require('./overrides.scss');

var dockDirections = ['TOP_LEFT', 'TOP', 'TOP_RIGHT', 'LEFT', 'RIGHT', 'BOTTOM_LEFT', 'BOTTOM', 'BOTTOM_RIGHT'];

var defaults = {
    defaultValue: 'TOP'
};

module.exports = React.createClass({

    displayName: 'Dock',
    propTypes: {
        value: React.PropTypes.oneOf(_.values(dockDirections))
    },

    getInitialState: function() {
        return {
            value: this.props.defaultValue || defaults.defaultValue
        };
    },

    getValueLink: function (valueName) {
        var that = this;
        return {
            value: that.state[valueName],
            requestChange: function (newValue) {
                that.handleChange(newValue, valueName);
            }
        };
    },

    handleChange: function(newValue) {
        this.setState({
            value: newValue
        }, function() {

            var compId = Wix.Utils.getOrigCompId();

            if (newValue === 'RIGHT') {
                newValue = 'CENTER_RIGHT';
            }
            if (newValue === 'LEFT') {
                newValue = 'CENTER_LEFT';
            }
            if (newValue === 'TOP') {
                newValue = 'TOP_CENTER';
            }
            if (newValue === 'BOTTOM') {
                newValue = 'BOTTOM_CENTER';
            }

            if (compId) {
                Wix.Settings.setWindowPlacement(compId, Wix.WindowPlacement[newValue], 0, 0);
            }
        });

        if (_.isFunction(this.props.onChange)) {
            this.props.onChange.call(this, newValue);
        }
    },

    render: template
});