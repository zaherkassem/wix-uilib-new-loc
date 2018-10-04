define(['lodash'], function (_) {
    'use strict';

    var registeredOuterClickListeners = [];
    var isDocumentInitialized = false;

    function initializeDocumentListener(){
        if (!isDocumentInitialized) {
            document.addEventListener('mousedown', callOnOuterClick);
            isDocumentInitialized = true;
        }
    }

    var heyIWasClickedOn = [];

    function callOnOuterClick(e){

        var listenersToInvoke = registeredOuterClickListeners.slice();
        var component;
        while (heyIWasClickedOn.length){
            component = heyIWasClickedOn.pop();
            _.remove(listenersToInvoke, {domNode: component.domNode});
        }
        _.invoke(listenersToInvoke, 'listener', e);
    }


    function registerOuterClick(component){
        registeredOuterClickListeners.push(component);
        component.domNode.addEventListener('mousedown', function(){
            heyIWasClickedOn.push(component);
        }, true);
    }

    function unregisterOuterClick(component){
        _.remove(registeredOuterClickListeners, {domNode: component.domNode});
    }

    return {
        componentDidMount: function () {
            if (!_.isFunction(this.onOuterClick)) {
                throw new Error('using the outerClickMixin requires specifying an onOuterClick function.' +
                    'Please see ' + (this.constructor.displayName || 'ReactCompositeComponent')
                );
            }
            initializeDocumentListener();
            registerOuterClick({domNode: ReactDOM.findDOMNode(this), listener: this.onOuterClick});

        },
        componentWillUnmount: function () {
            unregisterOuterClick({domNode: ReactDOM.findDOMNode(this)});
        }
    };
});