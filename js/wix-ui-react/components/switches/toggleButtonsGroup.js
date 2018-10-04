var React = require('react');
var template = require('wix-ui-react/components/switches/toggleButtonsGroup.rt');
require('baseUI/controls/buttonsGroup.scss');

module.exports = React.createClass({

    displayName: 'ToggleButtonsGroup',
    propTypes: {
        options: React.PropTypes.array.isRequired,
        style: React.PropTypes.string
    },


    getInitialState: function() {
        return {
            checked: this.props.defaultValue || []
        };
    },

    handleChange: function(newValue) {
        var that = this;
        this.setState({
            checked: _.xor([newValue], this.state.checked)
        }, function () {
            if (that.props.onChange) {
                that.props.onChange.call(that, that.state.checked);
            }
        });
    },

    render: template
});