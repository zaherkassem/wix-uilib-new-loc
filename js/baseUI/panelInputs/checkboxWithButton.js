define([
    'react',
    'baseUI/controls/toggleMixin',
    'baseUI/panelInputs/checkboxWithButton.rt'
], function (React, booleanMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'CheckboxWithButton',
        mixins: [booleanMixin],
        propTypes: {
            buttonLabel: React.PropTypes.string.isRequired,
            onButtonClick: React.PropTypes.func,
            isCheckboxDisabled: React.PropTypes.bool,
            isButtonDisabled: React.PropTypes.bool
        },
        render: template
    });

});