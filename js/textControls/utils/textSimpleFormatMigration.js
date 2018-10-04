define(['lodash', 'jquery', 'textControls/utils/textMigrationDomHelper', 'textControls/utils/textMigrationStylesHelper', 'textControls/utils/constants'], function(_, $, textMigrationDomHelper, textMigrationStylesHelper, CONSTANTS) {
    'use strict';

    function migrateElement(element){
        _migrateBold(element);
        _migrateItalic(element);
        _migrateUnderline(element);
        _migrateAlignRight(element);
        _migrateAlignCenter(element);
        _migrateJustify(element);
        _migrateUl(element);
    }

    function _migrateBold(element){
        var elements = $(element).find('.bold');
        _removeClassAddTag(elements, 'bold', 'strong');
    }

    function _migrateItalic(element){
        var elements = $(element).find('.italic');
        _removeClassAddTag(elements, 'italic', 'em');
    }

    function _migrateUnderline(element){
        var elements = $(element).find('.underline');
        _removeClassAddTag(elements, 'underline', 'u');
    }

    function _migrateAlignRight(element){
        var elements = $(element).find('.alignRight');
        _removeClassAddInlineStyle(elements, 'alignRight', 'text-align', 'right');
    }

    function _migrateAlignCenter(element){
        var elements = $(element).find('.alignCenter');
        _removeClassAddInlineStyle(elements, 'alignCenter', 'text-align', 'center');

    }

    function _migrateJustify(element){
        var elements = $(element).find('.alignJustify');
        _removeClassAddInlineStyle(elements, 'alignJustify', 'text-align', 'justify');
    }

    function _migrateUl(element) {
        var elements = $(element).find('ul, ol');
        _.each(elements, function(_element) {
            if (!textMigrationStylesHelper.getElementStyleClass(_element)) {
                $(_element).addClass(CONSTANTS.DEFAULT_STYLE_CLASS);
            }
        });
    }

    function _removeClassAddTag(elements, cssClass, tag){
        _.forEach(elements, function(el){
            var formatElement = document.createElement(tag);
            textMigrationDomHelper.moveChildren(el, formatElement);
            textMigrationDomHelper.removeClass(el, cssClass);
            if (textMigrationDomHelper.isElementHasAttributes(el) || el.nodeName.toLowerCase() !== 'span'){
                $(el).append($(formatElement));
            } else {
                $(el).replaceWith($(formatElement));
            }
        });
    }

    function _removeClassAddInlineStyle(elements, cssClass, styleKey, styleValue){
        _.forEach(elements, function(el){
            textMigrationDomHelper.removeClass(el, cssClass);
            var styleProperties = {};
            styleProperties[styleKey] = styleValue;
            textMigrationDomHelper.setStyle(el, styleProperties);
        });
    }

    return {
        migrateElement: migrateElement
    };
});