var template = require('wix-ui-react/components/imagePreview/imagePreview.rt');
var Wix = require('Wix');
var _ = require('lodash');
require("baseUI/panelInputs/imagePreview.scss");

var ENABLE_MULTIPLE = false;
var MAX_BUTTONS_COUNT = 2;
var PREVIEW_HEIGHT = 155;
var PREVIEW_WIDTH = 288;

var BUTTON_PROP = React.PropTypes.shape({
    label: React.PropTypes.string,
    icon: React.PropTypes.string,
    tooltip : React.PropTypes.string,
    onClick: React.PropTypes.func
});
var VALUE_PROP = React.PropTypes.shape({
    relativeUri: React.PropTypes.string,
    fileName: React.PropTypes.string,
    height: React.PropTypes.number,
    width: React.PropTypes.number
});

module.exports = React.createClass({
    displayName: 'imagePreview',
    propTypes: {
        value: React.PropTypes.oneOfType([React.PropTypes.arrayOf(VALUE_PROP), VALUE_PROP]).isRequired,
        buttons: React.PropTypes.oneOfType([React.PropTypes.arrayOf(BUTTON_PROP), BUTTON_PROP]).isRequired,
        onChange: React.PropTypes.func
    },
    getInitialState: function () {
        return {
            value: this.getValue(),
            buttons: this.getButtons()
        };
    },
    getButtons: function (props) {
        props = props || this.props;
        var buttons = props.buttons || [];
        if (!_.isArray(buttons)) {
            buttons = [buttons];
        }
        buttons = buttons.slice(0, MAX_BUTTONS_COUNT);
        return _.map(buttons, function (button) {
            return {
                nonEmptyButtonLabel: button.label,
                emptyButtonLabel: button.label,
                nonEmptyButtonIcon: button.icon,
                emptyButtonIcon: button.icon,
                emptyButtonTooltip: button.tooltip,
                nonEmptyButtonTooltip: button.tooltip,
                onClick: button.onClick
            };
        });
    },
    getValue: function (props) {
        props = props || this.props;
        var value = props.value || [];
        if (!ENABLE_MULTIPLE && !_.isArray(value) && !_.isEmpty(value)) {
            return [_.last(value)];
        }
        return value;
    },
    componentWillReceiveProps: function (nextProps) {
        var nextState = {};
        if (nextProps.value !== this.props.value) {
            nextState.value = this.getValue(nextProps);
            this.handleChange(nextProps.value);
        }
        if (nextProps.buttons !== this.props.buttons) {
            nextState.buttons = this.getButtons(nextProps);
        }
        this.setState(nextState);
    },
    handleChange: function(newValue) {
        if (this.props.onChange) {
            this.props.onChange.call(this, newValue);
        }
    },
    getPreviewURL: function (wixImageObject) {
        if (wixImageObject && wixImageObject.relativeUri) {
            return Wix.Utils.Media.getResizedImageUrl(wixImageObject.relativeUri, PREVIEW_WIDTH, PREVIEW_HEIGHT, {resizeFilter: 'cover'});
        }
        return null;
    },
    getProps: function () {
        return _.defaults({
            value: this.state.value,
            getURL: this.getPreviewURL,
            onChange: this.handleChange,
            buttons: this.state.buttons,
            emptySymbolName: 'camera'
        }, this.props);
    },
    render: template
});