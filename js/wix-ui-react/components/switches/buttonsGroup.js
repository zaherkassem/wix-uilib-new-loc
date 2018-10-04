var React = require('react');
var _ = require('lodash');
var Wix = require('Wix');
var template = require('wix-ui-react/components/switches/buttonsGroup.rt');
require('baseUI/controls/buttonsGroup.scss');

module.exports = React.createClass({

    displayName: 'ButtonsGroup',
    propTypes: {
        defaultValue: React.PropTypes.oneOfType([
                        React.PropTypes.arrayOf(React.PropTypes.string),
                        React.PropTypes.string]),
        style: React.PropTypes.string
    },

    componentDidMount: function() {
        if (Wix.Utils.getViewMode() !== 'standalone') {
            var wixParam = this.props['wix-param'];
            Wix.Styles.getStyleParams(function (styleParams, callback) {
                var number = _.isNumber(styleParams.numbers[wixParam]) || _.isObject(styleParams.numbers[wixParam]) ? styleParams.numbers[wixParam] : { value : this.props.defaultValue };
                this.setState({
                    checked: _.isObject(number) ? number.value.toString() : number.toString()
                }, callback);
            }.bind(this));
        }
    },

    getInitialState: function() {
        return {
            checked: this.props.defaultValue
        };
    },

    handleChange: function(newValue) {
        this.setState({
            checked: newValue
        }, function() {
            var wixParam = this.props['wix-param'];
            if (wixParam) {
                Wix.Styles.setNumberParam(wixParam, {
                    value: newValue
                });
            }
        });

        if (_.isFunction(this.props.onChange)) {
            this.props.onChange.call(this, newValue);
        }
    },

    render: template
});
