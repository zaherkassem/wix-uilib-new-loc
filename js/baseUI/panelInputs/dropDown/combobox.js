define([
    'react',
    'lodash',
    'baseUI/panelInputs/dropDown/dropDownMixin',
    'baseUI/panelInputs/dropDown/dropdownManager',
    'baseUI/panelInputs/dropDown/combobox.rt'
], function (React,
             _,
             dropDownMixin,
             dropdownManager,
             comboboxTpl) {
    'use strict';

    var INDENT_FROM_EDGE = dropdownManager.INDENT_FROM_EDGE;

    return React.createClass({
        displayName: 'combobox',
        mixins: [dropDownMixin],
        className: 'combobox',

        getDefaultProps: function () {
            return {
                toggleIcon: true,
                template: comboboxTpl,
                autotranslate: true,
                setSelectedAnyway: false,
                showScrollBar: true
            };
        },

        getOptionsLocation: function(ddEl, listEl, selectedEl, footerEl){
            var optionsHeight;
            var ddBoundingClientRect = ddEl.getBoundingClientRect();
            var viewportHeight = dropdownManager.getViewportHeight();
            var top = ddBoundingClientRect.top + ddBoundingClientRect.height;
            var bottom = viewportHeight - top - listEl.scrollHeight;

            if (footerEl){
                bottom -= footerEl.getBoundingClientRect().height;
            }

            if (bottom < INDENT_FROM_EDGE){
                bottom = INDENT_FROM_EDGE;
            }

            optionsHeight = viewportHeight - top - bottom;

            if (optionsHeight < dropdownManager.MIN_LIST_HEIGHT){
                bottom = viewportHeight - ddBoundingClientRect.top;
                top = viewportHeight - bottom - listEl.scrollHeight;

                if (footerEl){
                    top -= footerEl.getBoundingClientRect().height;
                }

                if (top < INDENT_FROM_EDGE){
                    top = INDENT_FROM_EDGE;
                }
            }

            return {
                style: {
                    top: top,
                    bottom: bottom,
                    left: ddBoundingClientRect.left,
                    width: Number(this.props.optionsWidth) || ddBoundingClientRect.width
                },

                scrollTop: selectedEl.offsetTop
            };
        },

        getScrollData: function(deltaY/*, optionsEl, listEl*/){
            return {distance: deltaY};
        }//,

        //onInputChange: function(e){ //TODO: test (this is not finished temporary method)
        //    var newValue = e.currentTarget.value;
        //
        //    this.updateCache('selectedContent', newValue);
        //    this.setState({inputValue: newValue});
        //}
    });
});
