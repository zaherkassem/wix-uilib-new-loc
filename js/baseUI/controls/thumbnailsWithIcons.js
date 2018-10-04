define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/controls/thumbnailsWithIcons.rt'], function
    (React, _, radioButtonsMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'thumbnailsWithIcons',
        mixins: [radioButtonsMixin],
        propTypes: {
            options: React.PropTypes.array.isRequired,
            label: React.PropTypes.string
        },
        render: template
    });
});
