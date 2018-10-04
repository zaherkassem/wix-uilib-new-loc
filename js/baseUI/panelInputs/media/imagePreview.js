define(['react', 'lodash', 'baseUI/panelInputs/inputMixin', 'baseUI/panelInputs/media/imagePreview.rt'], function (React, _, inputMixin, template) {
    'use strict';

    var BUTTON_PROP = React.PropTypes.shape({
        nonEmptyButtonLabel: React.PropTypes.string,
        nonEmptyButtonIcon: React.PropTypes.string,
        emptyButtonLabel: React.PropTypes.string,
        emptyButtonIcon: React.PropTypes.string,
        onClick: React.PropTypes.func
    });

    return React.createClass({
        displayName: 'imagePreview',
        mixins: [inputMixin],
        propTypes: {
            emptySymbolName: React.PropTypes.string,
            getURL: React.PropTypes.func,
            getStyle: React.PropTypes.func,
            buttons: React.PropTypes.oneOfType([React.PropTypes.arrayOf(BUTTON_PROP), BUTTON_PROP]).isRequired
        },
        getDefaultProps: function () {
            return {
                getURL: _.identity,
                getStyle: _.constant(null),
                buttons: []
            };
        },
        getInitialState: function () {
            return {
                imageIndex: 0,
                style: {}
            };
        },
        componentWillReceiveProps: function (nexProps) {
            if (this.state.imageIndex >= this.getNumberOfImages(nexProps)) {
                this.setState({
                    imageIndex: 0
                });
            }
        },
        getButtons: function () {
            var buttons = this.props.buttons;
            if (!buttons) {
                buttons = [];
            } else if (!_.isArray(buttons)) {
                buttons = [buttons];
            }
            return buttons;
        },
        updateStyle: function () {
            this.setState({
                style: this.props.getStyle(this._getImages()[this.state.imageIndex])
            });
        },
        getStyle: function () {
            return this.state.style;
        },
        getButtonIcon: function (button) {
            return this.isEmpty() ? button.emptyButtonIcon : button.nonEmptyButtonIcon;
        },
        getButtonLabel: function (button) {
            return this.isEmpty() ? button.emptyButtonLabel : button.nonEmptyButtonLabel;
        },
        getButtonTooltip: function (button) {
            return this.isEmpty() ? button.emptyButtonTooltip : button.nonEmptyButtonTooltip;
        },
        _showImage: function (imageIndex) {
            var images = this._getImages();
            if (imageIndex < 0) {
                imageIndex = images.length - 1;
            } else if (imageIndex === images.length) {
                imageIndex = 0;
            }
            this.setState({
                imageIndex: imageIndex
            });
        },
        showPrevImage: function () {
            this._showImage(this.state.imageIndex - 1);
        },
        showNextImage: function () {
            this._showImage(this.state.imageIndex + 1);
        },
        getURL: function () {
            return this.props.getURL(this._getImages()[this.state.imageIndex]);
        },
        _getImages: function (props) {
            var images = this.getValueFromProps(props);
            if (!images) {
                images = [];
            } else if (!_.isArray(images)) {
                images = [images];
            }
            return images;
        },
        getNumberOfImages: function (props) {
            return this._getImages(props).length;
        },
        isEmpty: function () {
            return this._getImages().length === 0 || !this.getURL();
        },
        onClick: function (button) {
            button.onClick(this.callOnChangeIfExists);
        },
        getButtonClasses: function (button) {
            return {
                action: true,
                'has-icon': !!this.getButtonIcon(button),
                'has-label': !!this.getButtonLabel(button)
            };
        },
        render: template
    });
});
