define(['lodash', 'keyboardMaster'], function (_, keyboardMaster) {
    'use strict';

    // Add shared contexts names in the Editor here, if you think they could be extended.
    var SHARED_CONTEXTS = {
        TOP_CONTEXT: 'all',
        EDITOR: 'EDITOR',
        PREVIEW: 'PREVIEW',
        TOP_BAR: 'TOP_BAR',
        MENU_BAR: 'MENU_BAR',
        MODAL_PANEL: 'MODAL_PANEL',
        AUTOMATIC: 'AUTOMATIC'
    };

    var SHARED_CONTEXTS_KEYBOARD_ACTIONS = {
        TOP_CONTEXT: {},
        EDITOR: {},
        PREVIEW: {},
        TOP_BAR: {}
    };

    var lastEnabledContext = null;
    var DISABLED_CONTEXT = '!DISABLED!';
    var DEFAULT_CONTEXT = SHARED_CONTEXTS.TOP_CONTEXT;

    var currentContext = DEFAULT_CONTEXT;

    var keyMaster = keyboardMaster.noConflict();

    var specialKeys = {
        space: 'space',
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right',
        home: 'home',
        end: 'end',
        pageUp: 'pageup',
        pageDown: 'pagedown',
        del: 'del',
        esc: 'esc',
        enter: 'enter',
        backspace: 'backspace',
        tab: 'tab',
        alt: 'alt',
        option: 'option',
        shift: 'shift',
        ctrl: 'ctrl',
        command: 'command'
    };

    function filter(event) {
        var tagName = (event.target || event.srcElement).tagName;

        if (tagName === 'INPUT') {
            var isCtrlOrCmd = event.metaKey || event.ctrlKey;
            var isZorY = event.keyCode === 90 || event.keyCode === 89;

            // allow undo/redo in inputs
            if (isCtrlOrCmd && isZorY) {
                event.preventDefault();
                return true;
            }

            // filter all other keyboard shortcuts
            return false;
        }

        // ignore keypressed in any elements that support keyboard data input
        return !(tagName === 'SELECT' || tagName === 'TEXTAREA');
    }

    function disable() {
        lastEnabledContext = currentContext;
        setCurrentContext(DISABLED_CONTEXT);
    }

    function enable() {
        if (!areKeyboardShortcutsEnabled()) {
            setContext(lastEnabledContext);
            lastEnabledContext = null;
        }
    }

    function areKeyboardShortcutsEnabled() {
        return getCurrentContext() !== DISABLED_CONTEXT;
    }

    function registerContext(context, shortcuts) {
        if (isValidContext(context) && shortcuts) {
            if (SHARED_CONTEXTS_KEYBOARD_ACTIONS[context]) {
                unregisterContext(context);
            }
            SHARED_CONTEXTS_KEYBOARD_ACTIONS[context] = shortcuts;
            _.forOwn(shortcuts, function (shortcutAction, shortCutCombo) {
                registerShortcut(shortCutCombo, context, shortcutAction);
            });
        }
    }

    function unregisterContext(context) {
        if (isValidContext(context)) {
            keyMaster.deleteScope(context);
            SHARED_CONTEXTS_KEYBOARD_ACTIONS[context] = {};
        }
    }

    function registerShortcut(shortcut, context, action) {
        if (!_.isEmpty(shortcut) && action && isValidContext(context)) {
            keyMaster(shortcut, context, action);
        }
    }

    function isValidContext(context) {
        return !_.isEmpty(context);
    }

    function clearContext() {
        setCurrentContext(DEFAULT_CONTEXT);
    }

    function getCurrentContext() {
        return currentContext;
    }

    function setCurrentContext(contextName) {
        if (areKeyboardShortcutsEnabled()) {
            setContext(contextName);
        }
    }

    function setContext(contextName) {
        currentContext = contextName;
        keyMaster.setScope(contextName);
    }

    function extendContext(contextNameToExtend, extension) {
        var target = {};
        var extendedContext = SHARED_CONTEXTS_KEYBOARD_ACTIONS[contextNameToExtend] || {};
        _.extend(target, extendedContext);
        _.extend(target, extension);
        return target;
    }

    keyMaster.filter = filter;

    return {
        CONTEXTS: SHARED_CONTEXTS,

        disable: disable,
        enable: enable,

        isEnabled: areKeyboardShortcutsEnabled,

        specialKeys: specialKeys,
        extendContext: extendContext,
        getContext: getCurrentContext,

        setContext: setCurrentContext,

        clearContext: clearContext,
        registerContext: registerContext,
        unregisterContext: unregisterContext
    };
});
