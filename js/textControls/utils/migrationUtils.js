define(['lodash', 'textControls/utils/textMigrationHandler'], function(_, textMigrationHandler) {
    'use strict';

    function isOldTextComponent(textComponent, documentServices) {
        var compData = documentServices.components.data.get(textComponent);
        return compData.type !== 'StyledText' && compData.type !== 'MediaRichText';
    }

    function migrateComponentData(compData, themeFonts, themeColors, defaultTag, defaultClass) {
        var migratedText = textMigrationHandler.migrateText(compData.text, themeFonts, themeColors, defaultTag, defaultClass);

        function isOldDataKey(value, key) {
            return !_.includes(['id', 'metaData'], key);
        }

        var migratedData = _.omit(compData, isOldDataKey);
        migratedData.type = 'StyledText';
        migratedData.stylesMapId = 'CK_EDITOR_PARAGRAPH_STYLES';
        migratedData.text = migratedText;

        return migratedData;
    }

    function migrateComponent(textComponent, documentServices) {
        var compData = documentServices.components.data.get(textComponent);

        compData = migrateComponentData(compData, documentServices.theme.fonts.getAll(), documentServices.theme.colors.getAll());
        //update data item
        documentServices.components.data.update(textComponent, compData, true);
        //update component to the new style
        documentServices.components.style.setId(textComponent, 'txtNew');
    }

    return {
        isOldTextComponent: isOldTextComponent,
        migrateComponent: migrateComponent
    };
});
