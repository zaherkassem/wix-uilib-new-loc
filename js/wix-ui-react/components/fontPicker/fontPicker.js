var React = require('react');
var template = require('wix-ui-react/components/fontPicker/fontPicker.rt');
var fontPickerMixin = require('./fontPickerMixin');

module.exports = React.createClass({

    displayName: 'FontPicker',
    propTypes: {
        infoTitle: React.PropTypes.string,
        infoText: React.PropTypes.string,
        startWithFont: React.PropTypes.string,
        startWithTheme: React.PropTypes.string,
        title: React.PropTypes.string,
        hideStyle: React.PropTypes.bool,
        hideTheme: React.PropTypes.bool,
        showDefaultPanelTitle:  React.PropTypes.bool
    },
    mixins: [fontPickerMixin],
    render: template
});
