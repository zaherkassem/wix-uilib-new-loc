define([
    'react',
    'lodash',
    'util',
    'baseUI/panelInputs/inputMixin',
    'baseUI/colorPicker/colorPickerInput.rt'
    ], function (React, _, util, inputMixin, template) {
    'use strict';

    return React.createClass({
        mixins: [inputMixin],
        displayName: 'colorPickerInput',
        getInitialState: function () {
            return {
                forceHighlight: false
            };
        },
        propTypes: {
            useMouseEvent: React.PropTypes.bool,
            position: React.PropTypes.object,
            openColorPicker: React.PropTypes.func.isRequired,
            colorResolver: React.PropTypes.func, //so that we can support theme color pointers, e.g. 'color_9'
            previewOnHover: React.PropTypes.bool // Defaults to true
        },
        getDefaultProps: function () {
            return {
                colorResolver: _.identity //so that we don't need to pass resolveColor when using the colorpicker for basic colors
            };
        },
        openColorPicker: function () {
            this.setState({
                forceHighlight: true
            });
            this.props.openColorPicker(this.onColorPickerClose);
        },
        handleChange: function (newValue) {
            this.callOnChangeIfExists(newValue);
        },
        resolveColor: function () {
            return this.props.colorResolver(this.getValueFromProps());
        },
        getOpacity: function () {
            var opacity = 1;
            if (_.isNumber(this.props.opacity)) {
                opacity = this.props.opacity;
            }
            return opacity;
        },
        unHighlight: function () {
            if (this.isMounted()) {
                this.setState({
                    forceHighlight: false
                });
            }
        },
        onColorPickerClose: function() {
            if (this.isMounted()) { // in case both color picker panel and input became unmounted at the same time
                this.unHighlight();
            }
        },
        render: template
    });
});
