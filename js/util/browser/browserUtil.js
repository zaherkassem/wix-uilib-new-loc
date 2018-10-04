define([], function() {
    'use strict';

    var USER_AGENTS = {
        MAC: 'macintosh',
        CHROME: 'chrome',
        IE: 'msie',
        SAFARI: 'safari'
    };

    function isUserAgentOfType(type) {
        var userAgent = getUserAgent();
        return userAgent && userAgent.indexOf(type) !== -1;
    }

    function getUserAgent() {
        return navigator && navigator.userAgent && navigator.userAgent.toLowerCase();
    }

    function isMacintosh() {
        return isUserAgentOfType(USER_AGENTS.MAC);
    }

    function isChrome() {
        return isUserAgentOfType(USER_AGENTS.CHROME);
    }

    function isIE() {
        return isUserAgentOfType(USER_AGENTS.IE);
    }

    function isSafari() {
        return isUserAgentOfType(USER_AGENTS.SAFARI);
    }

    function isSpecialKeyPressed(event) {
        if (isMacintosh()) {
            return event.metaKey;
        }

        return event.ctrlKey;
    }

    function getDevicePixelRatio(){
        return window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI;
    }

    return {
        isMacintosh: isMacintosh,
        isChrome: isChrome,
        isIE: isIE,
        isSafari: isSafari,
        getUserAgent: getUserAgent,
        getDevicePixelRatio: getDevicePixelRatio,
        isSpecialKeyPressed: isSpecialKeyPressed
    };
});