define(['react', 'lodash'], function(React, _){
    'use strict';


    return {
        contextTypes: {
            editorAPI: React.PropTypes.object
        },
        getEditorAPI: function(){
            return this.context.editorAPI || {
                    bi: _.noop
                };
        }
    };
});