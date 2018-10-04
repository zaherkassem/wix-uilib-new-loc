define([], function () {
    'use strict';

    function arrayify(variable) {
        if (variable instanceof Array) {
            return variable;
        }
        if (typeof variable === 'string') {
            return variable.split('.');
        }
        throw new Error('pathElements passed to setDeepPath/getDeepPath must be an Array or a String!');
    }

    function setDeepPath(obj, pathElements, newVal) {
        pathElements = arrayify(pathElements);
        var key;
        while (pathElements.length > 1) {
            key = pathElements.shift();
            if (obj[key] === undefined) {
                obj[key] = {};
                if (obj[key] === undefined) {
                    return undefined;
                }
            }
            obj = obj[key];
        }
        key = pathElements.shift();
        obj[key] = newVal;
        return obj[key];
    }

    function getDeepPath(obj, pathElements) {
        pathElements = arrayify(pathElements);
        while (pathElements.length) {
            if (!obj) {
                return undefined;
            }
            obj = obj[pathElements.shift()];
        }
        return obj;
    }

    return {
        setDeepPath: setDeepPath,
        getDeepPath: getDeepPath
    };
});
