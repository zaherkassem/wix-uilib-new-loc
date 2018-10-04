define([
    'react-dom',
    'react',
    'lodash',
    'jquery',
    'util',
    'baseUI/colorPicker/palettesList.rt'
], function(ReactDOM, React, _, $, util, template) {
    'use strict';


    var rootColorsKeys = ['color_13', 'color_19', 'color_23', 'color_29', 'color_33'];

    return React.createClass({
        displayName: 'paletteList',
        mixins: [util.propTypesFilterMixin, util.valueLinkMixin],
        propTypes: {
            palettes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
            valueLink: React.PropTypes.shape({
                value: React.PropTypes.object,
                requestChange: React.PropTypes.func.isRequired
            }).isRequired,
            onPreview: React.PropTypes.func.isRequired
        },
        componentDidMount: function() {
            if (this.refs.selectedPalette) {
                var $paletteColorsWrapper = $(ReactDOM.findDOMNode(this));
                var $selectedPaletteNode = $(ReactDOM.findDOMNode(this.refs.selectedPalette));
                var selectedTop = $selectedPaletteNode.position().top;
                var wrapperHeight = $paletteColorsWrapper.height();

                $paletteColorsWrapper.scrollTop(selectedTop - (0.5 * wrapperHeight));
            }
        },
        arePalettesEqual: function(palette1, palette2) {
            return _.isEmpty(_.difference(this.getRootColors(palette1), this.getRootColors(palette2)));
        },
        getPaletteOptionProps: function(palette) {
            var selectedPalette = this.getValueFromProps();
            var isSelected = this.arePalettesEqual(selectedPalette, palette);

            var props = { className: 'palette-option' + (isSelected ? ' selected' : '') };
            if (isSelected) {
                props.ref = 'selectedPalette';
            }

            return props;
        },
        getPaletteOptionColorClasses: function(color) {
            return {
                'palette-option-color': true,
                'white-color': util.colors.getDistanceToWhite(color) < 3
            };
        },
        getRootColors: function(paletteColors) {
            return _.chain(paletteColors)
                .pick(rootColorsKeys)
                .values()
                .value();
        },
        previewPalette: function(palette) {
            this.props.onPreview(palette);
        },
        selectPalette: function(palette) {
            this.callOnChangeIfExists(palette);
        },
        resetPalette: function() {
            this.callOnChangeIfExists(this.getValueFromProps());
        },
        render: template
    });
});
