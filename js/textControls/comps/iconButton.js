define(['react', 'lodash', 'textControls/comps/iconButton.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'iconButton',
        render: template,
        propTypes: {
            isSelected: React.PropTypes.bool,
            buttonMode: React.PropTypes.bool,
            popupMode: React.PropTypes.bool
        },
        getDefaultProps: function () {
            return {
                isSelected: false,
                buttonMode: true,
                popupMode: false
            };
        },
        getClassName: function () {
            var classes = '';

            if (this.props.className) {
                classes += ' ' + this.props.className;
            }
            if (this.props.isSelected) {
                classes += ' selected';
            }
            if (this.props.buttonMode && !this.props.popupMode) {
                classes += ' icon-button';
            }
            if (this.props.popupMode) {
                classes += ' icon-button popup';
            }
            return classes.trim();
        }
    });
});
