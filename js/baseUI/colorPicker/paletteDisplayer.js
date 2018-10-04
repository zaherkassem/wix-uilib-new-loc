define(['react', 'lodash', 'core', 'util', 'baseUI/colorPicker/paletteDisplayer.rt'], function (React, _, core, util, template) {
    'use strict';

    function invertMatrix(matrix, rows, cols) {
        var result = [];
        var total = rows * cols;

        for (var mod = 0; mod < rows; mod++) {
            for (var index = mod; index < total; index += rows) {
                result.push(matrix[index]);
            }
        }

        return result;
    }

    return React.createClass({
        displayName: 'paletteDisplayer',
        mixins: [core.mixins.editorAPIMixin, util.valueLinkMixin, util.propTypesFilterMixin],
        propTypes: {
            palette: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
            isSelectable: React.PropTypes.bool,
            onPreview: React.PropTypes.func
        },
        getColors: function() {
            var result = [];
            _.forEach(this.props.palette, function(colorValue, colorSymbol) {
                var colorIndex = parseInt(/color_(\d+)/.exec(colorSymbol)[1], 10);
                if (colorIndex >= 11) {
                    result.push({symbol: colorSymbol, value: colorValue});
                }
            });

            return invertMatrix(result, 5, result.length / 5);
        },
        getOptionClasses: function(colorObj) {
            return {
                'palette-color-option': true,
                'white-option': util.colors.getDistanceToWhite(colorObj.value) < 3,
                'option-selected': this.getValueFromProps() === colorObj.symbol,
                'selectable': this.props.isSelectable
            };
        },
        previewColor: function(color) {
            if (this.props.isSelectable && this.props.onPreview) {
                this.props.onPreview(color);
            }
        },
        selectColor: function(color, colorIndex) {
            this.getEditorAPI().bi.event(core.bi.events.colorPicker.CHANGE_SITE_COLORS_LINK_CLICKED, {
                index_selected_color: colorIndex
            });
            if (this.props.isSelectable) {
                this.callOnChangeIfExists(color);
            }
        },
        selectColorAndClose: function(color) {
            if (this.props.isSelectable) {
                this.callOnChangeIfExists(color, true);
            }
        },
        render: template
    });
});
