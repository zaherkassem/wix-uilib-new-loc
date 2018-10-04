define(['react', 'lodash'], function (React, _) {
    'use strict';

    return {
        /**
         * @returns {Object} Own props, after filtering the props defined in propTypes of this and its mixins
         */
        filteredProps: function () {
            return _.omit(this.props, _.keys(this.constructor.propTypes));
        },

        /**
         * This is a temporary function that substitutes `title` with `headerTitle` prop
         * Since `title` is a valid HTML attribute it should not be used with rt-props as
         * this will result in an unexpected `alt text` to appear when hovering the component.
         *
         * See JIRA Issue: https://jira.wixpress.com/browse/SE-4679
         * @returns {Object} Own props, after filtering the props defined in propTypes of this and its mixins
         */
        getContentProps: function () {
            var filteredProps = this.filteredProps();
            filteredProps.headerTitle = filteredProps.title;
            return _.omit(filteredProps, 'title');
        }
    };
});
