define(['react', 'lodash', 'core', 'util', 'baseUI/panelInputs/media/wixStaticMediaMixin', 'baseUI/panelInputs/media/imageChangeEdit.rt'], function (React, _, core, util, wixStaticMediaMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'imageChangeEdit',
        mixins: [core.mixins.editorAPIMixin, util.propTypesFilterMixin, util.valueLinkMixin, wixStaticMediaMixin],
        propTypes: {
            editButtonLabel: React.PropTypes.string.isRequired,
            addButtonLabel: React.PropTypes.string
        },
        getEditButton: function () {
            var value = this.getValueFromProps();
            if (!_.isEmpty(value && this.getURL(value))) {
                return {
                    nonEmptyButtonLabel: this.props.editButtonLabel,
                    nonEmptyButtonIcon: 'image-effects',
                    onClick: this._openAviary
                };
            }
        },
        _openAviary: function () {
            this.getEditorAPI().openAviaryPanel(this.props.valueLink);
        },
        render: template
    });
});
