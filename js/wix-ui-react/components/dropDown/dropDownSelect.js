var React = require('react');
var _ = require('lodash');
var Wix = require('Wix');
var template = require('wix-ui-react/components/dropDown/dropDown.rt');
require("baseUI/panelInputs/dropDown/dropDown.scss");
require("./overrides.scss");

module.exports = React.createClass({

    displayName: 'DropDown',
    propTypes: {
        title: React.PropTypes.string,
        options: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.string.isRequired,
            label: React.PropTypes.string.isRequired,
            className: React.PropTypes.string,
            type: React.PropTypes.string
        })).isRequired
    },

    getInitialState: function() {
        return {
            value: this.props.defaultValue
        };
    },

    componentDidMount: function() {
        if (Wix.Utils.getViewMode() !== 'standalone') {
            var wixParam = this.props['wix-param'];
            if (wixParam) {
                Wix.Styles.getStyleParams(function (styleParams, callback) {
                    var num = styleParams.numbers[wixParam];
                    if (_.isNumber(num)) {
                        this.setState({
                            value: num.toString()
                        }, callback);
                    }
                }.bind(this));
            }
        }
    },

    getValueLink: function getValueLink(valueName) {
        var that = this;
        return {
            value: that.state[valueName],
            requestChange: function requestChange(newValue) {
                that.handleChange(newValue, valueName);
            }
        };
    },

    handleChange: function handleChange(newValue, valueName) {
        this.setState({
            value: newValue
        }, function() {
            var wixParam = this.props['wix-param'];
            if (wixParam) {
                Wix.Styles.setNumberParam(wixParam, {
                    value: newValue
                });
            }
        });

        if (this.props.onChange && _.isFunction(this.props.onChange)) {
            this.props.onChange.call(this, newValue);
        }
    },
    render: template
});
