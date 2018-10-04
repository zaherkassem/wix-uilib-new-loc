var React = require('react');
var template = require('wix-ui-react/components/fontAndColorPicker/fontAndColorPicker.rt');
require('wix-ui-react/components/fontAndColorPicker/fontAndColorPicker.scss');

module.exports = React.createClass({
    displayName: 'FontAndColorPicker',
    propTypes: {
        title: React.PropTypes.string,
        infoTitle: React.PropTypes.string,
        infoText: React.PropTypes.string,
        startWithFont: React.PropTypes.string,
        startWithTheme: React.PropTypes.string,
        startWithColor: React.PropTypes.string,
        onChange: React.PropTypes.func,
        hideTheme: React.PropTypes.bool,
        showDefaultPanelTitle:  React.PropTypes.bool,
        'wix-param-font': React.PropTypes.string,
        'wix-param-color': React.PropTypes.string
    },

    getFontPickerProps: function () {
        return _.chain({'wix-param': this.props['wix-param-font']})
                .defaults(this.props)
                .omit(['title', 'infoText', 'infoTitle'])
                .value();
    },

    getColorPickerProps: function () {
        return _.chain({'wix-param': this.props['wix-param-color']})
                .defaults(this.props)
                .omit(['title', 'infoText', 'infoTitle'])
                .value();
    },

    hasTitle: function () {
        return !_.isEmpty(this.props.title);
    },

    getValue: function () {
        return {
            font: this.refs.fontPicker.getValue(),
            color: this.refs.colorPicker.getValue()
        };
    },
    render: template
});
