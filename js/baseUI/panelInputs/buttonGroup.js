define(['react', 'lodash', 'baseUI/panelInputs/inputMixin', 'baseUI/panelInputs/buttonGroup.rt'], function (React, _, inputMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'ButtonGroup',
        mixins: [inputMixin],
        handleClick: function(idx) {
            var option = this.props.options[idx];
            this.callOnChangeIfExists(option.value);
        },
        render: template
    });
});