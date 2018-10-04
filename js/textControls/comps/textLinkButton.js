define(['react', 'lodash', 'textControls/comps/textLinkButton.rt', 'panels'], function (React, _, template, panels) {
    'use strict';

    return React.createClass({
        displayName: 'textLinkButton',
        mixins: [panels.linkToMixin],
        render: template
    });
});
