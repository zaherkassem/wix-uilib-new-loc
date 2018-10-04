define(['lodash'], function (_) {
    'use strict';

    /**
     * @param {string} baseUrl
     * @param {Object.<string, string>} params
     * @constructor
     */
    function Builder(baseUrl, params) {
        this._base = baseUrl;
        this.params = params || {};
    }

    /**
     * @param {string} baseUrl
     * @return {Builder}
     */
    Builder.prototype.base = function (baseUrl) {
        this._base = baseUrl;
        return this;
    };

    /**
     * @param {string} name
     * @param {string} value
     * @return {Builder}
     */
    Builder.prototype.param = function (name, value) {
        this.params[name] = value;
        return this;
    };

    /**
     * @param {*} condition
     * @param {string} name
     * @param {string} value
     * @return {Builder}
     */
    Builder.prototype.ifParam = function (condition, name, value) {
        if (condition) {
            return this.param(name, value);
        }
        return this;
    };

    /**
     * @param {Object} params
     * @return {Builder}
     */
    Builder.prototype.paramsObj = function(params) {
        this.params = _.assign(this.params, params);
        return this;
    };

    /**
     * @return {string}
     */
    Builder.prototype.url = function () {
        var query = _(this.params).toPairs().map(function (i) {
            return i.join('=');
        }).value().join('&');
        if (query) {
            query = '?' + query;
        }
        return this._base + query;
    };

    return Builder;
});
