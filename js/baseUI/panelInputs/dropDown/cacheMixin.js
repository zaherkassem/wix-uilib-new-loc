define(['lodash'], function(_){
    'use strict';

    return {
        cache: null,

        resetCache: function(){
            this.cache = null;
        },

        updateCache: function(name, value){
            if (!this.cache) {
                this.cache = {};
            }

            if (typeof name === 'string'){
                this.cache[name] = value;
            } else if (typeof name === 'object'){
                _.forEach(name, (function(val, prop){
                    this.cache[prop] = val;
                }).bind(this), this);
            }

            return this.cache;
        },

        getCached: function(name){
            if (this.cache){
                return this.cache[name];
            }
        }
    };
});
