define(['lodash', 'textControls/utils/textStylesMigration', 'textControls/utils/textSimpleFormatMigration'], function(_, textStylesMigration, textSimpleFormatMigration) {
    'use strict';

    /**
     *
     * @param html
     * @param defaultTag
     * @param defaultClass
     */
    function migrateText(html, themeFonts, themeColors, defaultTag, defaultClass) {
        defaultTag = defaultTag || 'p';
        defaultClass = defaultClass || 'font_8';
        if (!_.isString( html)) {
            //BI?
            return null;
        }
        if (html === ''){
            return _.template('<<%= defaultTag %> class="<%= defaultClass %>"></<%= defaultTag %>>')({
                defaultTag: defaultTag,
                defaultClass: defaultClass
            });
        }
        var container = document.createElement('div');
        container.innerHTML = html;
        textStylesMigration.migrateElement(container, defaultTag, defaultClass, themeFonts, themeColors);
        textSimpleFormatMigration.migrateElement(container);
        return container.innerHTML;
    }

    return {
        migrateText: migrateText
    };
});