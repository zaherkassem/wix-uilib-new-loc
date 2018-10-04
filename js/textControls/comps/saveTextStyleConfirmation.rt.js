define([
    'react/addons',
    'lodash',
    'panels',
    'core'
], function (React, _, panels, core) {
    'use strict';
    return function () {
        return React.createElement(panels.frames.messagePanelFrame, {
            'ref': 'frame',
            'key': 'saveTextConfirmationPanel',
            'panelName': this.props.panelName,
            'className': 'text-style-save-confirm-panel',
            'onConfirm': this.props.onConfirm,
            'panelTitle': this.translateIfNeeded('text_editor_save_theme_dialog_header'),
            'confirmLabel': 'text_editor_save_theme_confirm_button',
            'editorAPI': this.getEditorAPI(),
            'dontShowAgainKey': core.constants.USER_PREFS.TEXT.SAVE_THEME.DONT_SHOW_AGAIN,
            'userPrefType': 'session'
        }, React.createElement('div', { 'className': 'text-style-save-confirm-content' }, React.createElement('p', {}, React.createElement('span', {}, this.translateIfNeeded('text_editor_save_theme_dialog_text_1')), React.createElement('span', { 'className': 'bold' }, ' \'', this.props.textStyleName, '\' '), React.createElement('span', {}, this.translateIfNeeded('text_editor_save_theme_dialog_text_2')))));
    };
});