define(['react', 'lodash', 'textControls/comps/textStyle.rt', 'textControls/utils/constants', 'textControls/utils/fontUtils', 'util'], function (React, _, template, consts, fontUtils, util) {
    'use strict';

    return React.createClass({
        displayName: 'textStyle',
        mixins: [util.translationMixin],
        propTypes: {
            nullLabel: React.PropTypes.string
        },
        getNullLabelFromProps: function() {
            return this.props.nullLabel || this.translateIfNeeded('list_design_panel_Customize_TextField_CustomTheme_DropdownItem_Label');
        },
        getInitialState: function() {
            return {
                nullLabel: this.getNullLabelFromProps()
            };
        },
        getDefaultProps: function () {
            return {
                stylesMap: consts.DEFAULT_STYLES_MAP,
                toolbarMode: false,
                optionsWidth: 264
            };
        },
        getStyleOptions: function () {
            var styles = [],
                self = this,
                styleObject = {};

            _.forEach(this.props.stylesMap, function (style) {
                styleObject = fontUtils.getStyleFont(style.tag, self.props.stylesMap, self.props.themeColors, self.props.themeFonts);
                styleObject.tag = style.seoTag;
                styleObject.cssClass = style.cssClass;
                styleObject.displayName = style.displayName;
                styles.push(styleObject);
            });
            return styles;
        },
        getDisplayStyle: function (style) {
            var nameStyle = {
                'fontWeight': style.weight,
                'fontFamily': style.family + ',' + style.fontWithFallbacks,
                'fontSize': (parseInt(style.size, 10) <= 28) ? style.size : '28px',
                'fontStyle': style.style
            };
            return nameStyle;
        },
        isExpanded: function () {
            return this.refs.dropdown.isExpanded();
        },
        render: template,
        isCustom: function() {
            var self = this;
            var selectedStyle = _.find(this.props.stylesMap, function (style) {
                return style.cssClass === self.props.value;
            });

            return !selectedStyle;
        }
    });
});
