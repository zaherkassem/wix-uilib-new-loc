define(['react', 'lodash', 'baseUI/panelInputs/inputMixin', 'util', 'baseUI/controls/drillDown.rt'], function (React, _, inputMixin, util, template) {
    'use strict';

    return React.createClass({
        displayName: 'drillDown',
        mixins: [inputMixin, util.translationMixin],
        propTypes: {
            label: React.PropTypes.string,
            className: React.PropTypes.string,
            disabled: React.PropTypes.bool,
            icon: React.PropTypes.string
        },
        render: template
    });
});