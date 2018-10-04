(function(exports) {

    var holdJQueryDOMReady = function(){
        var timeoutTicket;
        if(window.Wix){
            if(Wix.Utils.getViewMode() === 'standalone'){
                setTimeout(function(){
                    if(!exports.__disableStandaloneError__ ){
                        throw new Error('Standalone mode: Wix style params are not available outside of the "wix editor"');
                    }
                },0);
            } else {
                holdReady(true);
                timeoutTicket = setTimeout(function(){
                    holdReady(false);
                    if(!exports.__disableStandaloneError__ ){
                        throw new Error('Style params are not available outside of the "wix editor", if you are in the editor ');
                    }
                }, 3333);
                (Wix.Styles || Wix).getStyleParams(function(){
                    clearTimeout(timeoutTicket);
                    holdReady(false);
                });
            }
        }

        function holdReady(hold){
            if (window.jQuery && window.jQuery.holdReady) {
                window.jQuery.holdReady( hold );
            }
        }
    };

    var initialize = function(options) {
        var $rootEl = options && options.$rootEl && $(options.$rootEl) || $('body');
        var elements = $rootEl.addBack().find('[wix-ctrl]');
        for (var i = 0; i < elements.length; i++) {
            initializePlugin(elements[i]);
        }
    };

    var initializePlugin = function(element, overrideOptions) {
        if(element instanceof jQuery){
            return element.each(function(){
                initializePlugin(this, overrideOptions);
            });
        }
        var ctrl = getCtrl(element);
        if (ctrl) {
            var ctrlName = $.trim(ctrl);
            var options = getOptions(element, ctrl);
            applyPlugin(element, ctrlName, overrideOptions || options);
        }
    };

    var log = function() {
        var args = ['<ui-lib>'];
        args.push.apply(args,arguments);
        false && console.log.apply(console, args);
    };

    var applyPlugin = function(element, pluginName, options) {
        if ($.fn[pluginName]) {
            log('initializing ' + pluginName, options);
            $(element)[pluginName](options);
        } else {
            console.error('Plugin ' + pluginName + ' does not exist');
        }
    };

    var getCtrl = function(element){
        return getAttribute(element, 'wix-controller') || getAttribute(element, 'wix-ctrl');
    };

    var getAttribute = function(element, attr) {
        var val = element.getAttribute(attr);
        if (!val) {
            val = element.getAttribute('data-' + attr);
        }
        return val;
    };

    var getOptions = function(element){
        var options = getAttribute(element, 'wix-options');
        return evalOptions(options) || {};
    };

    var evalOptions = function(options){
        try {
            return (new Function('return '+ options + ';'))();
        } catch(e) {
            throw new Error('Options for plugin are not valid: ' + options);
        }
    };

    holdJQueryDOMReady();

    exports.UI = {
        initialize: initialize
    };

})(window.Wix || window);