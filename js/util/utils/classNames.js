define([], function() {
    'use strict';

    return {
        inheritClassName: function(props, defaultClassName) {
            return (defaultClassName ? defaultClassName : '') + (props.className ? ' ' + props.className : '');
        }
    };
});
