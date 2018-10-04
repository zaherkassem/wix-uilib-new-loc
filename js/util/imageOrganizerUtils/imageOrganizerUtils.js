define([
    'util/translation/translate',
    'util/editorModel/editorModel',
    'experiment!organizeimagesrestyled',
    'experiment!organizeimagessettingsdialog'
], function (translate,
             editorModel,
             isOrganizeImagesRestyled,
             isOrganizeImagesSettingsDialog) {
    'use strict';

    var translationKeys = [
        'ORGANIZE_ICONS_DIALOG_TITLE',
        'OrganizeImages_IMAGES_DIALOG_TITLE',
        'ORGANIZE_IMAGES_DIALOG_DESC',
        'ORGANIZE_IMAGES_DIALOG_ADD',
        'ORGANIZE_IMAGES_DIALOG_REPLACE',
        'ORGANIZE_IMAGES_DIALOG_DONE',
        'ORGANIZE_IMAGES_DIALOG_CANCEL',
        'ORGANIZE_IMAGES_DIALOG_NO_IMG_SELECTED',
        'ORGANIZE_IMAGES_DIALOG_IMG_TITLE',
        'ORGANIZE_IMAGES_DIALOG_IMG_DESC',
        'ORGANIZE_IMAGES_DIALOG_IMG_TITLE_PLACEHOLDER',
        'ORGANIZE_IMAGES_DIALOG_IMG_DESC_PLACEHOLDER',
        'ORGANIZE_IMAGES_DIALOG_IMG_LINK',
        'ORGANIZE_IMAGES_DIALOG_IMG_LINK_PLACEHOLDER',
        'ORGANIZE_IMAGES_DIALOG_IMG_TITLE_TOOLTIP',
        'ORGANIZE_IMAGES_DIALOG_IMG_DESC_TOOLTIP',
        'ORGANIZE_IMAGES_DIALOG_EMPTY_MSG',
        'ORGANIZE_IMAGES_DIALOG_CONFIRM_YES',
        'ORGANIZE_IMAGES_DIALOG_CONFIRM_NO',
        'ORGANIZE_IMAGES_DIALOG_CONFIRM_HEADER',
        'ORGANIZE_IMAGES_DIALOG_CONFIRM_MSG',
        'ORGANIZE_IMAGES_DIALOG_SETS_TITLE',
        'ORGANIZE_IMAGES_DIALOG_SETS_ADD_PLACE',
        'Organize_Images_Dialog_Sets_Add_Title',
        'Organize_Images_Dialog_Sets_Button_Set',
        'Organize_Images_Dialog_Sets_Add_Place_Start',
        'Organize_Images_Dialog_Sets_Add_Place_End',
        'Organize_Images_Dialog_Sets_Add_Place_After',
        'Organize_Images_Dialog_Sets_Add_Title_With',
        'Organize_Images_Dialog_Sets_Add_Title_Without'
    ];

    function overrideSocialMediaTranslations(map) {
        map.ORGANIZE_IMAGES_DIALOG_TITLE = translate('ORGANIZE_ICONS_DIALOG_TITLE');
        map.ORGANIZE_IMAGES_DIALOG_DESC = translate('ORGANIZE_ICONS_DIALOG_TEXT');
        map.ORGANIZE_IMAGES_DIALOG_ADD = translate('ORGANIZE_ICONS_BUTTON_TEXT');
        map.ORGANIZE_IMAGES_DIALOG_EMPTY_MSG = translate('ORGANIZE_ICONS_DIALOG_EMPTY_MSG');
        map.ORGANIZE_IMAGES_DIALOG_REPLACE = translate('ORGANIZE_ICONS_DIALOG_REPLACE');
        map.ORGANIZE_IMAGES_DIALOG_IMG_LINK = translate('ORGANIZE_ICONS_DIALOG_IMG_LINK');
        map.ORGANIZE_IMAGES_DIALOG_IMG_LINK_PLACEHOLDER = translate('ORGANIZE_ICONS_DIALOG_IMG_LINK_PLACEHOLDER');
        map.ORGANIZE_IMAGES_DIALOG_NO_IMG_SELECTED = translate('ORGANIZE_ICONS_DIALOG_NO_IMG_SELECTED');
    }

    function getTranslation(galleryType) {
        var keys = translationKeys,
            translation = {};

        keys.forEach(function (key) {
            translation[key] = translate(key);
        });

        if (galleryType === 'socialIcons') {
            overrideSocialMediaTranslations(translation);
        }

        return {
            lang: 'EN', //TODO: this.resources.W.Config.getLanguage(),
            map: translation
        };
    }

    function getFrameUrl(galleryType) {
        //TODO: Should consider serverTopology + path to Organize Images
        var base = editorModel.editorBase || '/editor-base';
        var folderName = isOrganizeImagesRestyled ? 'OrganizeImagesV2' : 'OrganizeImages';
        var organizeImagesSettingsDialog = isOrganizeImagesSettingsDialog ? 'organizeimagessettingsdialog' : '';
        var experiments = organizeImagesSettingsDialog ? '&experiments=' + organizeImagesSettingsDialog : '';
        return base + '/app/external/' + folderName + '/index.html?galleryType=' + galleryType + experiments;
    }

    return {
        getTranslation: getTranslation,
        getFrameUrl: getFrameUrl
    };
});
