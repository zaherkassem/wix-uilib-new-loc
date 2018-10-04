define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/controls/horizontalTabs.rt'], function (React, _, radioMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'HorizontalTabs',
        mixins: [radioMixin],
        getDefaultProps: function () {
            return {
                options: [
                    { label: 'Image_Button_Settings_Regular_View_Label', value: 1 },
                    { label: 'Image_Button_Settings_Hover_View_Label', value: 2 },
                    { label: 'Image_Button_Settings_Clicked_View_Label', value: 3 }
                ]
            };
        },
        render: template
    });
});
