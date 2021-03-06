var React = require('react');
var _ = require('lodash');
var Wix = require('Wix');
require('symbols/svg/toggles/checkbox.scss');
var template = require('wix-ui-react/components/switches/checkbox.rt');

module.exports = React.createClass({

    displayName: 'Checkbox',
    propTypes: {
        label: React.PropTypes.string,
        defaultValue: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        infoText: React.PropTypes.string,
        infoTitle: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            checked: this.props.defaultValue || false,
            disabled: this.props.disabled
        };
    },

    enable: function() {
        this.setState({ disabled: false});
    },

    disable: function() {
        this.setState({ disabled: true});
    },

    componentDidMount: function() {
        if (Wix.Utils.getViewMode() !== 'standalone') {
            var wixParam = this.props['wix-param'];
            Wix.Styles.getStyleParams(function (styleParams, callback) {
                var bool = styleParams.booleans[wixParam];
                if (_.isBoolean(bool)) {
                    this.setState({
                        checked: bool
                    }, callback);
                } else {
                    var defaultValue = this.state.checked;
                    this.setState({
                        checked: defaultValue
                    }, callback);
                }

            }.bind(this));
        }
    },

    handleChange: function(newValue) {
        this.setState({
            checked: newValue
        }, function() {
            var wixParam = this.props['wix-param'];
            if (wixParam) {
                Wix.Styles.setBooleanParam(wixParam, {
                    value: newValue
                });
            }
            if (this.props.onChange && _.isFunction(this.props.onChange)) {
                this.props.onChange.call(this, newValue);
            }
        });

    },

    render: template
});
