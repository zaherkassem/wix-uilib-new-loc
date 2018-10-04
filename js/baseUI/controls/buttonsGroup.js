/**
 * Created by eitanr on 2/4/15.
 */
define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/controls/buttonsGroup.rt'],
    function (React, _, radioMixin, template) {
        'use strict';

        return React.createClass({
            displayName: 'ButtonsGroup',
            PropTypes: {
                options: React.PropTypes.array.isRequired,
                align: React.PropTypes.string
            },
            mixins: [radioMixin],
            render: template
        });
    });
