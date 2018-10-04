define(['react',
    'lodash',
    'util',
    'baseUI/panelInputs/inputMixin',
    'baseUI/panelInputs/prefixedTextInput.rt'], function (React, _, util, inputMixin, template) {
    'use strict';

    return React.createClass({
        mixins: [inputMixin, util.translationMixin],
        displayName: 'prefixedTextInput',
        propTypes: {
            label: React.PropTypes.string,
            prefix: React.PropTypes.string.isRequired
        },

        getInputPrefix: function () {
            return this.props.prefix;
        },

        getInputProps: function () {
            return _.omit(this.props, 'label');
        },

        render: template
    });
});