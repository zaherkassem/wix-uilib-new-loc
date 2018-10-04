var template = require('wix-ui-react/components/textInputWithButton/textInputWithButton.rt');
require("baseUI/panelInputs/textInputWithButton.scss");
var _ = require('lodash');

module.exports = React.createClass({
    displayName: 'textInputWithButton',
    propTypes: {
        title: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        validator: React.PropTypes.func,
        asyncValidator: React.PropTypes.func,
        infoText: React.PropTypes.string,
        infoTitle: React.PropTypes.string,
        invalidMessage: React.PropTypes.string,
        defaultText: React.PropTypes.string,
        buttonText: React.PropTypes.string,
        maxLength: React.PropTypes.number,
        isMultiLine: React.PropTypes.bool,
        onButtonClick: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            value: ''
        };
    },
    getValueLink: function (valueName) {
        return {
            value: this.state[valueName],
            requestChange: this.handleChange
        };
    },
    handleChange: function (newValue) {
        this.setState({value: newValue});
        if (_.isFunction(this.props.onButtonClick)) {
            this.props.onButtonClick(newValue);
        }
    },
    getValue: function() {
        return this.state.value;
    },
    setValue: function(newValue) {
        this.setState({value: newValue});
    },
    render: template
});
