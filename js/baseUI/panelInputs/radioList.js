define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/panelInputs/radioList.rt'],
    function (React, _, radioMixin, template) {
        'use strict';

        return React.createClass({
            displayName: 'RadioList',
            mixins: [radioMixin],
            render: template
        });
    });
