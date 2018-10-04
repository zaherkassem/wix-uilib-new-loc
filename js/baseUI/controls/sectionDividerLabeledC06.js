define(['react', 'lodash', 'util', 'baseUI/controls/sectionDividerLabeledC06.rt'], function (React, _, util, template) {
    'use strict';

    return React.createClass({
        displayName: 'sectionDividerLabeledC06',
        mixins: [util.translationMixin],
        propTypes: {
            label: React.PropTypes.string,
            infoTitle: React.PropTypes.string,
            infoText: React.PropTypes.string
        },
        render: template
    });
});

