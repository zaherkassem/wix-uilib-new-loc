define([
    'react',
    'lodash',
    'baseUI/panelInputs/dropDown/dropDownMixin',
    'baseUI/panelInputs/dropDown/dropdownManager',
    'baseUI/panelInputs/dropDown/contextMenu.rt'
], function (
    React,
    _,
    dropDownMixin,
    dropdownManager,
    contextMenuTemplate
    ) {
    'use strict';

    var indentFromEdge = dropdownManager.INDENT_FROM_EDGE;
    var OFFSET = 7;

    function getLeftPos(ddBoundingClientRect, width) {
        return ddBoundingClientRect.left + ddBoundingClientRect.width / 2 - width / 2;
    }

    return React.createClass({
        displayName: 'contextMenu',
        mixins: [dropDownMixin],
        className: 'context-menu',

        getDefaultProps: function(){
            return {
                toggleIcon: false,
                template: contextMenuTemplate,
                autotranslate: true,
                setSelectedAnyway: true
            };
        },

        getOptionsLocation: function(ddEl, listEl){
            var ddBoundingClientRect = ddEl.getBoundingClientRect();
            var scrollHeight = listEl.scrollHeight;
            var top = ddBoundingClientRect.bottom + OFFSET;
            var width = this.props.optionsWidth || listEl.getBoundingClientRect().width;
            var bottom = dropdownManager.getViewportHeight() - top - scrollHeight;
            var optionalClasses = ['tag-triangle'];

            if (bottom < indentFromEdge){
                bottom = dropdownManager.getViewportHeight() - ddBoundingClientRect.top + indentFromEdge;
                top = ddBoundingClientRect.top - indentFromEdge - scrollHeight;
                optionalClasses.push('tag-bottom');
            } else {
                optionalClasses.push('tag-top');
            }

            return {
                style: {
                    top: top,
                    bottom: bottom,
                    left: getLeftPos(ddBoundingClientRect, width),
                    width: width
                },

                optionalClasses: optionalClasses
            };
        }
    });
});
