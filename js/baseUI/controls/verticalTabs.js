define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/controls/verticalTabs.rt'], function (React, _, radioMixin, template) {
    'use strict';

    return React.createClass({
        displayName: 'verticalTabs',
        propTypes: {
            tabClicked: React.PropTypes.func
        },
        mixins: [radioMixin],
        render: template,
        reportTabClicked: function () {
            if (_.isFunction(this.props.tabClicked)) {
                this.props.tabClicked();
            }
        }
    });
});
