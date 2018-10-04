define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/controls/thumbnailsVertical.rt'], function
    (React, _, radioButtonsMixin, template) {
    'use strict';

    // This class is common control C-52 and C-57

    return React.createClass({
        displayName: 'thumbnails-vertical',
        mixins: [radioButtonsMixin],
        propTypes: {
            options: React.PropTypes.array.isRequired,
            valueLink: React.PropTypes.object,
            imageMargin: React.PropTypes.string,
            align: React.PropTypes.string
        },
        getDefaultProps: function() {
            return {
                align: 'center',
                imageMargin: '5px'
            };
        },
        isCurrentValue: function(value){
            var currentValue = this.getValueFromProps(this.props);
            return _.isEqual(value, currentValue);
        },
        render: template
    });
});
