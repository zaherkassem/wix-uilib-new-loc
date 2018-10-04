define(['react', 'baseUI', 'core'], function (React, UI, core) {
    'use strict';

    return {
        getTooltipValue: function (name, key) {
            if (name === 'bold' || name === 'italic' || name === 'underline') {
                return this.getTooltipWithShortcut(name, key);
            }
            return 'text_editor_buttons_tooltip_' + name;
        },
        getTooltipWithShortcut: function (name, key) {
            return React.createElement(UI.popoverTemplates.keyboardShortcutTooltip, {
                label: 'text_editor_buttons_tooltip_' + name,
                shortcut: core.constants.KEYBOARD_SPECIAL_KEY.label + ' + ' + key
            });

        }
    };
});
