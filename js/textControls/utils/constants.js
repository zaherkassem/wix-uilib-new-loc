define([], function () {
    'use strict';

    return {
        TEXT_COMP_MAX_HEIGHT: 5000,
        CK_OFF: 2,
        CK_ON: 1,
        IMAGE_WHITE_LIST_ATTRIBUTES: ['src', 'style', 'wix-comp'],
        FORBIDDEN_TAGS: ['script', 'iframe', 'embed', 'object', 'meta'],
        SENSITIVE_ATTRIBUTES: ['href', 'src', 'style'],
        FORBIDDEN_TAGS_AND_ATTRIBUTES: ['script', 'iframe', 'embed', 'object', 'meta', 'expression', 'id', 'comp', 'dataquery', 'propertyquery', 'styleid', 'skin',
            'skinpart', 'y', 'x', 'scale', 'angle', 'idprefix', 'state', 'container', 'listposition', 'hasproxy', 'vcfield', 'vcview', 'vctype', 'pos', 'onAbort',
            'onActivate', 'onAfterPrint', 'onAfterUpdate', 'onBeforeActivate', 'onBeforeCopy', 'onBeforeCut', 'onBeforeDeactivate', 'onBeforeEditFocus',
            'onBeforePaste', 'onBeforePrint', 'onBeforeUnload', 'onBeforeUpdate', 'onBegin', 'onBlur', 'onBounce', 'onCellChange', 'onChange', 'onClick',
            'onContextMenu', 'onControlSelect', 'onCopy', 'onCut', 'onDataAvailable', 'onDataSetChanged', 'onDataSetComplete', 'onDblClick', 'onDeactivate',
            'onDrag', 'onDragEnd', 'onDragLeave', 'onDragEnter', 'onDragOver', 'onDragDrop', 'onDragStart', 'onDrop', 'onEnd', 'onError',
            'onErrorUpdate', 'onFilterChange', 'onFinish', 'onFocus', 'onFocusIn', 'onFocusOut', 'onHashChange', 'onHelp', 'onInput', 'onKeyDown',
            'onKeyPress', 'onKeyUp', 'onLayoutComplete', 'onLoad', 'onLoseCapture', 'onMediaComplete', 'onMediaError', 'onMessage', 'onMouseDown',
            'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp', 'onMouseWheel', 'onMove', 'onMoveEnd',
            'onMoveStart', 'onOffline', 'onOnline', 'onOutOfSync', 'onPaste', 'onPause', 'onPopState', 'onProgress', 'onPropertyChange',
            'onReadyStateChange', 'onRedo', 'onRepeat', 'onReset', 'onResize', 'onResizeEnd', 'onResizeStart', 'onResume', 'onReverse', 'onRowsEnter',
            'onRowExit', 'onRowDelete', 'onRowInserted', 'onScroll', 'onSeek', 'onSelect', 'onSelectionChange', 'onSelectStart', 'onStart', 'onStop',
            'onStorage', 'onSyncRestored', 'onSubmit', 'onTimeError', 'onTrackChange', 'onUndo', 'onUnload', 'onURLFlip', 'seekSegmentTime'],
        DEFAULT_STYLES_MAP: {
            'h1': {
                'seoTag': 'h1',
                'label': 'FONT_0_LABEL',
                'tag': 'h1',
                'displayName': 'text_editor_theme_1',
                'cssClass': 'font_0'
            },
            'h2': {
                'seoTag': 'h2',
                'label': 'FONT_2_LABEL',
                'tag': 'h2',
                'displayName': 'text_editor_theme_2',
                'cssClass': 'font_2'
            },
            'h3': {
                'seoTag': 'h3',
                'label': 'FONT_3_LABEL',
                'tag': 'h3',
                'displayName': 'text_editor_theme_3',
                'cssClass': 'font_3'
            },
            'h4': {
                'seoTag': 'h4',
                'label': 'FONT_4_LABEL',
                'tag': 'h4',
                'displayName': 'text_editor_theme_4',
                'cssClass': 'font_4'
            },
            'h5': {
                'seoTag': 'h5',
                'label': 'FONT_5_LABEL',
                'tag': 'h5',
                'displayName': 'text_editor_theme_5',
                'cssClass': 'font_5'
            },
            'h6': {
                'seoTag': 'h6',
                'label': 'FONT_6_LABEL',
                'tag': 'h6',
                'displayName': 'text_editor_theme_6',
                'cssClass': 'font_6'
            },
            'p': {
                'seoTag': 'p',
                'label': 'FONT_7_LABEL',
                'tag': 'p',
                'displayName': 'text_editor_theme_7',
                'cssClass': 'font_7'
            },
            'div': {
                'seoTag': 'p',
                'label': 'FONT_8_LABEL',
                'tag': 'div',
                'displayName': 'text_editor_theme_8',
                'cssClass': 'font_8'
            },
            'address': {
                'seoTag': 'p',
                'label': 'FONT_9_LABEL',
                'tag': 'address',
                'displayName': 'text_editor_theme_9',
                'cssClass': 'font_9'
            }
        },
        PALETTE_SEQUENCES: ['color_11', 'color_12', 'color_13', 'color_14', 'color_15', 'color_16', 'color_17', 'color_18', 'color_19', 'color_20', 'color_21', 'color_22', 'color_23', 'color_24', 'color_25', 'color_26', 'color_27', 'color_28', 'color_29', 'color_30', 'color_31', 'color_32', 'color_33', 'color_34', 'color_35'],
        TEXT_LIST_TYPES: {
            textListNone: 'nonelist',
            textListNumbers: 'numberedlist',
            textListBullets: 'bulletedlist'
        },
        TEXT_BACK_COLOR_TYPES: {
            textListNone: 'noColor'
        },
        TEXT_LIST_TYPES_RTL: {
            textListNone: 'nonelist',
            textListNumbersRight: 'numberedlist',
            textListBulletsRight: 'bulletedlist'
        },
        ALIGNMENT_TYPES: {
            textAlignLeft: 'justifyleft',
            textAlignCenter: 'justifycenter',
            textAlignRight: 'justifyright',
            textAlignBlock: 'justifyblock'
        },
        EFFECTS: {
            effect_0: {
                'label': '-',
                'value': 2
            },
            effect_1: {
                'label': 'A',
                'value': 'rgba(255, 255, 255, 0.6) 1px 1px 1px, rgba(0, 0, 0, 0.6) -1px -1px 1px'
            },
            effect_2: {
                'label': 'B',
                'value': 'rgba(0, 0, 0, 0.298039) 0px 5px 0px'
            },
            effect_3: {
                'label': 'C',
                'value': 'rgba(0, 0, 0, 0.4) 0px 4px 5px'
            },
            effect_4: {
                'label': 'D',
                'value': 'rgba(0, 0, 0, 0.498039) -1px -1px 0px, rgba(0, 0, 0, 0.498039) -1px 1px 0px, rgba(0, 0, 0, 0.498039) 1px 1px 0px, rgba(0, 0, 0, 0.498039) 1px -1px 0px'
            },
            effect_5: {
                'label': 'E',
                'value': 'rgb(255, 255, 255) -1px -1px 0px, rgb(255, 255, 255) -1px 1px 0px, rgb(255, 255, 255) 1px 1px 0px, rgb(255, 255, 255) 1px -1px 0px'
            },
            effect_6: {
                'label': 'F',
                'value': 'rgb(255, 255, 255) 0px 0px 6px'
            },
            effect_7: {
                'label': 'G',
                'value': 'rgb(200, 200, 200) 1px 1px 0px, rgb(180, 180, 180) 0px 2px 0px, rgb(160, 160, 160) 0px 3px 0px, rgba(140, 140, 140, 0.498039) 0px 4px 0px, rgb(120, 120, 120) 0px 0px 0px, rgba(0, 0, 0, 0.498039) 0px 5px 10px'
            },
            effect_8: {
                'label': 'H',
                'value': 'rgb(255, 255, 255) 3px 3px 0px, rgba(0, 0, 0, 0.2) 6px 6px 0px'
            },
            effect_9: {
                'label': 'I',
                'value': 'rgba(10, 189, 240, 0.298039) 3px 3px 0px, rgba(254, 1, 1, 0.298039) -3px -3px 0px'
            }
        },
        FONT_SIZE: {
            MIN: 6,
            MAX: 215
        },
        //used by the blog
        //todo - fix the blog to use better data
        BLOG_CK_EDITOR_FONT_STYLES: { //CK_EDITOR_FONT_STYLES
            type: 'map',
            metaData: {
                isPreset: true,
                isHidden: false,
                description: '',
                isPersistent: false
            },
            items: {
                font_0: {
                    seoTag: 'h1',
                    label: 'FONT_0_LABEL'
                },
                font_1: {
                    seoTag: 'h2',
                    label: 'FONT_1_LABEL'
                },
                font_2: {
                    seoTag: 'h2',
                    label: 'FONT_2_LABEL'
                },
                font_3: {
                    seoTag: 'h3',
                    label: 'FONT_3_LABEL'
                },
                font_4: {
                    seoTag: 'h4',
                    label: 'FONT_4_LABEL'
                },
                font_5: {
                    seoTag: 'h5',
                    label: 'FONT_5_LABEL'
                },
                font_6: {
                    seoTag: 'h6',
                    label: 'FONT_6_LABEL'
                },
                font_7: {
                    seoTag: 'p',
                    label: 'FONT_7_LABEL'
                },
                font_8: {
                    seoTag: 'p',
                    label: 'FONT_8_LABEL'
                },
                font_9: {
                    seoTag: 'p',
                    label: 'FONT_9_LABEL'
                },
                font_10: {
                    seoTag: 'p',
                    label: 'FONT_10_LABEL'
                }
            },
            id: 'CK_EDITOR_FONT_STYLES'
        },
        BLOG_EDITOR_STYLES: { //WIXAPPS_EDITOR_STYLES
            type: 'map',
            metaData: {
                isPersistent: false
            },
            items: {
                h1: {
                    tag: 'h1',
                    cssClass: 'font_3'
                },
                h2: {
                    tag: 'h2',
                    cssClass: 'font_4'
                },
                h3: {
                    tag: 'h3',
                    cssClass: 'font_5'
                },
                h4: {
                    tag: 'h4',
                    cssClass: 'font_6'
                },
                h5: {
                    tag: 'h5',
                    cssClass: 'font_7'
                },
                h6: {
                    tag: 'h6',
                    cssClass: 'font_8'
                },
                p: {
                    tag: 'p',
                    cssClass: 'font_9'
                },
                div: {
                    tag: 'div',
                    cssClass: 'font_8',
                    label: 'default',
                    seoTag: 'hatul'
                }
            },
            id: 'WIXAPPS_EDITOR_STYLES'
        },
        DEFAULT_STYLE_CLASS: 'font_100',
        FALLBACK_STYLE_CLASS: 'font_8'
    };

});
