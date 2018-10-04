define([], function(){
    'use strict';

    return {
        gfppMargins: 16,
        compPanelMargins: 24,
        TOPBAR_HEIGHT: 48,

        LEFTBAR_BTN_WIDTH_COLLAPSED: 48,

        MOBILE_PREVIEW_TOP: 59,
        MOBILE_PREVIEW_MODE_HEIGHT: 512,
        MOBILE_PREVIEW_BOTTOM: 94,

        ANCHOR_OFFSET_TOP: -12,
        ANCHOR_HEIGHT: 25,
        ANCHOR_WIDTH: 126,

        COLOR_FORMATS: {
            HEX: 'hex',
            RGB: 'rgb',
            HSB: 'hsb'
        },

        BUBBLE: {
            DISTANCE_FROM_TARGET: 10,
            MARGINS_FROM_WINDOW: 6
        },

        TOOLTIP: {
            ALIGNMENT: {
                TOP: 'top',
                LEFT: 'left',
                RIGHT: 'right',
                BOTTOM: 'bottom'
            },
            TRIGGERS: {
                CLICK: 'onClick',
                MOUSE_ENTER: 'onMouseEnter',
                MOUSE_LEAVE: 'onMouseLeave',
                OUTER_CLICK: 'outerClick'
            },
            VALUE_TYPE: {
                STRING: 'string',
                CLASS: 'class',
                TEMPLATE: 'template'
            },
            STYLE_TYPE: {
                SMALL: 'small',
                NORMAL: 'normal',
                CONTENT_ONLY: 'contentOnly'
            }
        }
    };
});