define([], function(){
    'use strict';

    return {
        generateClassName: function(className){
            className = className || '';
            var additionalClassName = this.props.className;

            if (additionalClassName){
                className += ' ' + additionalClassName;
            }

            return className;
        }
    };
});