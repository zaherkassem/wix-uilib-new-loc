/*globals CKEDITOR:true*/
define(['textControls/utils/constants', 'textControls/utils/fontUtils', 'util', 'textControls/utils/dataUtils', 'jquery', 'lodash'], function (consts, fontUtils, util, dataUtils, $, _) {
    'use strict';
    function getThemeColorData(themeFonts) {
        var colorArr = [];

        _.forEach(themeFonts, function (color, colorName) {
            var index = colorName.split('_')[1];
            colorArr[index] = color;
        });

        return {
            color: colorArr
        };
    }

    function loadFontsToCK(ckEditor, fontsData) {
        var doc = ckEditor.editable().getDocument();
        _.forEach(fontsData.urls, function (url) {
            doc.appendStyleSheet(url);
        });
    }

    function updateThemeStyles(themeColors, stylesMap, themeFonts, editor) {
        var themeColorsData = getThemeColorData(themeColors);
        var cssString = fontUtils.createFontsCssString(themeColorsData, stylesMap, themeFonts);

        editor.document.appendStyleText(cssString);
    }

    function loadEditorFonts(editor, text, stylesMap, themeFonts, documentType, languages, themeColors) {
        updateThemeStyles(themeColors, stylesMap, themeFonts, editor);
        loadFontsToCK(editor, fontUtils.getFontsToLoad(text, documentType, languages, themeFonts));
    }

    function _rgba2hex(colorInRgba, withAlpha) {
        var rgba = colorInRgba.split(',');
        var hex = '#' + _formatHexColor(rgba[0]) + _formatHexColor(rgba[1]) + _formatHexColor(rgba[2]);
        if (withAlpha) {
            hex += _formatHexColor(rgba[3] * 255);
        }
        return hex;
    }

    function _formatHexColor(value) {
        value = value || '00';
        value = parseFloat(value);
        if (typeof value === 'number') {
            value = Math.round(value);
            value = value.toString(16);
        }
        while (value.length < 2) {
            value = '0' + value;
        }
        return value.toUpperCase();
    }

    function convertToHexColor(colorValue) {
        if (colorValue.indexOf('#') === 0) {
            return colorValue.toUpperCase();
        }

        return _rgba2hex(colorValue);
    }

    function _getHexColorsMap(classNamePrefix, themeColors) {
        var colorsMap = {};
        _.forEach(themeColors, function (color, colorClassName) {
            var colorKey = classNamePrefix + colorClassName;
            colorsMap[colorKey] = convertToHexColor(color);
        });

        return colorsMap;
    }

    function updateEditorConfig(editor, stylesMap, themeColors) {
        editor.config.stylesMap = stylesMap;
        editor.config.colorsMap = _getHexColorsMap('', themeColors);
        editor.config.bgColorsMap = _getHexColorsMap('back', themeColors);
        CKEDITOR.plugins.wixParser.resetTheMaps(editor.config);
    }

    function registerCustomFontLoader(editor, callback) {
        editor.on('beforeCommandExec', function (evtData) {
            var cmdName = evtData.data.name;
            if (cmdName !== 'fontFamily') {
                return;
            }
            var cmdValue = evtData.data.commandData;
            if (!cmdValue || cmdValue === consts.CK_OFF) {
                return;
            }

            var fontNames = cmdValue.replace(/"/g, '').split(',');

            callback(fontNames);
        });
    }

    //make sure that the text editor will receive focus after execute
    function setCommandAutoFocus(editor) {
        editor.getCommand('fontFamily').editorFocus = true;
        editor.getCommand('backColor').editorFocus = true;
        editor.getCommand('foreColor').editorFocus = true;
    }

    function createCKInstance(element, isFixedHeight, handleDataChange, handleSelectionChange, handleHeightChange, text, stylesMap, props, handleCKCreated, handleFocus, fontsDataGetter) {
        var parseHTML = $.parseHTML(text);
        if (parseHTML && parseHTML.length === 1 && parseHTML[0].nodeType === 3) {
            //input text is a plain text, need to wrap it into html
            text = '<p>' + text + '</p>';
        }
        /*eslint-disable*/

        var ckEditor = CKEDITOR.replace(element, {
            customConfig: 'my/myConfig.js',
            removePlugins: 'resize' + (isFixedHeight ? ',autogrow' : ''),
            autoGrow_maxHeight: (isFixedHeight ? 0 : consts.TEXT_COMP_MAX_HEIGHT),
            autoGrow_minHeight: (isFixedHeight ? 0 : props.position.height)
        });
        /*eslint-enable*/

        ckEditor.on('instanceReady', function (evt) {
            var editor = evt.editor;
            var iframe = editor.document.$.defaultView.frameElement;
            setCommandAutoFocus(editor);
            refreshHeightConfig();
            if (util.url.isTrue('isqa')) {
                /*eslint-disable*/
                //Add id to CK editor iframe - this is done for Automation test
                iframe.id = 'CurrentTextEditor';
                /*eslint-enable*/
            }

            editor.container.hide();

            editor.on('change', handleDataChange, this);
            editor.on('selectionChange', handleSelectionChange);
            editor.on('selectionCheck', handleSelectionChange);

            editor.on('resize', function (evtData) {
                var newHeight = evtData.data.newHeight;
                if (_.isNumber(newHeight) && newHeight !== evtData.data.oldHeight) {
                    handleHeightChange(newHeight);
                }
            });

            $(iframe).bind('mousewheel', function (e) {
                if (isFixedHeight) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });

            updateEditorConfig(editor, stylesMap, props.themeColors);

            editor.on('dataReady', function () {
                loadEditorFonts(
                    editor,
                    text,
                    stylesMap,
                    props.themeFonts,
                    props.documentType,
                    props.languages,
                    props.themeColors
                );
            });

            editor.setData(
                text,
                {
                    noSnapshot: true,
                    callback: function () {
                        editor.resetUndo(); // reset the undo stack after data is ready
                        if (props.position) {
                            setEditorSize(editor, props.position.height, props.position.width);
                            setViewerCss(editor);
                            setOverflowCss(editor, isFixedHeight);
                        }

                        if (handleCKCreated) {
                            setTimeout(handleCKCreated, 250); //delay of 250 milliseconds should be enough for the fonts to load
                        }
                    }
                }
            );

            editor.on('focus', handleFocus);

            registerCustomFontLoader(editor, function (fontNames) {
                var fontsData = fontsDataGetter(fontNames);
                loadFontsToCK(editor, fontsData);
            });
        });

        return ckEditor;
    }

    function isCKLoaded() {
        /*eslint-disable*/
        return CKEDITOR && CKEDITOR.status === 'loaded';
        /*eslint-enable*/
    }

    function isEditorReady(editor) {
        return editor && editor.status === 'ready';
    }

    function getData(editor) {
        //call fix dom to make sure the html is correct without orphan text that is not styled
        editor.plugins.wixpreservestyle.fixDom(editor);

        //Due to bugs in removeRedundantNodesAndAttributes it is commented out - need to think of a better solution for secure text
        // dataUtils.removeRedundantNodesAndAttributes(editor.editable().$);
        return dataUtils.removeHtmlComments(editor.getData());
    }

    function createLink(linkId, editor) {
        editor.execCommand('wixLink', {'dataQuery': '#' + linkId});
        editor.execCommand('underline');
        if (editor.getCommand('underline') === consts.CK_OFF) {
            editor.execCommand('underline');
        }
    }

    function selectAll(editor) {
        var range = editor.createRange();
        range.selectNodeContents(editor.document.getBody());
        range.select();
    }

    function prepareClosing(editor) {
        editor.setReadOnly(true);
        editor.getSelection().removeAllRanges();
    }

    function setEditorSize(editor, height, width) {
        editor.resize(width || '100%', height, true, false, false);
    }

    function refreshHeightConfig() {
        if (CKEDITOR.plugins.autogrow && CKEDITOR.plugins.autogrow.refreshHeightConfig) {
            CKEDITOR.plugins.autogrow.refreshHeightConfig();
        }
    }

    function focus(editor) {
        var sel = editor.getSelection();
        if (isEditorReady(editor)) {
            sel.ignoreFillingCharRemoveOnSelectionChange();
            editor.focus();
            sel.resumeFillingCharRemoveOnSelectionChange();
        }
    }

    function toggleSelectionToTransparent(editor, shouldEnable) {

        var doc = editor.editable().getDocument().$;
        var transparentStyleSheet = $(doc).find('#transparentSelectionCss');

        if (shouldEnable) {
            if (transparentStyleSheet.length === 0) {
                $(doc).find('head').append('<style id="transparentSelectionCss">body ::selection{background: transparent;} body::-moz-selection{background: transparent;}</style>');
            }
        } else if (transparentStyleSheet) {
            transparentStyleSheet.remove();
        }
    }

    function setOverflowCss(editor, isFixedHeight) {

        var doc = editor.editable().getDocument().$;
        if (!isFixedHeight) {
            $(doc).find('head').append('<style id="overflowCss">body {overflow: hidden !important;}</style>');
        }

    }

    function setViewerCss(editor) {
        var doc = editor.editable().getDocument().$;
        var url = util.serviceTopology.scriptsLocationMap['santa-versions'] + '/viewer.css';
        var t = '<link rel="stylesheet" href="' + url + '" type="text/css" charset="utf-8"></link>';
        $(doc).find('head').append(t);

    }

    function afterUndoRedoCallback(callback, isUndo, editor) {
        var snapshot = editor.undoManager.currentImage;

        var eventName = isUndo ? 'afterUndo' : 'afterRedo';
        var cmdName = isUndo ? 'undo' : 'redo';

        var undoCmd = editor.getCommand(cmdName);
        if (undoCmd) {
            undoCmd.on(eventName, function(){
                if (snapshot.equalsContent(editor.undoManager.currentImage)) {
                    callback();
                }
            });
        }
    }

    return {
        convertToHexColor: convertToHexColor,
        createCKInstance: createCKInstance,
        isCKLoaded: isCKLoaded,
        isEditorReady: isEditorReady,
        getData: getData,
        createLink: createLink,
        selectAll: selectAll,
        prepareClosing: prepareClosing,
        focus: focus,
        toggleSelectionToTransparent: toggleSelectionToTransparent,
        updateThemeStyles: updateThemeStyles,
        loadFontsToCK: loadFontsToCK,
        afterUndoRedoCallback: afterUndoRedoCallback
    };
});
