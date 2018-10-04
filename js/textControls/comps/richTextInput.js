define([
    'react-dom',
    'react',
    'lodash',
    'jquery',
    'textControls/comps/richTextInput.rt',
    'util',
    'textControls/utils/ckUtils',
    'textControls/utils/constants',
    'textControls/utils/fontUtils',
    'baseUI',
    'textControls/mixins/textTooltipMixin',
    'textControls/utils/shadowUtils'
], function(
    ReactDOM,
    React,
    _,
    $,
    template,
    utils,
    ckUtils,
    CONSTANTS,
    fontUtils,
    baseUI,
    textTooltipMixin,
    shadowUtils) {
    'use strict';

    var STYLECOMMANDS = ['bold', 'fontSize', 'fontFamily', 'foreColor', 'italic'];

    function isStyleCommand(commandName) {
        return _.includes(STYLECOMMANDS, commandName);
    }

    function calculateStyledValue(commandName, editorValue, styleData, normalizedCssToFont) {
        if (styleData) {
            switch (commandName) {
                case 'fontSize':
                    return (editorValue === CONSTANTS.CK_OFF) ? parseInt(styleData.size, 10) : parseInt(editorValue, 10);
                case 'bold':
                    return (styleData.weight === 'normal' && editorValue === CONSTANTS.CK_OFF) ? CONSTANTS.CK_OFF : CONSTANTS.CK_ON;
                case 'italic':
                    return (styleData.style === 'normal' && editorValue === CONSTANTS.CK_OFF) ? CONSTANTS.CK_OFF : CONSTANTS.CK_ON;
                case 'fontFamily':
                    if (editorValue === CONSTANTS.CK_OFF) {
                        return fontUtils.getFont(styleData.family).fontFamily;
                    }

                    var normalizedValue = normalizeCss(editorValue);
                    if (normalizedCssToFont[normalizedValue]) {
                        return normalizedCssToFont[normalizedValue].fontFamily;
                    }

                    return '';
                case 'foreColor':
                    return (editorValue === CONSTANTS.CK_OFF) ? styleData.cssColor : editorValue;
            }
            return editorValue;
        }
    }


    function getTagFontStyle(editor, themeColors, themeFonts) {
        var nodeType = editor.getCommand('formatBlock').state;
        if (!CONSTANTS.DEFAULT_STYLES_MAP[nodeType]) {
            nodeType = editor.plugins.wixpreservestyle.getSavedStyles(editor).formatBlock;
        }
        return fontUtils.getStyleFont(nodeType, CONSTANTS.DEFAULT_STYLES_MAP, themeColors, themeFonts);
    }

    function normalizeCss(fontCss) {
        return typeof fontCss === 'string' ?
            fontCss.toLowerCase().replace(/['"\s]/g, '') : fontCss;
    }

    function calcFontsMaps(languagesFonts) {
        var normalizedCssToFont = {};
        var fontFamilyToCss = {};
        _.forEach(languagesFonts, function (languageFonts) {
            _.forEach(languageFonts.fonts, function (font) {
                normalizedCssToFont[normalizeCss(font.cssFontFamily)] = font;
                fontFamilyToCss[(font.fontFamily)] = font.cssFontFamily;
            });
        });

        return {
            normalizedCssToFont: normalizedCssToFont,
            fontFamilyToCss: fontFamilyToCss
        };
    }

    function findColorInThemeColors(color, themeColors) {
        var result = _.findKey(themeColors, function (colorOption) {
            return colorOption === color;
        });
        if (!_.includes(CONSTANTS.PALETTE_SEQUENCES, result)) {
            return color;
        }
        return result;
    }

    function getColorInHex(color) {
        var rgbToHex = utils.colors.rgbToHex;
        if (_.includes(color, 'rgba')) {
            return rgbToHex(utils.colors.rgbaStringToObject(color));
        } else if (_.includes(color, 'rgb')) {
            return rgbToHex(utils.colors.rgbStringToObject(color));
        }
        return color;
    }

    function wrapExecuteCommandFunc(textEditor, commandName) {
        return function () {
            textEditor.execCommand(commandName);
        };
    }

    return React.createClass({
        displayName: 'richTextInput',
        render: template,
        mixins: [utils.translationMixin, textTooltipMixin, utils.outerClickMixin, baseUI.inputMixin],
        propTypes: {
            themeColors: React.PropTypes.object.isRequired,
            themeFonts: React.PropTypes.object.isRequired,
            documentType: React.PropTypes.string.isRequired,
            languages: React.PropTypes.array.isRequired,
            fonts: React.PropTypes.array.isRequired,
            isFixedHeight: React.PropTypes.bool,
            isFocusOnInit: React.PropTypes.bool,
            selectAllOnInit: React.PropTypes.bool,
            onFocus: React.PropTypes.func,
            onBlur: React.PropTypes.func,
            hideToolbar: React.PropTypes.bool,
            openLinkDialog: React.PropTypes.func.isRequired,
            linkDialogPanelName: React.PropTypes.string,
            openColorPicker: React.PropTypes.func.isRequired,
            colorPickerPanelName: React.PropTypes.string
        },
        onOuterClick: function () {
            // ckUtils.prepareClosing(this.editor);
            if (!this.props.hideToolbar && this._isFocused && !this.isAnySubPanelOpen()) {
                this._isFocused = false;

                if (this.props.onBlur) {
                    this.props.onBlur();
                }
            }
        },
        handleFocus: function () {
            if (this.props.hideToolbar && !this._isFocused) {
                this._isFocused = true;

                if (this.props.onFocus) {
                    this.props.onFocus();
                }
                //this.closeDropDownsAndPopUps();
            }
        },
        isAnySubPanelOpen: function () {
            var isThemeDropdownOpen = this.refs.textStyle.isExpanded();
            var isFontFamilyDropdownOpen = this.refs.fontFamily.isExpanded();
            var isTextBulletsDropdownOpen = (this.refs.textBullets) ? this.refs.textBullets.isExpanded() : false;
            var isTextAlignDropdownOpen = (this.refs.textAlign) ? this.refs.textAlign.isExpanded() : false;
            var isBackColorDropDownOpen = (this.refs.backColorButton && this.refs.backColorButton.refs.dropdown) ? this.refs.backColorButton.refs.dropdown.isExpanded() : false;

            return this.isColorPickerOpen || this.isLinkDialogOpen || isThemeDropdownOpen || isFontFamilyDropdownOpen || isTextBulletsDropdownOpen || isTextAlignDropdownOpen || isBackColorDropDownOpen;

        },
        focus: function () {
            var editor = this.editor;
            setTimeout(function () {
                ckUtils.focus(editor);
            }, 0);
        },
        //closeDropDownsAndPopUps: function () {
        //    if (this.refs.fontFamily) {
        //        this.refs.fontFamily.hideDropDown();
        //    }
        //},
        handleHeightChange: function (newHeight) {
            if (this.props.onHeightChange && this.isReady()) {
                this.props.onHeightChange(newHeight);
            }
        },
        handleCKCreated: function () {
            if (this.props.onShow) {
                this.props.onShow(this.showEditor);
            } else {
                this.showEditor();
            }
        },
        fontsDataGetter: function(fontNames) {
            var url = fontUtils.getFontsUrlWithParams(
                fontNames,
                this.props.documentType,
                this.props.languages
            );

            return {
                fonts: fontNames,
                urls: [url]
            };
        },
        createCK: function () {
            if (ckUtils.isCKLoaded()) {
                this.editor = ckUtils.createCKInstance(
                    ReactDOM.findDOMNode(this.refs.editorContainer),
                    this.props.isFixedHeight,
                    this.handleDataChange,
                    this.handleSelectionChange,
                    this.handleHeightChange,
                    this.getValueFromProps().text,
                    CONSTANTS.DEFAULT_STYLES_MAP,
                    this.props,
                    this.handleCKCreated,
                    this.handleFocus,
                    this.fontsDataGetter
                );
            } else {
                setTimeout(this.createCK, 50);
            }
        },
        showEditor: function () {
            this.editor.container.show();

            if (this.props.isFocusOnInit) {
                ckUtils.focus(this.editor);
            }

            if (this.props.selectAllOnInit) {
                ckUtils.selectAll(this.editor);
            }
        },
        getDefaultProps: function () {
            return {
                isFocusOnInit: true
            };
        },
        getInitialState: function () {
            return {
                extraToolbarOpened: false
            };
        },
        handleDataChange: function () {
            if (this.isReady()) {
                var data = ckUtils.getData(this.editor);
                if (data !== this._internalTextValue) {
                    this._internalTextValue = data;
                    this.callOnChangeIfExists({
                        text: data,
                        linkList: this._links
                    });
                }
            }
        },
        cacheLinks: function () {
            if (this.getValueFromProps().linkList) {
                this._links = _.cloneDeep(this.getValueFromProps().linkList);
            } else {
                this._links = [];
            }
        },
        componentDidMount: function () {
            this.createCK();
            this.fontsMaps = calcFontsMaps(this.props.fonts);
            if (this.props.position && this.props.position.height) {
                this.originalHeight = this.props.position.height;
            }

            this._internalTextValue = this.getValueFromProps().text;
            this.cacheLinks();
        },
        componentWillUnmount: function () {
            if (ckUtils.isEditorReady(this.editor)) {
                this.editor.destroy();
            }
        },
        getPosition: function () {
            if (this.props.position) {
                return {
                    style: {
                        top: this.props.position.y,
                        left: this.props.position.x,
                        width: this.props.position.width,
                        height: this.props.position.height
                    }
                };
            }

            return {};
        },
        getValue: function (commandName) {
            if (ckUtils.isEditorReady(this.editor)) {
                var editorValue = this.editor.getCommand(commandName).state;

                if (isStyleCommand(commandName)) {

                    var styleData = getTagFontStyle(this.editor, this.props.themeColors, this.props.themeFonts);
                    return calculateStyledValue(commandName, editorValue, styleData, this.fontsMaps.normalizedCssToFont);
                }
                return editorValue;
            }

            return '';
        },
        getBooleanValue: function (commandName) {
            if (ckUtils.isEditorReady(this.editor)) {
                return this.getValue(commandName) === 1;
            }
            return false;
        },
        getTextAlignment: function () {
            if (ckUtils.isEditorReady(this.editor)) {
                var self = this;
                return _.find(CONSTANTS.ALIGNMENT_TYPES, function (alignment) {
                    return self.editor.getCommand(alignment).state === CONSTANTS.CK_ON;
                });
            }

            return '';
        },
        getBulletsItems: function () {
            var items = (this.getBooleanValue('bidiltr')) ? CONSTANTS.TEXT_LIST_TYPES : CONSTANTS.TEXT_LIST_TYPES_RTL;
            return items;
        },
        getBulletsIconName: function () {
            var iconName = (this.getBooleanValue('bidiltr')) ? 'textListBullets' : 'textListBulletsRight';
            return iconName;
        },
        getListType: function () {
            if (ckUtils.isEditorReady(this.editor)) {
                if (this.editor.getCommand(CONSTANTS.TEXT_LIST_TYPES.textListNumbers).state === CONSTANTS.CK_ON) {
                    return CONSTANTS.TEXT_LIST_TYPES.textListNumbers;
                } else if (this.editor.getCommand(CONSTANTS.TEXT_LIST_TYPES.textListBullets).state === CONSTANTS.CK_ON) {
                    return CONSTANTS.TEXT_LIST_TYPES.textListBullets;
                }
            }

            return CONSTANTS.TEXT_LIST_TYPES.textListNone;
        },
        getTextShadowValue: function () {
            if (ckUtils.isEditorReady(this.editor)) {
                var shadowState = this.editor.getCommand('textShadow').state;
                if (shadowState !== CONSTANTS.CK_OFF) {
                    var foundEffect = _.findKey(CONSTANTS.EFFECTS, function (effect) {
                        if (effect.value !== CONSTANTS.CK_OFF) {
                            return shadowUtils.cssTextShadowCompare(effect.value, shadowState);
                        }
                    });

                    if (foundEffect) {
                        return foundEffect;
                    }
                }
            }

            return 'EFFECT_0';
        },
        changeTextShadow: function (newShadow) {
            var currentShadow = this.editor.getCommand('textShadow').state;
            var shadowEffect = currentShadow !== newShadow ? newShadow : CONSTANTS.CK_OFF;
            this.execCommand('textShadow', shadowEffect);
        },
        getLetterSpacingValue: function () {
            if (ckUtils.isEditorReady(this.editor)) {
                var value = this.getValue('letterSpacing');
                if (value === CONSTANTS.CK_OFF) {
                    return 0;
                }

                return parseFloat(value);
            }

            return '';
        },
        getLineHeightValue: function () {
            if (ckUtils.isEditorReady(this.editor)) {
                var value = this.getValue('lineHeight');
                if (value === CONSTANTS.CK_OFF) {
                    return 'auto';
                }
                return parseFloat(value);
            }

            return '';
        },
        getBackColorValue: function () {
            if (ckUtils.isEditorReady(this.editor)) {
                var value = this.getValue('backColor');
                if (value === CONSTANTS.CK_OFF) {
                    return null;
                }
                return value;
            }
        },
        getSelectionChangeCallbacks: function () {
            if (!this.selectionChangeCallbacks) {
                this.selectionChangeCallbacks = [];
            }

            return this.selectionChangeCallbacks;
        },
        registerOnSelectionChange: function (callback) {
            this.getSelectionChangeCallbacks().push(callback);
        },
        unregisterOnSelectionChange: function (callback) {
            _.remove(this.getSelectionChangeCallbacks(), function (cb) {
                return cb === callback;
            });
        },
        handleSelectionChange: function () {
            _.forEach(this.getSelectionChangeCallbacks(), function (cb) {
                cb();
            });

            if (!this.props.hideToolbar) {
                //we have a toolbar and we have to re-render the component so the buttons values\states will be updated
                this.forceUpdate();
            }
        },
        execCommand: function (commandName, params) {
            if (ckUtils.isEditorReady(this.editor)) {
                this.editor.execCommand(commandName, params);
                this.editor.fire('selectionCheck');
            }
        },
        handleClick: function () {
            this.handleFocus();
        },
        toggleToolbar: function () {
            var toggleValue = !this.state.extraToolbarOpened;
            this.setState({extraToolbarOpened: toggleValue});
        },
        changeAlignment: function (newAlignment) {
            if (newAlignment !== this.getTextAlignment()) {
                this.execCommand(newAlignment);
            }

            //always set focus back to ck editor, even if there was no change (user canceled change...)
            ckUtils.focus(this.editor);
        },
        execListCommand: function (newListType) {
            var currentListType = this.getListType();
            if (newListType !== currentListType) {
                if (newListType === CONSTANTS.TEXT_LIST_TYPES.textListNone) {
                    //will toggle off the current list type
                    this.execCommand(currentListType);
                } else {
                    //will toggle on the newListType, it is not 'none' and not on currently, otherwise it would not enter here because listType === this.getListType()
                    this.execCommand(newListType);
                }
            }

            //always set focus back to ck editor, even if there was no change (user canceled change...)
            ckUtils.focus(this.editor);
        },
        execLineHeightCommand: function (newLineHeight) {
            if (newLineHeight === 'auto') {
                this.execCommand('lineHeight', CONSTANTS.CK_OFF);
            } else {
                this.execCommand('lineHeight', newLineHeight + 'em');
            }

        },
        changeFontFamily: function (fontFamily) {
            this.execCommand('fontFamily', this.fontsMaps.fontFamilyToCss[fontFamily]);
            ckUtils.focus(this.editor);
        },
        getFormatBlockValue: function () {
            if (ckUtils.isEditorReady(this.editor)) {
                var blockTag = this.getValue('formatBlock');

                if (!CONSTANTS.DEFAULT_STYLES_MAP[blockTag]) {
                    blockTag = this.editor.plugins.wixpreservestyle.getSavedStyles(this.editor).formatBlock;
                }

                return CONSTANTS.DEFAULT_STYLES_MAP[blockTag].cssClass;
            }

            return '';
        },
        execFormatBlockCommand: function (blockValue) {
            var newBlockTag = _.findKey(CONSTANTS.DEFAULT_STYLES_MAP,
                function (style) {
                    return style.cssClass === blockValue;
                }
            );

            this.execCommand('formatBlock', newBlockTag);

            //always set focus back to ck editor, even if there was no change (user canceled change...)
            ckUtils.focus(this.editor);
        },
        componentDidUpdate: function (prevProps, prevState) {
            var languagesDiff = _.difference(this.props.languages, prevProps.languages);
            if (languagesDiff.length > 0) {
                var urls = fontUtils.getWixStoredFontsCss(languagesDiff);
                ckUtils.loadFontsToCK(this.editor, {urls: urls});
            }

            if (!_.isEqual(prevProps.fonts, this.props.fonts)) {
                this.fontsMaps = calcFontsMaps(this.props.fonts);
            }

            if (!_.isEqual(prevProps.themeFonts, this.props.themeFonts)) {
                ckUtils.updateThemeStyles(this.props.themeColors, CONSTANTS.DEFAULT_STYLES_MAP, this.props.themeFonts, this.editor);
            }

            //check if the value from props is different than internal text value
            //this check is done here instead of shouldComponentUpdate, because we are using force update
            //that doesn't call shouldComponentUpdate
            if (this.getValueFromProps().text !== this._internalTextValue) {
                this._internalTextValue = this.getValueFromProps().text;
                this.editor.setData(this.getValueFromProps().text);
            }

            if (!this.props.hideToolbar && prevState.extraToolbarOpened !== this.state.extraToolbarOpened) {
                var newHeight = this.editor.getResizable().getSize('height');
                if (this.state.extraToolbarOpened) {
                    newHeight -= 50;
                } else {
                    newHeight += 50;
                }

                this.editor.resize('100%', newHeight);
            }

            this.cacheLinks();
        },
        getCurrentLinkData: function () {
            var linkRef = this.getValue('wixLink');
            if (linkRef !== null && linkRef !== CONSTANTS.CK_OFF) {
                if (linkRef.charAt(0) === '#') {
                    linkRef = linkRef.substring(1);
                }

                return _.find(this._links, {id: linkRef});
            }
        },
        isLinkDialogClosed: function () {
            var linkDialogPanelName = this.props.linkDialogPanelName || 'panels.toolPanels.linkPanel';
            return this.isPanelClosed(linkDialogPanelName);
        },
        linkDialogObserver: function () {
            if (this.isLinkDialogClosed()) {
                this.focus();
                this.props.panelManager.unregisterObserver(this.linkDialogObserver);
                this.isLinkDialogOpen = false;
            }
        },
        openLinkDialog: function () {
            var self = this;
            var currentLink = this.getCurrentLinkData();
            var currentLinkId = currentLink && currentLink.id;

            function updateLink(linkData) {
                linkData.id = currentLinkId;
                _.remove(self._links, {id: currentLinkId});
                self._links.push(linkData);
            }

            function removeLink() {
                self.execCommand('wixUnlink');
                _.remove(self._links, {id: currentLinkId});
            }

            function createLink(linkData) {
                linkData.id = utils.guidUtils.getUniqueId('textLink', '_');
                ckUtils.createLink(linkData.id, self.editor);
                if (linkData.type === 'EmailLink' && !linkData.subject) {
                    linkData.subject = '';
                }
                self._links.push(linkData);
            }

            this.props.openLinkDialog(
                currentLink,
                function (linkData) {
                    var shouldUpdateLinks = false;
                    if (currentLinkId) {
                        shouldUpdateLinks = true;
                        if (linkData) {
                            updateLink(linkData);
                        } else {
                            removeLink();
                        }
                    } else if (linkData) {
                        shouldUpdateLinks = true;
                        createLink(linkData);
                    }

                    if (shouldUpdateLinks) {
                        self.callOnChangeIfExists({
                            text: ckUtils.getData(self.editor),
                            linkList: self._links
                        });
                    }
                }
            );

            if (this.props.panelManager) {
                this.props.panelManager.registerObserver(this.linkDialogObserver);
            }

            this.isLinkDialogOpen = true;

        },
        isPanelClosed: function (panelName) {
            return _.findIndex(this.props.panelManager.getOpenPanels(), {name: panelName}) === -1;
        },
        isColorPickerClosed: function () {
            var colorPickerPanelName = this.props.colorPickerPanelName || 'panels.toolPanels.colorPicker.colorPickerPanel';
            return this.isPanelClosed(colorPickerPanelName);
        },
        colorPickerObserver: function () {
            var isColorPickerClosed = this.isColorPickerClosed();
            ckUtils.toggleSelectionToTransparent(this.editor, !isColorPickerClosed);

            if (isColorPickerClosed) {
                this.focus();
                this.props.panelManager.unregisterObserver(this.colorPickerObserver);
                this.isColorPickerOpen = false;
                this.forceIsCustomStyleValue = undefined;
            }
        },
        _getRelativeToButtonPosition: function (isForeColor) {
            var buttonNode = isForeColor ? ReactDOM.findDOMNode(this.refs.foreColorButton) : ReactDOM.findDOMNode(this.refs.backColorButton);
            var buttonPosition = $(buttonNode).offset();
            var buttonTop = buttonPosition.top - $(document).scrollTop();
            var buttonLeft = buttonPosition.left;
            return {
                top: buttonTop <= 370 ? buttonTop + 40 : buttonTop - 370,
                left: buttonLeft
            };
        },
        handleColorClick: function (isForeColor, position) {
            this.openColorPicker(isForeColor, position);
        },
        openColorPicker: function (isForeColor, position) {
            var self = this;
            var colorCommand = isForeColor ? 'foreColor' : 'backColor';
            var colorValue = isForeColor ? this.getValue(colorCommand) : this.getBackColorValue();
            var themeColor = findColorInThemeColors(getColorInHex(colorValue), this.props.themeColors);
            colorValue = themeColor ? themeColor : getColorInHex(colorValue);

            if (!position) {
                position = this._getRelativeToButtonPosition(isForeColor);
            }

            this.props.openColorPicker(
                colorValue,
                function (newColor) {
                    newColor = newColor === 'noColor' || !newColor ? CONSTANTS.CK_OFF : newColor;
                    if (_.includes(newColor, 'color')) {
                        newColor = self.props.themeColors[newColor];
                    }
                    self.execCommand(colorCommand, newColor);
                },
                position
            );

            if (this.props.panelManager) {
                this.props.panelManager.registerObserver(this.colorPickerObserver);
            }

            this.isColorPickerOpen = true;
            this.forceIsCustomStyleValue = this.isCustomStyle();
        },
        execNoBackColor: function () {
            return this.execCommand('backColor', CONSTANTS.CK_OFF);
        },
        isReady: function () {
            return ckUtils.isEditorReady(this.editor) && this.editor.container.isVisible();
        },
        openLanguageSupport: function () {
            this.props.openLanguageSupport();
        },
        hasLink: function () {
            return this.getValue('wixLink') !== null;
        },
        isCustomStyle: function () {
            if (this.forceIsCustomStyleValue !== undefined) {
                return this.forceIsCustomStyleValue;
            }

            var isCustom = false;
            var self = this;
            _.forEach(STYLECOMMANDS, function (styleCommand) {
                if (self.editor.getCommand(styleCommand).state !== CONSTANTS.CK_OFF) {
                    isCustom = true;
                }
            });
            if (this.editor.getCommand('unBold').state !== CONSTANTS.CK_OFF || this.editor.getCommand('unItalic').state !== CONSTANTS.CK_OFF) {
                isCustom = true;
            }
            return isCustom;
        },
        getBoldProps: function () {
            var props = {
                name: 'textBold',
                tooltipValue: this.getTooltipValue('bold', 'B'),
                tooltipStyleType: baseUI.uiConstants.TOOLTIP.STYLE_TYPE.SMALL
            };

            var styleData = getTagFontStyle(this.editor, this.props.themeColors, this.props.themeFonts);

            if (styleData.weight === 'normal') {
                //bold
                props.isSelected = this.getBooleanValue('bold');
                props.onClick = wrapExecuteCommandFunc(this, 'bold');
            } else {
                //unbold
                props.isSelected = !this.getBooleanValue('unBold');
                props.onClick = wrapExecuteCommandFunc(this, 'unBold');
            }

            return props;
        },
        getItalicProps: function () {
            var props = {
                name: 'textItalic',
                tooltipValue: this.getTooltipValue('italic', 'I'),
                tooltipStyleType: baseUI.uiConstants.TOOLTIP.STYLE_TYPE.SMALL
            };

            var styleData = getTagFontStyle(this.editor, this.props.themeColors, this.props.themeFonts);

            if (styleData.style === 'normal') {
                //italic
                props.isSelected = this.getBooleanValue('italic');
                props.onClick = wrapExecuteCommandFunc(this, 'italic');
            } else {
                //unitalic
                props.isSelected = !this.getBooleanValue('unItalic');
                props.onClick = wrapExecuteCommandFunc(this, 'unItalic');
            }

            return props;
        },
        registerSaveThemeUndoRedoHandler: function(callback, isUndo) {
            ckUtils.afterUndoRedoCallback(callback, isUndo, this.editor);
        }
    });
});
