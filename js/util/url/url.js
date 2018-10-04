/**
 * Created by eitanr on 6/12/14.
 */
define(['lodash', 'pLoader!santa:utils', 'util/utils/string'], function (_, utils, stringUtils) {
    'use strict';

    function addProtocolIfMissing(url) {
        var beginsWithProtocol = /^(ftps|ftp|http|https):.*$/.test(url),
            beginsWithDoubleSlash = /^\/\//.test(url);

        if (beginsWithProtocol) {
            return url;
        }
        if (beginsWithDoubleSlash) {
            return 'http:' + url;
        }

        return 'http://' + url;
    }

    function toQueryString(jsonObj) {
        return Object.keys(jsonObj).map(function (key) {
            return toQueryParam(key, jsonObj[key]);
        }).join('&');
    }

    function toQueryParam(key, val) {
        if (!val){
            if (typeof val === 'number'){
                return encodeURIComponent(key) + '=' + encodeURIComponent(val);
            }
            return encodeURIComponent(key);
        }
        if (_.isArray(val)) {
            return val.map(function (innerVal) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(innerVal);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }

    function baseUrl(url) {
        var parsed = parseUrl(url);
        return parsed.protocol + '//' + parsed.host;
    }

    var uniqueCounter = 0;

    function cacheKiller() {
        return new Date().getTime().toString() + uniqueCounter++;
    }

    function resetCacheKiller() {
        uniqueCounter = 0;
    }

    function parseUrl(url) {
        if (!url) {
            return {};
        }
        var urlRe = /((https?\:)\/\/)?([^\?\:\/#]+)(\:([0-9]+))?(\/[^\?\#]*)?(\?([^#]*))?(#.*)?/i;
        var match = url.match(urlRe);
        var port = match[5] || '';
        var search = match[8] ? ('?' + match[8]) : '';
        var ret = {
            full: url,
            protocol: match[2] || 'http:',
            host: match[3] + (port ? (':' + port) : ''),
            hostname: match[3],
            port: port,
            path: match[6] || '/',
            search: search,
            query: {},
            hash: match[9] || ''
        };

        // fix empty hash
        if (ret.hash === '#' || ret.hash === '#!') {
            ret.hash = '';
        }

        ret.query = parseUrlParams(match[8]);
        return ret;
    }

    function parseUrlParams(queryString) {
        var re = /([^&=]+)=([^&]*)/g;
        var param, query = {};

        while ((param = re.exec(queryString)) !== null) {
            var key = decodeURIComponent(param[1]);
            var val = decodeURIComponent(param[2]);
            if (!query[key]) {
                // first value for key, keep as string
                query[key] = val;
            } else if (_.isArray(query[key])) {
                // more than one value already, push to the array
                query[key].push(val);
            } else {
                // the 2nd value for the key, turn into an array
                query[key] = [query[key], val];
            }
        }

        return query;
    }

    function setUrlParam(url, paramName, value) {
        var urlParts = url.split('?');
        var paramList = [];
        var replaced = false;
        if (urlParts.length > 1) {
            paramList = urlParts[1].split('&');
            _.find(paramList, function (param, i, params) {
                if (stringUtils.startsWith(param, paramName + '=')) {
                    params[i] = paramName + '=' + String(value);
                    replaced = true;
                    return true;
                }
            });
        }

        if (!replaced) {
            paramList.push(paramName + '=' + String(value));
        }

        urlParts[1] = paramList.join('&');
        url = urlParts.join('?');
        return url;
    }

    function setUrlParams(url, params) {
        var urlWithParams = url;

        _.forEach(params, function (value, key) {
            urlWithParams = setUrlParam(urlWithParams, key, value);
        });

        return urlWithParams;
    }

    function buildFullUrl(urlObj) {
        if (urlObj.search) {
            urlObj.search = urlObj.search.replace(/^[?]/, '');
        }

        var query = (urlObj.search || toQueryString(urlObj.query || {}));

        if (query) {
            var queryPrefix = _.includes(urlObj.path, '?') ? '&' : '?';
            query = queryPrefix + query;
        }

        return urlObj.protocol + '//' +
            urlObj.hostname + (urlObj.port ? ':' + urlObj.port : '') +
            urlObj.path +
            (query || '') +
            urlObj.hash;
    }

    function isExternalUrl(url) {
        return (/(^https?)|(^data)/).test(url);
    }

    function getParameterByName(name, urlQueries) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i'),
            results = regex.exec(urlQueries || location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    function isTrue(name, urlQueries) {
        return stringUtils.isTrue(getParameterByName(name, urlQueries).toLowerCase());
    }

    return {
        addProtocolIfMissing: addProtocolIfMissing,
        toQueryString: toQueryString,
        toQueryParam: toQueryParam,
        baseUrl: baseUrl,
        cacheKiller: cacheKiller,
        resetCacheKiller: resetCacheKiller,
        setUrlParam: setUrlParam,
        setUrlParams: setUrlParams,
        isExternalUrl: isExternalUrl,

        /**
         * @typedef {object} ParseUrlReturnType
         * @property {string} full The whole URL that was passed
         * @property {string} protocol The protocol (http: or https:)
         * @property {string} host The host of the URL, including port
         * @property {string} hostname The host name of the URL, not including port
         * @property {string} port The port, or empty string
         * @property {string} path The path after the host
         * @property {object} query The query string as object containing string keys, and values will be the following:
         *  string, if there's one param
         *  array, if there's more than one value for the params
         * @property {string} search The full search string, including the question mark
         * @property {string} hash The hash that was passed, including the hash sign or empty string
         */


        /**
         * Parses a URL and returns an object with sliced down parameters
         * @returns {ParseUrlReturnType} The parsed object
         */
        parseUrl: parseUrl,
        parseUrlParams: parseUrlParams,
        buildFullUrl: buildFullUrl,
        getParameterByName: getParameterByName,
        isTrue: isTrue,
        joinURL: utils.urlUtils.joinURL
    };
});
