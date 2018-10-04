define(['jquery', 'lodash', 'util/math/math', 'util/utils/animationFrame'], function ($, _, mathUtil, animationFrameUtils) {
    'use strict';

    /**
     * A mixin to allow drag of fixed position components
     * Supports drag limits, and dragging a different element than the root element of the class
     */

    var $document = $(document);
    var requestAnimationFrame = animationFrameUtils.request;
    var cancelAnimationFrame = animationFrameUtils.cancel;

    function drag() {
        this.setState({
            isCustomPosition: true
        });

        var draggable = this.draggable;
        draggable.pendingFrameRequest = 0;
        var limits = draggable.limits;

        var left = (draggable.event.pageX - window.pageXOffset - draggable.relPosition.x);
        left = mathUtil.ensureWithinLimits(left, limits.x[0], limits.x[1] - draggable.nodeSizes.width);
        var top = (draggable.event.pageY - window.pageYOffset - draggable.relPosition.y);
        top = mathUtil.ensureWithinLimits(top, limits.y[0], limits.y[1] - draggable.nodeSizes.height);

        draggable.nodePosition.x = left;
        draggable.nodePosition.y = top;

        draggable.element.offset({
            left: left + window.pageXOffset,
            top: top + window.pageYOffset
        });
    }

    function endDrag() {
        $document.off('.draggable');
        var draggable = this.draggable;
        cancelAnimationFrame(draggable.pendingFrameRequest);
        draggable.pendingFrameRequest = 0;
        if (this.onDragEnd) {
            this.onDragEnd({
                left: draggable.nodePosition.x,
                top: draggable.nodePosition.y
            });
        }
        draggable.element = undefined;
    }

    return {
        getInitialState: function () {
            this.draggable = {};
            return {
                isCustomPosition: false
            };
        },
        startDrag: function (event, limits, dragElement) {
            var draggable = this.draggable;
            draggable.limits = {
                x: [],
                y: []
            };
            draggable.element = $(_.isObject(dragElement) && ReactDOM.findDOMNode(dragElement) || ReactDOM.findDOMNode(this));
            if (typeof limits !== 'string'){
                _.assign(draggable.limits, limits);
            }
            var offset = draggable.element.offset();
            draggable.nodePosition = {
                y: offset.top - window.pageYOffset,
                x: offset.left - window.pageXOffset
            };
            draggable.relPosition = {
                x: event.pageX - window.pageXOffset - draggable.nodePosition.x,
                y: event.pageY - window.pageYOffset - draggable.nodePosition.y
            };
            draggable.nodeSizes = {
                height: draggable.element.height(),
                width: draggable.element.width()
            };
            draggable.event = {};
            $document.on({
                'mousemove.draggable': this.onDrag,
                'mouseup.draggable': this.endDrag
            });
            if (this.onDragStart){
                this.onDragStart();
            }
        },
        onDrag: function (event) {
            var draggable = this.draggable;
            draggable.event.pageX = event.pageX;
            draggable.event.pageY = event.pageY;
            if (!draggable.pendingFrameRequest) {
                draggable.pendingFrameRequest = requestAnimationFrame(drag.bind(this));
            }
            return false;
        },
        endDrag: function () {
            endDrag.call(this);
        },
        componentWillUnmount: function () {
            if (this.draggable.element) {
                endDrag.call(this);
            }
        }
    };
});