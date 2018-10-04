define(['react', 'lodash', 'util'], function (React, _, util) {
    'use strict';

    return {

        mixins: [util.valueLinkMixin, util.propTypesFilterMixin],

        propTypes: {
            label: React.PropTypes.string,
            disabled: React.PropTypes.bool
        },

        hasLabel: function () {
            return this.props.label !== undefined && this.props.label.trim().length > 0;
        },

        getLabel: function () {
            return this.props.label !== undefined ? this.props.label : '';
        },

        isDisabled: function () {
            return this.props.disabled === true;
        },

        getClassName: function(defaultClassName) {
            return util.inheritClassName(this.props, defaultClassName);
        }
    };
});
