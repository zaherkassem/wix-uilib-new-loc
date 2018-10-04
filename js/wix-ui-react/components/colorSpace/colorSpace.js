var template = require('wix-ui-react/components/colorSpace/colorSpace.rt');
var util = require('util');
var React = require('react');
var _ = require('lodash');
var panelsManagerFactory = require('panels/panelManager/panelManagerFactory');
require('wix-ui-react/components/colorSpace/addColorContent.scss');
require('baseUI/colorPicker/colorSpace.scss');

module.exports = React.createClass({

    displayName: 'ColorSpace',
    mixins: [React.addons.LinkedStateMixin],

    propTypes: {
        valueLink: React.PropTypes.object,
        value: React.PropTypes.object
    },

    getInitialState: function(){
        return {
            customColor: {
                RGB: {
                    red: 255,
                    green: 0,
                    blue: 0
                },
                HSB: {
                    hue: 0,
                    saturation: 100,
                    brightness: 100
                }
            }
        };
    },

    linkColor: function(stateProp){
        return {
            value: this.state[stateProp].HSB,
            requestChange: function(colorObj){
                this.handleChange.call(null, colorObj, stateProp);
            }.bind(this)
        };
    },

    handleChange: function(colorObj, stateProp) {
        var newState = _.clone(this.state);
        var prop = stateProp || 'customColor';
        newState[prop].HSB = colorObj;
        newState[prop].RGB = util.colors.hsbToRgb(colorObj);

        this.setState(newState, function() {
            var hexColor = util.colors.hsbToHex(colorObj);
            if (this.props.onPreview) {
                this.props.onPreview(hexColor);
            }
            if (this.props.onChange) {
                this.props.onChange(hexColor);
            }
        });

    },

    onChangeInValidationStatus: function(isValid) {
        if (this.isMounted()) {
            this.setState({isValid: isValid});
        }
    },

    resolveColor: function (color) {
        if (_.includes(color, 'color')) {
            return this.props.paletteColors[color];
        } else if (!color || color === constants.NO_COLOR) {
            return '#ffffff'; //default color is white, if non/noColor-option provided
        }
        return color;
    },

    handleCancel: function() {
        if (this.props.onCancle) {
            this.props.onCancel();
        }
        this.close();
    },

    close: function() {
        panelsManagerFactory.getManager().closePanelByName(this.props.panelName);
    },

    callOnChangeAndClose: function(val) {
        if(this.props.onChange) {
            this.props.onChange(val);
        }
        if(this.props.onClose) {
            this.props.onClose(val);
        }
        this.close();
    },

    render: template
});
