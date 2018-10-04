define(['jquery', 'lodash', 'textControls/utils/textMigrationDomHelper', 'textControls/utils/fontUtils'], function($, _, textMigrationDomHelper, fontUtils) {
    'use strict';

    function getElementStyleClass(element) {
        var classes = element.classList;
        if (!classes) {
            return null;
        }
        for (var i = 0; i < classes.length; i++) {
            if (classes[i].indexOf('font_') > -1) {
                return classes[i];
            }
        }
        return null;
    }

    function getStyledSpanWithItsParents(element, unstyledWrapper){
        if (getElementStyleClass(element)){
            return element;
        }
        var wrappedStyledSpan = $(element).clone();
        wrappedStyledSpan.empty();

        var childNodes = textMigrationDomHelper.collectionToArray(element.childNodes);
        for ( var i = 0; i < childNodes.length; i++){
            var child = childNodes[i];
            if (!getElementStyleClass(child) && !isContainStyleSpans(child)){
                $(unstyledWrapper).append($(child));
            } else {    //this is element contains different style
                var childUnstyledWrapper = $(child).clone();
                childUnstyledWrapper.empty();
                var childWrappedStyledSpan = getStyledSpanWithItsParents(child, childUnstyledWrapper.get(0));
                wrappedStyledSpan.append($(childWrappedStyledSpan));
                if (childUnstyledWrapper.get(0).firstChild) {
                    $(unstyledWrapper).append(childUnstyledWrapper);
                }
                return wrappedStyledSpan.get(0);
            }
        }
        return wrappedStyledSpan.get(0);
    }

    /**
     * for <s1>bla<a><b/><s2><c/></a></s1> - > <s1>bla<a><b/></a></s1> <a><s2/></a> <s1><a><c/></a></s1>
     * @param styledSpan
     * @private
     */
    function flattenStylesInSpan(styledSpan){
        if (!isContainStyleSpans(styledSpan)){
            return;
        }
        var styledSpanBefore = $(styledSpan).clone(false);
        styledSpanBefore.empty();

        var childNodes = textMigrationDomHelper.collectionToArray(styledSpan.childNodes);
        for (var i = 0; i < childNodes.length; i++){
            var child = childNodes[i];
            if (!getElementStyleClass(child) && !isContainStyleSpans(child)){
                styledSpanBefore.append($(child));
            } else {  //this is element contains different style
                var unstyledWrapper = $(child).clone(false);
                unstyledWrapper.empty();

                var wrappedStyledSpan = getStyledSpanWithItsParents(child, unstyledWrapper);
                if (unstyledWrapper.get(0).firstChild){
                    styledSpanBefore.append(unstyledWrapper);
                }
                $(styledSpan).before(styledSpanBefore);
                $(styledSpan).before($(wrappedStyledSpan));
                flattenStyledSpans(wrappedStyledSpan); //s2
                flattenStylesInSpan(styledSpan);  //s1 that is after s2
                return;
            }
        }
    }

    function isContainStyleSpans(element){
        return textMigrationDomHelper.isDomElement(element) && $(element).find('span[class*="font_"]').length;
    }

    /**
     * we get here only when all the text in element in styled
     * @param {Element} element
     * @param {Array<Element>} styledSpans - will add the styled spans in element to this param
     * @return {Array<Element>} all the styled spans in element
     * @private
     */
    function getStyledSpansRecursive(element, styledSpans) {
        //if the element is not text
        if (textMigrationDomHelper.isDomElement(element)) {
            var elementStyleClass = getElementStyleClass(element);
            if (elementStyleClass && element.tagName.toLowerCase() === 'span') {
                styledSpans.push(element);
            } else {
                _.forEach(element.children, function (child) {
                    styledSpans.concat(getStyledSpansRecursive(child, styledSpans));
                });
            }
        }
        return styledSpans;
    }

    function flattenStyledSpans(element){
        if (getElementStyleClass(element)){
            flattenStylesInSpan(element);
        }
        if (!isContainStyleSpans(element)){
            return;
        }
        var styledSpansFirstLevel = getStyledSpansRecursive(element, []);
        _.forEach(styledSpansFirstLevel, flattenStylesInSpan);

    }

    function isBlockContainUnstyledText(element) {
        if (textMigrationDomHelper.isTextNode(element)) {
            return true;
        }
        if (getElementStyleClass(element)) {
            return false;
        }
        var children = textMigrationDomHelper.collectionToArray(element.childNodes);
        for (var i = 0; i < children.length; i++) {
            if (isBlockContainUnstyledText(children[i])) {
                return true;
            }
        }
        return false;
    }

    function getEntryWithMaxValue(map){
        var max = 0;
        var selectedEntry = null;
        _.forEach(map, function(value, key){
            if (value > max){
                max = value;
                selectedEntry = key;
            }
        });
        return selectedEntry;
    }

    function getMostCommonStyle(styledSpans) {
        var stylesLengthMap = {};
        _.forEach(styledSpans, function (element) {
            var elementStyle = getElementStyleClass(element);
            stylesLengthMap[elementStyle] = stylesLengthMap[elementStyle] || 0;
            stylesLengthMap[elementStyle] += element.textContent.length;
        });

        return getEntryWithMaxValue(stylesLengthMap);
    }

    function getColorDelta(blockStyleClass, elementStyleClass, themeFonts, themeColors){
        var blockStyle = blockStyleClass && fontUtils.parseStyleFont(blockStyleClass, themeFonts, themeColors);
        var elementStyle = fontUtils.parseStyleFont(elementStyleClass, themeFonts, themeColors);
        if (!elementStyle){
            return null;
        }

        if (!blockStyle || blockStyle.color !== elementStyle.color) {
            if (elementStyle.color.charAt(0) === '#') {
                //hex
                return {
                    isRef: false,
                    value: elementStyle.color
                };
            }

            //color from palette
            return {
                isRef: true,
                value: elementStyle.color.replace('{', '').replace('}', '')
            };
        }
        return null;
    }

    /**
     *
     * @param {String|Null} blockStyleClass - the block style or null in case of default style
     * @param {String} elementStyleClass
     * @return {Object}
     * @private
     */
    var styleKeys = {
        'font-family': 'family',
        'font-size': 'size',
        'font-style': 'style',
        'font-variant': 'variant',
        'font-weight': 'weight',
        'line-height': 'lineHeight'
    };
    function getStyleDelta(blockStyleClass, elementStyleClass, themeFonts, themeColors) {
        var blockStyle = blockStyleClass && fontUtils.parseStyleFont(blockStyleClass, themeFonts, themeColors);
        var elementStyle = fontUtils.parseStyleFont(elementStyleClass, themeFonts, themeColors);
        var elementStyleValue = {};
        _.each(styleKeys, function (value, key) {
            if (!blockStyle || blockStyle[value] !== elementStyle[value]) {
                elementStyleValue[key] = elementStyle[value];
            }
        });
        return elementStyleValue;
    }

    return {
        flattenStyledSpans: flattenStyledSpans,
        isBlockContainUnstyledText: isBlockContainUnstyledText,
        getStyledSpansRecursive: getStyledSpansRecursive,
        getMostCommonStyle: getMostCommonStyle,
        getElementStyleClass: getElementStyleClass,
        getStyleDelta: getStyleDelta,
        getColorDelta: getColorDelta
    };
});