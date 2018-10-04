define(['util/url/url'], function(url) {
    'use strict';

    return {
        editorSessionId: url.parseUrl(window.location.href).query.editorSessionId
    };
});