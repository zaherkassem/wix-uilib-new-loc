define(['react', 'lodash', 'textControls/comps/textColor.rt', 'textControls/utils/ckUtils'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'textColor',
        propTypes: {
            tooltipValue: React.PropTypes.string,
            value: React.PropTypes.string,
            isBackColor: React.PropTypes.bool,
            onClick: React.PropTypes.func.isRequired
        },

        getDefaultProps: function () {
            return {
                isBackColor: false
            };
        },
        render: template
    });
});
