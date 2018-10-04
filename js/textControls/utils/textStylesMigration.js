define(['lodash', 'jquery', 'textControls/utils/textMigrationDomHelper', 'textControls/utils/textMigrationStylesHelper', 'textControls/utils/fontUtils', 'textControls/utils/constants'], function(_, $, textMigrationDomHelper, textMigrationStylesHelper, fontUtils, CONSTANTS) {
    'use strict';

    var changeableTagList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div'];
    var deprecatedStyleClass = ['font_1', 'font_10'];

    var styleCssClass2seoTag = _.transform(CONSTANTS.DEFAULT_STYLES_MAP, function(result, value) {
        result[value.cssClass] = value.seoTag;
    });

    //============================= removeStyleClassesReplaceWithInline============================

    /**
     * removes the spans that have the blockStyleClass.
     * in other styled spans removed the class attribute and adds the delta between the styles as inline style
     * @param blockStyleClass
     * @param styledSpans
     * @private
     */
    function removeStyleClassesReplaceWithInline(blockStyleClass, styledSpans, themeFonts, themeColors) {
        _.forEach(styledSpans, function(element) {
//                if (element.childNodes.length > 0) {
            var elementStyleClass = textMigrationStylesHelper.getElementStyleClass(element);

            if (elementStyleClass === blockStyleClass){
                if (element.childNodes.length === 0){
                    element.destroy();
                } else {
                    removeStyleFromSpan(element, blockStyleClass);
                }
            } else {
                textMigrationDomHelper.removeClass(element, elementStyleClass);
                setStyleOverrides(blockStyleClass, elementStyleClass, element, themeFonts, themeColors);
            }
//                }
        });
    }

    function removeStyleFromSpan(element, styleClass) {
        $(element).removeClass(styleClass);
        //in case styled span doesn't have more attributes, it's removed.
        if (!textMigrationDomHelper.isElementHasAttributes(element)){
            textMigrationDomHelper.replaceElementWithItsChildren(element);
        }
    }

    function setStyleOverrides(blockStyleClass, elementStyleClass, element, themeFonts, themeColors) {
        var styleDeltaMap = textMigrationStylesHelper.getStyleDelta(blockStyleClass, elementStyleClass, themeFonts, themeColors);
        var node = element;
        textMigrationDomHelper.setStyle(node, styleDeltaMap);
        var color = textMigrationStylesHelper.getColorDelta(blockStyleClass, elementStyleClass, themeFonts, themeColors);
        if (!color){
            return;
        }
        if (color.isRef){
            $(node).addClass(color.value);
        } else {
            textMigrationDomHelper.setStyle(node, {'color': color.value});
        }
    }

    // END=====END=================== removeStyleClassesReplaceWithInline============================

    function moveInlineStyleFromOriginalElementToBlockParentElement(blockElement, blockStyleClass, themeFonts, themeColors) {
        var lineHeightValue;

        if (_.includes(_.keys(themeFonts), blockStyleClass)) {
            var currentStyle = fontUtils.parseStyleFont(blockStyleClass, themeFonts, themeColors);
            lineHeightValue = currentStyle.lineHeight;
            textMigrationDomHelper.setStyle(blockElement, {'line-height': lineHeightValue});
            createWrapperSpanWithBlockLineHeight(blockElement, lineHeightValue);
            blockElement = setBlockElementTagAccordingToStyle(blockElement, blockStyleClass);
        }

        return blockElement;
    }

    function createWrapperSpanWithBlockLineHeight(blockElement, lineHeightValue) {
        var lineHeightElement = document.createElement('span');
        textMigrationDomHelper.setStyle(lineHeightElement, {'line-height': lineHeightValue});
        textMigrationDomHelper.moveChildren(blockElement, lineHeightElement);
        blockElement.appendChild(lineHeightElement);
    }

    function setBlockElementTagAccordingToStyle(blockElement, blockStyleClass) {
        var newBlockTag = styleCssClass2seoTag[blockStyleClass];
        return textMigrationDomHelper.renameNode(blockElement, newBlockTag);
    }

    function isStyleDeprecated(styleClass) {
        return _.includes(deprecatedStyleClass, styleClass);
    }

    function replaceDeprecatedStyleIfNeeded(styleClass) {
        if (isStyleDeprecated(styleClass)) {
            return CONSTANTS.FALLBACK_STYLE_CLASS;
        }
        return styleClass;
    }

    /**
     * adds the most common style class on the block element.
     * and changes the styled spans in the block
     * @param {Element} blockElement - contains only styled text
     * @return {String|Null} the most common style
     * @private
     */
    function moveStyleClassToBlockParentElement(blockElement, themeFonts, themeColors) {
        var styledSpans = textMigrationStylesHelper.getStyledSpansRecursive(blockElement, []);
        var mostCommonStyleClass = textMigrationStylesHelper.getMostCommonStyle(styledSpans);
        var oldClass = null;
        if (mostCommonStyleClass) {
            var newStyleClass = replaceDeprecatedStyleIfNeeded(mostCommonStyleClass);
            //deprecated
            if (newStyleClass !== mostCommonStyleClass) {
                oldClass = mostCommonStyleClass;
                mostCommonStyleClass = newStyleClass;
            }

            //move style to block element
            $(blockElement).addClass(mostCommonStyleClass);
            removeStyleClassesReplaceWithInline(mostCommonStyleClass, styledSpans, themeFonts, themeColors);
            //deprecated
            if (oldClass){
                addFontSizeOnBlockIfNeeded(blockElement, mostCommonStyleClass, oldClass, themeFonts, themeColors);
            }
            return mostCommonStyleClass;
        }
        return null;
    }

    function addFontSizeOnBlockIfNeeded(element, newStyle, oldStyle, themeFonts, themeColors){
        var oldFontSize = fontUtils.parseStyleFont(oldStyle, themeFonts, themeColors).size;
        var newFontSize = fontUtils.parseStyleFont(newStyle, themeFonts, themeColors).size;
        if (oldFontSize < newFontSize){
            textMigrationDomHelper.setStyle(element, {'font-size': oldFontSize});
        }
    }

    function replaceBlockWithDefaultTag(element, defaultTag, defaultClass) {
        //TODO: do something if no default tag
        if (!defaultTag || !defaultClass) {
            //todo - LOG.reportError(wixErrors.TEXT_MIGRATION_DEFAULT_VALUES_NOT_PROVIDED, "TextStylesMigration", "replaceBlockWithDefaultTag");
            return null;
        }
        //if element is already wrapped...
        if (element && element.tagName === defaultTag && element.hasClass(defaultClass)) {
            return null;
        }
        var nodeWithDefaultTag = textMigrationDomHelper.renameNode(element, defaultTag);
        $(nodeWithDefaultTag).addClass(defaultClass);
        return nodeWithDefaultTag;
    }

    /**
     *
     * @param blockElement - a block level element which contains text/inline elements, should be replaced with correct tag
     * @param defaultTag
     * @param defaultClass
     * @param themeFonts
     * @param themeColors
     * @private
     */
    function applyStyleOnBlock(blockElement, defaultTag, defaultClass, themeFonts, themeColors){
        //TODO: think what to do here...
        if (blockElement.childNodes.length === 0) {
            //todo - report BI LOG.reportError(wixErrors.TEXT_MIGRATION_EMPTY_BLOCK_ELEMENT, "TextStylesMigration", "applyStyleOnBlock");
            return;
        }
        textMigrationStylesHelper.flattenStyledSpans(blockElement);
        var blockStyle = null;
        if (textMigrationStylesHelper.isBlockContainUnstyledText(blockElement)) {
            var wrapper = replaceBlockWithDefaultTag(blockElement, defaultTag, defaultClass);
            var styledSpans = textMigrationStylesHelper.getStyledSpansRecursive(wrapper, []);
            removeStyleClassesReplaceWithInline(null, styledSpans, themeFonts, themeColors);
        } else {
            blockStyle = moveStyleClassToBlockParentElement(blockElement, themeFonts, themeColors);
            if (blockStyle) {
                moveInlineStyleFromOriginalElementToBlockParentElement(blockElement, blockStyle, themeFonts, themeColors);
            }
        }
        verifyNoStyledSpans(blockElement, blockStyle, themeFonts, themeColors);
    }

    function verifyNoStyledSpans(block, blockStyle, themeFonts, themeColors){
        var spans = $(block).find('span[class*="font_"]');
        if (spans.length) {
            //todo LOG.reportError(wixErrors.TEXT_MIGRATION_MISSED_STYLED_SPANS, "TextStylesMigration", "_applyStyleOnBlock", block.outerHTML);
            removeStyleClassesReplaceWithInline(blockStyle, spans, themeFonts, themeColors);
        }
    }

    /**
     *
     * @param inlineElements - an array of inline elements or text nodes, which should be wrapped with a block tag
     * @param defaultTag
     * @param defaultClass
     * @private
     */
    function applyStyleOnElements(inlineElements, defaultTag, defaultClass, themeFonts, themeColors){
        if (textMigrationDomHelper.isOnlyWhiteSpace(inlineElements)){
            return;
        }
        var wrapper = document.createElement('p');

        $(inlineElements[0]).before($(wrapper));
        $(wrapper).append($(inlineElements));
        applyStyleOnBlock(wrapper, defaultTag, defaultClass, themeFonts, themeColors);
    }

    /**
     *
     * @param element - a block level element, which might contain other block elements
     * @param defaultTag
     * @param defaultClass
     * @private
     */
    function migrateElement(element, defaultTag, defaultClass, themeFonts, themeColors){
        var simpleElementsQueue = [];
        var elementChildren = textMigrationDomHelper.collectionToArray(element.childNodes);
        _.forEach(elementChildren, function(child){
            if (!textMigrationDomHelper.isBlockElement(child)) {
                simpleElementsQueue.push(child);
            } else {
                if (simpleElementsQueue.length > 0) {
                    applyStyleOnElements(simpleElementsQueue, defaultTag, defaultClass, themeFonts, themeColors);
                    simpleElementsQueue = [];
                }
                var BlockNotChangeable = !_.includes(changeableTagList, child.tagName.toLowerCase()) || textMigrationDomHelper.hasBlockElementChildren(child);
                if (BlockNotChangeable) {
                    migrateElement(child, defaultTag, defaultClass, themeFonts, themeColors);
                } else {
                    applyStyleOnBlock(child, defaultTag, defaultClass, themeFonts, themeColors);
                }
            }
        });

        if (simpleElementsQueue.length > 0) {
            applyStyleOnElements(simpleElementsQueue, defaultTag, defaultClass, themeFonts, themeColors);
        }
    }

    return {
        migrateElement: migrateElement,
        verifyNoStyledSpans: verifyNoStyledSpans
    };

});