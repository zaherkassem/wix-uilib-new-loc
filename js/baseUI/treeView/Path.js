define(function () {
    'use strict';

    /**
     * Represents path to node in hierarchical structure
     * @constructor
     * @param {Array} [path]
     */
    function Path(path) {
        this.path = path || [];
    }

    Path.prototype.length = function () {
        return this.path.length;
    };

    Path.prototype.append = function (segment) {
        if (segment === undefined) {
            throw new Error('segment should be defined');
        }

        return new Path(this.path.concat(segment));
    };

    function arraySelector(arr, segment) {
        return arr && arr[segment];
    }

    function arrayObjectSelector(obj, segment, prop) {
        return obj && obj[prop] && obj[prop][segment];
    }

    function customFunctionSelector(obj, segment, fn) {
        return fn(obj, segment);
    }

    Path.prototype.findIn = function (object, selector) {
        var root = object,
            i, segment, getter;

        if (typeof selector === 'undefined') {
            getter = arraySelector;
        }

        if (typeof selector === 'string') {
            getter = arrayObjectSelector;
        }

        if (typeof selector === 'function') {
            getter = customFunctionSelector;
        }

        for (i = 0; root && i < this.path.length; i++) {
            segment = this.path[i];
            root = getter(root, segment, selector);
        }

        return root;
    };

    Path.prototype.parent = function () {
        var path = this.path.slice(0, this.path.length - 1);
        return new Path(path);
    };

    Path.prototype.at = function (index) {
        if (typeof index !== 'number') {
            throw new Error('index should be a number');
        }

        return this.path[index];
    };

    Path.prototype.first = function (n) {
        var sliced = this.path.slice(0, n || 1);
        return new Path(sliced);
    };

    Path.prototype.atRight = function (index) {
        return this.path[this.path.length - (index || 0) - 1];
    };

    Path.prototype.toString = function () {
        return this.path.join(', ');
    };

    Path.prototype.equalsTo = function (path) {
        if (this === path) {
            return true;
        }

        if (path instanceof Path) {
            if (this.length() !== path.length()) {
                return false;
            }

            return this.path.every(function (x, i) {
                return x === path.path[i];
            });
        }

        return false;
    };

    Path.prototype.startsWith = function (subpath, strictMatch) {
        if (subpath instanceof Path) {
            if (subpath.length() > this.length()) {
                return false;
            }

            if (strictMatch && subpath.length() === this.length()) {
                return false;
            }

            return subpath.path.every(function (x, i) {
                return x === this.path[i];
            }, this);
        }

        return false;
    };

    Path.prototype.inc = function (incrementValue) {
        var path;

        if (this.length() === 0) {
            return new Path([0]);
        }

        path = this.path.slice();

        if (incrementValue === undefined) {
            path[path.length - 1] += 1;
        } else {
            path[path.length - 1] += incrementValue;
        }

        return new Path(path);
    };

    Path.prototype.dec = function (decrementValue) {
        if (decrementValue === undefined) {
            return this.inc(-1);
        }

        return this.inc(-decrementValue);
    };

    Path.prototype.increment = function (lv) {
        var path;

        if (this.length() === lv) {
            path = this.append(0);
        } else {
            path = this.first(lv + 1);
            path.path[lv] += 1;
        }

        return path;
    };

    return Path;
});
