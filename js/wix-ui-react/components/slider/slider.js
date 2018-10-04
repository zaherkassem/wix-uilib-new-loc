var Wix = require('Wix');
var _ = require('lodash');

var template = require('wix-ui-react/components/slider/slider.rt');
require("baseUI/panelInputs/slider.scss");

module.exports = React.createClass({

    displayName: 'Slider',
    propTypes: {
        title: React.PropTypes.string,
        defaultValue: React.PropTypes.number,
        min: React.PropTypes.number,
        max: React.PropTypes.number,
        units: React.PropTypes.string,
        step: React.PropTypes.number,
        infoText: React.PropTypes.string,
        infoTitle: React.PropTypes.string,
        onSlideEnd: React.PropTypes.func,
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

    handleSlideEnd: function() {
        var newValue = this.state.value;

        if (this.props.onSlideEnd) {
            this.props.onSlideEnd.call(this, newValue);
        }
    },

    handleChange: _.throttle(function(newValue) {
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
    }, 100),

    render: template
});
