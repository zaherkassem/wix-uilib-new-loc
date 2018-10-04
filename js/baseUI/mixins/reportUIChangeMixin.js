define(['react'], function(React){
    'use strict';
    return {
        contextTypes: {
            reportUIChange: React.PropTypes.func
        },
        reportUIChange: function(changeEvent){
            if (this.context.reportUIChange) {
                this.context.reportUIChange(this.constructor.displayName, this.props.instanceId || this.props.label, changeEvent);
            }
        }
    };
});