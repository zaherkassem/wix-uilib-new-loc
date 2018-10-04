define(['react', 'lodash', 'core', 'util', 'baseUI/panelInputs/media/wixStaticMediaMixin', 'baseUI/panelInputs/media/imageChangeEditRemove.rt'], function (React, _, core, util, wixStaticMediaMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'imageChangeEditRemove',
        mixins: [core.mixins.editorAPIMixin, util.propTypesFilterMixin, util.valueLinkMixin, wixStaticMediaMixin],
        propTypes: {
            removeButtonLabel: React.PropTypes.string
        },
        getRemoveButton: function () {
            return {
                nonEmptyButtonIcon: 'delete',
                nonEmptyButtonTooltip: 'strip_settings_Tooltip_Remove',
                onClick: this._removeImage
            };
        },
        getEditButton: function () {
            return {
                nonEmptyButtonIcon: 'image-effects',
                nonEmptyButtonTooltip: 'strip_settings_Tooltip_Crop',
                onClick: this._openAviary
            };
        },
        getAdditionalButtons: function () {
            if (!this.hasImage()) {
                return [];
            }
            return [this.getRemoveButton(), this.getEditButton()];
        },
        _removeImage: function (doneCB) {
            doneCB(this.getEmptyImageData());
        },
        _openAviary: function () {
            this.getEditorAPI().openAviaryPanel(this.props.valueLink || {
                    value: this.props.value,
                    requestChange: this.props.onChange
                });
        },
        hasImage: function () {
            var value = this.getValueFromProps();
            return !_.isEmpty(value && this.getURL(value));
        },
        render: template
    });
});
