define([], function () {
    'use strict';

    return {
        getEditor: function () {
            if (!this.textEditor) {
                this.textEditor = this.getEditorAPI().text.getEditor();
            }
            return this.textEditor;
        },
        getThemeFonts: function () {
            return this.getEditorAPI().theme.fonts.getAll();
        },
        execCommand: function (commandName, params) {
            var editor = this.getEditor();
            if (editor) {
                editor.execCommand(commandName, params);
            }
        },
        getValue: function (commandName) {
            var editor = this.getEditor();
            if (editor) {
                return editor.getValue(commandName);
            }

            return '';
        },
        getBooleanValue: function (commandName) {
            var editor = this.getEditor();
            if (editor) {
                return editor.getBooleanValue(commandName);
            }

            return false;
        },
        getListType: function () {
            var editor = this.getEditor();
            if (editor) {
                return editor.getListType();
            }

            return '';
        },
        getTextAlignment: function () {
            var editor = this.getEditor();
            if (editor) {
                return editor.getTextAlignment();
            }

            return '';
        },
        selectionChange: function () {
            this.forceUpdate();
        },
        componentDidMount: function () {
            var editor = this.getEditor();
            if (editor) {
                editor.registerOnSelectionChange(this.selectionChange);
            }
        },
        componentWillUnmount: function () {
            var editor = this.getEditor();
            if (editor) {
                editor.unregisterOnSelectionChange(this.selectionChange);
            }
        },
        changeFontFamily: function (value) {
            var editor = this.getEditor();
            if (editor) {
                editor.changeFontFamily(value);
            }
        },
        execListCommand: function (newListType) {
            var editor = this.getEditor();
            if (editor) {
                editor.execListCommand(newListType);
            }
        },
        execLineHeightCommand: function (newLineHeight) {
            var editor = this.getEditor();
            if (editor) {
                editor.execLineHeightCommand(newLineHeight);
            }
        },
        changeAlignment: function (newAlignment) {
            var editor = this.getEditor();
            if (editor) {
                editor.changeAlignment(newAlignment);
            }
        },
        changeTextShadow: function (newShadow) {
            var editor = this.getEditor();
            if (editor) {
                editor.changeTextShadow(newShadow);
            }
        },
        getTextShadowValue: function () {
            var editor = this.getEditor();
            if (editor) {
                return editor.getTextShadowValue();
            }

            return '';
        },
        getLetterSpacingValue: function () {
            var editor = this.getEditor();
            if (editor) {
                return editor.getLetterSpacingValue();
            }

            return '';
        },
        getLineHeightValue: function () {
            var editor = this.getEditor();
            if (editor) {
                return editor.getLineHeightValue();
            }

            return '';
        },
        getBackColorValue: function (dropDownValue) {
            var editor = this.getEditor();
            if (editor) {
                return editor.getBackColorValue(dropDownValue);
            }
        },
        getLink: function () {
            var editor = this.getEditor();
            if (editor) {
                editor.getLink();
            }
        },
        openLinkDialog: function () {
            var editor = this.getEditor();
            if (editor) {
                editor.openLinkDialog();
            }
        },
        openColorPicker: function (isForeColor, position) {
            var editor = this.getEditor();
            if (editor) {
                editor.openColorPicker(isForeColor, position);
            }
        },
        handleColorClick: function (isForeColor, position) {
            var editor = this.getEditor();
            if (editor) {
                editor.handleColorClick(isForeColor, position);
            }
        },
        getFormatBlockValue: function () {
            var editor = this.getEditor();
            if (editor) {
                return editor.getFormatBlockValue();
            }

            return '';
        },
        execNoBackColor: function (){
            var editor = this.getEditor();
            if (editor) {
                editor.execNoBackColor();
            }
        },
        execFormatBlockCommand: function (blockValue) {
            var editor = this.getEditor();
            if (editor) {
                editor.execFormatBlockCommand(blockValue);
            }
        },
        openLanguageSupport: function () {
            var editor = this.getEditor();
            if (editor) {
                editor.openLanguageSupport();
            }
        },
        focus: function () {
            var editor = this.getEditor();
            if (editor) {
                editor.focus();
            }
        },
        hasLink: function () {
            var editor = this.getEditor();
            if (editor) {
                return editor.hasLink();
            }
        },
        isCustomStyle: function() {
            var editor = this.getEditor();
            if (editor) {
                return editor.isCustomStyle();
            }
        },
        getBoldProps: function() {
            var editor = this.getEditor();
            if (editor) {
                return editor.getBoldProps();
            }
        },
        getItalicProps: function() {
            var editor = this.getEditor();
            if (editor) {
                return editor.getItalicProps();
            }
        },
        registerSaveThemeUndoRedoHandler: function(callback, isUndo) {
            var editor = this.getEditor();
            if (editor) {
                return editor.registerSaveThemeUndoRedoHandler(callback, isUndo);
            }
        },
        registerRedoCallback: function(callback) {
            var editor = this.getEditor();
            if (editor) {
                return editor.registerRedoCallback(callback);
            }
        }
    };
});
