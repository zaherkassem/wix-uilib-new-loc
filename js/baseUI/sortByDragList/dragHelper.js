define(['jquery'], function ($) {
    'use strict';

    // this is a special drag helper for react as it does not move the item
    // when completes to drag it

    function DragHelper(blockSelectionCssClass, dragPlaceholderCssClass, dragContainerCssClass) {
        this._blockSelectionCssClass = blockSelectionCssClass || 'block-selection';
        this._dragPlaceholderCssClass = dragPlaceholderCssClass || 'drag-placeholder';
        this._dragContainerCssClass = dragContainerCssClass || 'drag-container';
        this._body = $(document.body);
        return this;
    }

    DragHelper.prototype.startDrag = function (elm, idx, ev, endCallback) {
        this._startIdx = idx;
        this._startedDrag = false;
        this._movedElement = elm;
        this._endCallback = endCallback;
        var mousePosY = ev.clientY + $(window).scrollTop();
        this._lastMouseY = mousePosY;
        this._deltaY = mousePosY - elm.offset().top;
//	console.log('clientY: ' + ev.clientY + ', scrollY: ' + $(window).scrollTop(), ', elm.offset.top: ' + elm.offset().top + ', deltaY: ' + this._deltaY);
        this._body.on('mousemove.draghelper', this._onItemDrag.bind(this));
        this._body.on('mouseup.draghelper', this._onItemEndDrag.bind(this));
        this._body.addClass(this._blockSelectionCssClass);
    };

    DragHelper.prototype._undockAndDrag = function () {
        this._undockMovingItem();
        this._startedDrag = true;
    };

    DragHelper.prototype._undockMovingItem = function () {
        var size = {
            x: this._movedElement.outerWidth(true),
            y: this._movedElement.outerHeight(true)
        };
        var container = this._movedElement.parent().parent();
        var containerPos = container.offset();
        var position = this._movedElement.offset();

        this._placeholder = $('<div/>');
        this._placeholder.addClass(this._dragPlaceholderCssClass);
        this._placeholder.get(0).style.width = size.x + 'px';
        this._placeholder.get(0).style.height = size.y + 'px';
        this._movedContainer = $('<div/>');
        this._movedContainer.addClass(this._dragContainerCssClass);

        this._movedContainer.get(0).style.width = size.x + 'px';
        this._movedContainer.get(0).style.height = size.y + 'px';
        this._movedContainer.css({
            top: (position.top - containerPos.top) + 'px',
            position: 'absolute'
        });
        this._movedElement.before(this._placeholder);
        this._movedContainer.append(this._movedElement);
        container.children().first().before(this._movedContainer);
    };

    DragHelper.prototype._onItemDrag = function (ev) {
        if (!this._startedDrag) {
            this._undockAndDrag();
        }
        var mousePosY = ev.clientY + $(window).scrollTop();
        var container = this._movedContainer.parent();
        var containerPos = container.offset();
        var newTop = mousePosY - containerPos.top - this._deltaY;
        this._movedContainer.css('top', newTop + 'px');
//        console.log('mouse [' + mousePosY + '], container [' + containerPos.top + '], delta [' + this._deltaY + '], top [' + newTop + ']');

        // check if the movement is up or down
        var up = mousePosY < this._lastMouseY;
        this._lastMouseY = mousePosY;

        // find element under mouse
        var found;
        var children = container.children().last().children();
        for (var i = 0; i < children.length; i++) {
            var child = children.eq(i);
            var top = child.offset().top;
            var bottom = top + child.outerHeight(true);
            if (mousePosY >= top && mousePosY < bottom) {
                found = child;
                break;
            }
        }

//        console.log('newtop [' + newTop + '] container height [' + this._containerHeight + ']');
        if (!this._placeholder.is(found)) {
            // if above list, add as first child
            if (newTop < 0) {
                found = children.first();
            }

            if (found) {
                if (up) {
                    found.before(this._placeholder);
                } else {
                    found.after(this._placeholder); // if moving down, insert after the item
                }
            } else {
                children.last().after(this._placeholder);
            }
        }
    };

    DragHelper.prototype._onItemEndDrag = function () {
        this._body.off('.draghelper');
        this._body.removeClass(this._blockSelectionCssClass);
        if (!this._startedDrag) {
            return;
        }

        var dropIndex = -1;
        var children = this._movedContainer.parent().children().last().children();
        for (var i = 0; i < children.length; i++) {
            if (this._placeholder.is(children[i])) {
                dropIndex = i;
                break;
            }
        }
        this._dockMovingItem();

        if (this._startIdx !== dropIndex) {
            this._endCallback(this._startIdx, dropIndex); // calling back with old and new index
        }
    };

    DragHelper.prototype._dockMovingItem = function () {

        var container = this._movedContainer.parent();
        var parent = container.children().last();

        this._placeholder.remove();

        // returns the dragged item to the original spot to allow react to control the
        // change in place
        var wasLast = (this._startIdx === parent.children().length);
        if (wasLast) {
            parent.append(this._movedElement);
        } else {
            this._movedElement.insertBefore(parent.children().eq(this._startIdx));
        }

        this._movedContainer.remove();
        this._placeholder = undefined;
        this._movedContainer = undefined;
    };

    return DragHelper;
});