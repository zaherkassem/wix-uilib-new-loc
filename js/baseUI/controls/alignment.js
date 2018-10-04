define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/controls/alignment.rt'], function (React, _, radioButtonsMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'alignment',
        mixins: [radioButtonsMixin],
        getDefaultProps: function () {
            return {
                options: [
                    {value: 'left top', label: '', className: ''},
                    {value: 'center top', label: '', className: ''},
                    {value: 'right top', label: '', className: ''},
                    {value: 'left center', label: '', className: ''},
                    {value: 'center center', label: '', className: ''},
                    {value: 'right center', label: '', className: ''},
                    {value: 'left bottom', label: '', className: ''},
                    {value: 'center bottom', label: '', className: ''},
                    {value: 'right bottom', label: '', className: ''}
                ]
            };
        },
        render: template
    });
});
