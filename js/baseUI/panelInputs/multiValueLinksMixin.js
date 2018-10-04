define([], function () {
    'use strict';

    return {
        getFieldValueFromProps: function (props, fieldName) {
            props = props || this.props;
            var link = props[fieldName + 'Link'];
            return link !== undefined ? link.value : props[fieldName];
        },

        callOnFieldChangeIfExists: function (fieldName, newVal) {
            var linkName = fieldName + 'Link';
            var onChange = this.props[linkName] ? this.props[linkName].requestChange : this.props['on' + linkName + 'Change'];
            if (onChange) {
                onChange(newVal);
            }
        }
    };
});
