define(['react', 'lodash', 'core', 'util', 'baseUI/panelInputs/media/wixStaticMediaMixin', 'baseUI/panelInputs/media/organizeImagesInput.rt'], function (React, _, core, util, wixStaticMediaMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'organizeImagesInput',
        mixins: [core.mixins.editorAPIMixin, wixStaticMediaMixin],
        getButton: function () {
            var editorAPI = this.getEditorAPI();
            return {
                nonEmptyButtonLabel: 'Gallery_Settings_Main_Action_Button',
                emptyButtonLabel: 'Gallery_Settings_Main_Action_Button_Empty',
                emptyButtonIcon: 'plus',
                onClick: editorAPI && editorAPI.openOrganizeImagesPanel
            };
        },
        render: template
    });
});
