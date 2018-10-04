define(['react', 'lodash', 'textControls/comps/textBackgroundColor.rt', 'baseUI', 'textControls/comps/colorDrop'], function (React, _, template, baseUI, colorDrop) {
    'use strict';

    return React.createClass({
        displayName: 'backColorDropDown',
        render: template,
        getDefaultProps: function () {
            return {
                colorDrop: true
            };
        },
        shouldRenderDropOwn: function () {
            return this.props.color !== null;
        },
        getDropDownValue: function () {
            return (this.props.color === null) ? 'noColor' : 'customColor';
        },
        getTemplate: function () {
            return React.createElement(colorDrop, {
                'fill': this.props.color,
                'isBackColor': true
            });
        },
        handleChange: function (value) {
            if (value === 'noColor' && this.props.handleNoColor) {
                this.props.handleNoColor();
            }
            if (value === 'customColor' && this.props.onClick) {
                this.props.onClick();
            }
        },
        isExpanded: function () {
            return this.refs.dropdown.isExpanded();
        }
    });
});
