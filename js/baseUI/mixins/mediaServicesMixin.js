define(['react'], function(React){
    'use strict';


    return {
        contextTypes: {
            mediaServices: React.PropTypes.object
        },
        getMediaServices: function(){
            return this.context.mediaServices;
        }
    };
});
