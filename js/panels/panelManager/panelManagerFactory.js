define(['panels/panelManager/panelManager'], function(PanelManagerClass) {
    'use strict';

    var manager = null;

    return {
        getManager: function() {
            manager = manager || new PanelManagerClass();
            return manager;
        }
    };
});