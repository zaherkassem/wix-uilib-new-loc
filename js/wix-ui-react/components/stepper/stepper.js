var template = require('wix-ui-react/components/stepper/stepper.rt');
var Wix = require('Wix');
var _ = require('lodash');
require("baseUI/panelInputs/stepper.scss");

module.exports = React.createClass({
    displayName: 'Stepper',
    propTypes: {
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        step: React.PropTypes.number,
        units: React.PropTypes.string,
        defaultValue: React.PropTypes.number,
        onChange: React.PropTypes.func
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
                Wix.Styles.getStyleParams(function (styleParams) {
                    var num = _.isNumber(styleParams.numbers[wixParam]) || _.isObject(styleParams.numbers[wixParam]) ? styleParams.numbers[wixParam]: (this.props.defaultValue || 0);
                    this.setState({
                        value: Number(num || num.value)
                    });
                }.bind(this));
            }
        }
    },
    handleChange: function(newValue) {
        this.setState({
            value: newValue
        });

        if (Wix.Utils.getViewMode() !== 'standalone') {
            var wixParam = this.props['wix-param'];
            if (wixParam) {
                Wix.Styles.setNumberParam(wixParam, {
                    value: newValue
                });
            }
        }

        if (this.props.onChange) {
            this.props.onChange.call(this, newValue);
        }
    },
    render: template
});
