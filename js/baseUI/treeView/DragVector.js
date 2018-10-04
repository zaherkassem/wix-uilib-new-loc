define([], function () {
    'use strict';

    function DragVector(depth, position) {
        this.depth = depth;
        this.position = position;
    }

    DragVector.prototype.isOutside = function () {
        return this.depth < 0;
    };

    DragVector.prototype.isInside = function () {
        return this.depth > 0;
    };

    DragVector.prototype.isBack = function () {
        return this.position < 0;
    };

    DragVector.prototype.isForward = function () {
        return this.position > 0;
    };

    DragVector.prototype.isZero = function () {
        return this.depth === 0 && this.position === 0;
    };

    DragVector.prototype.toString = function () {
        return [this.depth, this.position].join(', ');
    };

    return DragVector;
});
