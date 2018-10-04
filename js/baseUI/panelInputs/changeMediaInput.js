define(['react', 'lodash', 'util', 'baseUI/mixins/mediaServicesMixin', 'baseUI/panelInputs/changeMediaInput.rt', 'baseUI/panelInputs/inputMixin'], function (React, _, util, mediaServicesMixin, template, inputMixin) {
    'use strict';

    var mediaTypes = {
        'Image': 'IMAGE',
        'SingleAudioPlayer': 'MUSIC',
        'AudioPlayer': 'MUSIC',
        'Default': 'DOCUMENT',
        'Flash': 'FLASH'
    };

    var selectionTypes = {
        'MULTIPLE': 'multiple',
        'SINGLE': 'single'
    };

    return React.createClass({
        displayName: 'changeMediaButton',
        mixins: [inputMixin, mediaServicesMixin],
        propTypes: {
            mediaType: React.PropTypes.oneOf(_.keys(mediaTypes)),
            buttonLabelWithItems: React.PropTypes.string,
            buttonLabelWithoutItems: React.PropTypes.string,
            value: React.PropTypes.string,
            selectionType: React.PropTypes.oneOf(_.values(selectionTypes)),
            mediaManagerHeaderLabel: React.PropTypes.string,
            mediaManagerButtonLabel: React.PropTypes.string
        },
        getButtonLabel: function () {
            return this.hasFile() ? this.props.buttonLabelWithItems : this.props.buttonLabelWithoutItems;
        },
        getDefaultProps: function () {
            return { mediaType: 'Default', buttonLabelWithItems: 'CHANGE_MEDIA', buttonLabelWithoutItems: 'ADD_MEDIA', selectionType: 'multiple' };
        },
        openMediaFrame: function () {
            var mediaManager = this.getMediaServices().mediaManager;

            var mediaManagerKeys;

            if (this.props.mediaManagerHeaderLabel || this.props.mediaManagerButtonLabel) {
                mediaManagerKeys = {};
                mediaManagerKeys.title = util.translate(this.props.mediaManagerHeaderLabel);
                mediaManagerKeys.submitButton = util.translate(this.props.mediaManagerButtonLabel);
            }

            mediaManager.open(mediaTypes[this.props.mediaType], {
                translation: mediaManagerKeys,
                callback: this.onClose,
                multiSelect: this.props.selectionType === selectionTypes.MULTIPLE
            });
        },
        getButtonProps: function () {
            var props = {
                className: 'btn-confirm-secondary upload-button no-margin',
                onClick: this.openMediaFrame,
                label: this.getButtonLabel()
            };
            if (this.hasFile()) {
                props.icon = 'organizeImagesIcon';
                props.className += ' has-file';
            }
            return props;
        },
        onClose: function (payload) {
            if (!payload) {
                return;
            }
            this.callOnChangeIfExists.apply(this, arguments);
        },
        hasFile: function () {
            return this.props.value;
        },
        render: template
    });
});
