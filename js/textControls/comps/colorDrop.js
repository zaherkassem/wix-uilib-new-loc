define(['react', 'lodash', 'textControls/comps/colorDrop.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        propTypes: {
            fill: React.PropTypes.string
        },
        displayName: 'colorDrop',
        render: template
    });
});
