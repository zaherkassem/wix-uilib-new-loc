define([
    'react/addons',
    'lodash',
    'ckeditor',
    'textControls/comps/iconButton',
    'textControls/comps/textColor',
    'textControls/comps/fontFamily',
    'textControls/comps/textStyle',
    'textControls/comps/textPopup',
    'textControls/comps/lineHeight',
    'textControls/comps/iconsDropDown',
    'textControls/comps/textBackgroundColor',
    'textControls/utils/constants',
    'baseUI'
], function (React, _, ck, iconButton, textColor, fontFamily, textStyle, textPopup, lineHeight, iconsDropDown, textBackgroundColor, CONSTANTS, UI) {
    'use strict';
    function mergeProps(inline, external) {
        var res = _.assign({}, inline, external);
        if (inline.hasOwnProperty('style')) {
            res.style = _.defaults(res.style, inline.style);
        }
        if (inline.hasOwnProperty('className') && external.hasOwnProperty('className')) {
            res.className = external.className + ' ' + inline.className;
        }
        return res;
    }
    function onChange2(smallDesign, value) {
        this.execFormatBlockCommand(value);
    }
    function onChange3(smallDesign, value) {
        this.changeFontFamily(value);
    }
    function onChange4(smallDesign, value) {
        this.execCommand('fontSize', value + 'px');
    }
    function onClick5(smallDesign) {
        this.execCommand('underline');
    }
    function onClick6(smallDesign) {
        this.openColorPicker(true);
    }
    function onClick7(smallDesign) {
        this.handleColorClick(false);
    }
    function onClick8(smallDesign) {
        this.execCommand('resetTheme');
    }
    function onClick9(smallDesign) {
        this.toggleToolbar();
    }
    function onChange10(smallDesign, value) {
        this.changeAlignment(value);
    }
    function onChange11(smallDesign, value) {
        this.execListCommand(value);
    }
    function onClick12(smallDesign) {
        this.execCommand('outdent');
    }
    function onClick13(smallDesign) {
        this.execCommand('indent');
    }
    function onChange14(smallDesign, value) {
        this.execLineHeightCommand(value);
    }
    function onChange15(smallDesign, value) {
        this.execCommand('letterSpacing', value + 'em');
    }
    function onClick16(smallDesign) {
        this.execCommand('bidiltr');
    }
    function onClick17(smallDesign) {
        this.execCommand('bidirtl');
    }
    function scopeSmallDesign18() {
        var smallDesign = UI.uiConstants.TOOLTIP.STYLE_TYPE.SMALL;
        return !this.props.hideToolbar ? React.createElement('div', {
            'className': 'rich-text-toolbar',
            'key': 'richTextToolBar'
        }, React.createElement('section', {}, React.createElement(textStyle, {
            'value': this.getFormatBlockValue(),
            'themeColors': this.props.themeColors,
            'ref': 'textStyle',
            'tooltipStyleType': smallDesign,
            'themeFonts': this.props.themeFonts,
            'toolbarMode': true,
            'hasSmallArrow': true,
            'tooltipValue': 'text_editor_theme_label',
            'optionsWidth': 264,
            'onChange': onChange2.bind(this, smallDesign)
        }), React.createElement(fontFamily, {
            'ref': 'fontFamily',
            'tooltipStyleType': smallDesign,
            'value': this.getValue('fontFamily'),
            'onChange': onChange3.bind(this, smallDesign),
            'tooltipValue': 'text_editor_font_label',
            'fonts': this.props.fonts,
            'toolbarMode': true
        }), React.createElement(textPopup, {
            'label': this.getValue('fontSize') + ' px',
            'width': 71,
            'ref': 'fontSizePopUp'
        }, React.createElement(UI.slider, {
            'label': 'text_editor_font_size_label',
            'id': 'font-size-slider',
            'value': this.getValue('fontSize'),
            'min': 6,
            'max': 176,
            'stepperMax': 999,
            'onChange': onChange4.bind(this, smallDesign),
            'onSlideEnd': this.focus
        })), React.createElement(iconButton, this.getBoldProps()), React.createElement(iconButton, this.getItalicProps()), React.createElement(iconButton, {
            'isSelected': this.getBooleanValue('underline'),
            'onClick': onClick5.bind(this, smallDesign),
            'name': 'textUnderline',
            'tooltipValue': this.getTooltipValue('underline', 'U'),
            'tooltipStyleType': smallDesign
        }), React.createElement(textColor, {
            'value': this.getValue('foreColor'),
            'onClick': onClick6.bind(this, smallDesign),
            'tooltipValue': this.getTooltipValue('text_color'),
            'tooltipStyleType': smallDesign,
            'ref': 'foreColorButton'
        }), React.createElement(textBackgroundColor, {
            'ref': 'backColorButton',
            'color': this.getBackColorValue(),
            'onClick': onClick7.bind(this, smallDesign),
            'handleNoColor': this.execNoBackColor,
            'tooltipValue': this.getTooltipValue('text_highlight'),
            'tooltipStyleType': smallDesign
        }), React.createElement(iconButton, {
            'isSelected': this.hasLink(),
            'onClick': this.openLinkDialog,
            'name': 'textLink',
            'tooltipValue': this.getTooltipValue('link'),
            'tooltipStyleType': smallDesign
        }), React.createElement(iconButton, {
            'onClick': onClick8.bind(this, smallDesign),
            'name': 'textRemoveFormat',
            'tooltipValue': 'text_editor_reset_button',
            'tooltipStyleType': smallDesign
        }), React.createElement('span', {
            'className': 'expand-toolbar-button',
            'onClick': onClick9.bind(this, smallDesign)
        }, !this.state.extraToolbarOpened ? React.createElement('span', {
            'className': 'more-text',
            'key': 'richTextToolBarMore'
        }, React.createElement(UI.symbol, { 'name': 'accordionClose' }), React.createElement('span', {}, this.translateIfNeeded('list_dbe_edit_item_text_toolbar_more'))) : null, this.state.extraToolbarOpened ? React.createElement('span', {
            'className': 'less-text',
            'key': 'richTextToolBarLess'
        }, React.createElement(UI.symbol, { 'name': 'accordionOpen' }), React.createElement('span', {}, this.translateIfNeeded('list_dbe_edit_item_text_toolbar_less'))) : null)), this.state.extraToolbarOpened ? React.createElement('div', {
            'key': 'richTextToolBarDivider',
            'className': 'toolbar-divider'
        }) : null, this.state.extraToolbarOpened ? React.createElement('section', { 'key': 'richTextToolBarExtraControls' }, React.createElement(iconsDropDown, {
            'ref': 'textAlign',
            'className': 'align-dd',
            'value': this.getTextAlignment(),
            'onChange': onChange10.bind(this, smallDesign),
            'items': CONSTANTS.ALIGNMENT_TYPES,
            'tooltipValue': this.getTooltipValue('alignment'),
            'tooltipStyleType': smallDesign
        }), React.createElement(iconsDropDown, {
            'ref': 'textBullets',
            'className': 'bullets-dd',
            'value': this.getListType(),
            'onChange': onChange11.bind(this, smallDesign),
            'items': this.getBulletsItems(),
            'tooltipValue': this.getTooltipValue('bullets_and_numbering'),
            'tooltipStyleType': smallDesign,
            'fixedIconName': this.getBulletsIconName()
        }), React.createElement(iconButton, {
            'onClick': onClick12.bind(this, smallDesign),
            'name': this.getBooleanValue('bidiltr') ? 'textOutdentLeft' : 'textOutdentRight',
            'tooltipValue': this.getTooltipValue('decrease_indent'),
            'tooltipStyleType': smallDesign
        }), React.createElement(iconButton, {
            'onClick': onClick13.bind(this, smallDesign),
            'name': this.getBooleanValue('bidiltr') ? 'textIndentLeft' : 'textIndentRight',
            'tooltipValue': this.getTooltipValue('increase_indent'),
            'tooltipStyleType': smallDesign
        }), React.createElement(textPopup, {
            'iconName': 'textLineHeight',
            'ref': 'lineHeightPopUp'
        }, React.createElement(lineHeight, {
            'value': this.getLineHeightValue(),
            'onChange': onChange14.bind(this, smallDesign),
            'onSlideEnd': this.focus
        })), React.createElement(textPopup, {
            'iconName': 'textCharSpacing',
            'ref': 'charSpacingPopUp'
        }, React.createElement(UI.slider, {
            'value': this.getLetterSpacingValue(),
            'min': -0.1,
            'max': 0.7,
            'stepperMin': -0.4,
            'stepperMax': 3,
            'step': 0.05,
            'onChange': onChange15.bind(this, smallDesign),
            'label': 'text_editor_character_spacing_label',
            'onSlideEnd': this.focus
        })), this.getBooleanValue('bidirtl') ? React.createElement(iconButton, {
            'onClick': onClick16.bind(this, smallDesign),
            'key': 'richTextWriteLTR',
            'name': 'textWriteDirectionLeft',
            'tooltipValue': this.getTooltipValue('text_direction'),
            'tooltipStyleType': smallDesign
        }) : null, this.getBooleanValue('bidiltr') ? React.createElement(iconButton, {
            'onClick': onClick17.bind(this, smallDesign),
            'key': 'richTextWriteRTL',
            'name': 'textWriteDirectionRight',
            'tooltipValue': this.getTooltipValue('text_direction'),
            'tooltipStyleType': smallDesign
        }) : null) : null) : null;
    }
    return function () {
        return React.createElement('div', mergeProps({
            'className': this.getClassName('rich-text-input-control') + ' ' + (this.props.hideToolbar ? '' : 'with-toolbar'),
            'onClick': this.handleClick,
            'ref': 'textStyle'
        }, this.getPosition()), scopeSmallDesign18.apply(this, []), React.createElement('div', { 'className': 'rich-text-content' }, React.createElement('div', { 'ref': 'editorContainer' })));
    };
});