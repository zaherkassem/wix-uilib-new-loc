define([
    'react',
    'lodash',
    'baseUI/panelInputs/dropDown/dropDownMixin',
    'baseUI/panelInputs/dropDown/dropdownManager',
    'baseUI/panelInputs/dropDown/select.rt'
], function (
    React,
    _,
    dropDownMixin,
    dropdownManager,
    selectTemplate
){
    'use strict';

    var indentFromEdge = dropdownManager.INDENT_FROM_EDGE;

    function getAllowedPosition(currentOptionsPosition, deltaY, listEl){
        var newPosition = currentOptionsPosition - Math.abs(deltaY);

        if (Math.abs(newPosition) < indentFromEdge){
            newPosition = indentFromEdge;
        } else {
            var maxDistanceFromEdge = dropdownManager.getViewportHeight() - indentFromEdge - listEl.scrollHeight;

            if (maxDistanceFromEdge < indentFromEdge){
                maxDistanceFromEdge = indentFromEdge;
            }

            if (newPosition < maxDistanceFromEdge){
                newPosition = maxDistanceFromEdge;
            }
        }

        return newPosition;
    }

    function shouldMoveEdge(currentOptionsPosition){
        return currentOptionsPosition > indentFromEdge;
    }

    function getOptionsTopPos(ddBoundingClientRect, selectedOptionEl) {
        return selectedOptionEl ? ddBoundingClientRect.top - selectedOptionEl.offsetTop : ddBoundingClientRect.top;
    }

    function getOptionsBottomPos(ddBoundingClientRect, listEl, selectedOptionEl){
        return dropdownManager.getViewportHeight() - getOptionsTopPos(ddBoundingClientRect, selectedOptionEl) - listEl.scrollHeight;
    }

    function getOptionsVerticalPositions(currentSideName, ddBoundingClientRect, listEl){
        var ddDistanceToEdge;
        var sides = {};
        var oppositeSide;
        var ddTopPos = ddBoundingClientRect.top;
        var isTopSide = currentSideName === 'top';

        if (isTopSide) {
            ddDistanceToEdge = ddTopPos + ddBoundingClientRect.height;
        } else {
            ddDistanceToEdge = dropdownManager.getViewportHeight() - ddTopPos;
        }

        if (ddDistanceToEdge < dropdownManager.MIN_LIST_HEIGHT + indentFromEdge){
            if (isTopSide){
                oppositeSide = dropdownManager.getViewportHeight() - (ddDistanceToEdge + listEl.scrollHeight);
            } else {
                oppositeSide = ddTopPos - listEl.scrollHeight;
            }

            if (oppositeSide < indentFromEdge){
                oppositeSide = indentFromEdge;
            }
        } else {
            ddDistanceToEdge = indentFromEdge;
        }

        sides.currentSide = ddDistanceToEdge;
        sides.oppositeSide = oppositeSide;

        return sides;
    }

    return React.createClass({
        displayName: 'select',
        mixins: [dropDownMixin],
        className: 'select',

        getDefaultProps: function(){
            return {
                toggleIcon: true,
                template: selectTemplate,
                autotranslate: true,
                setSelectedAnyway: false
            };
        },

        getOptionsLocation: function(ddEl, listEl, selectedEl){
            var ddBoundingClientRect = ddEl.getBoundingClientRect();
            var top = getOptionsTopPos(ddBoundingClientRect, selectedEl);
            var bottom = getOptionsBottomPos(ddBoundingClientRect, listEl, selectedEl);
            var isTopOverflow = top < indentFromEdge;
            var isBottomOverflow = bottom < indentFromEdge;
            var isBothOverflow = isTopOverflow && isBottomOverflow;
            var scrollDistance = 0;
            var width = Number(this.props.optionsWidth) || ddBoundingClientRect.width;
            var sides;

            if (isTopOverflow || isBothOverflow){
                scrollDistance = -top + indentFromEdge;
            }

            if (isTopOverflow && !isBottomOverflow) {
                sides = getOptionsVerticalPositions('top', ddBoundingClientRect, listEl);
                top = sides.currentSide;

                if (sides.oppositeSide) {
                    bottom = sides.oppositeSide;
                }
            } else if (isBottomOverflow && !isTopOverflow){
                sides = getOptionsVerticalPositions('bottom', ddBoundingClientRect, listEl);
                bottom = sides.currentSide;

                if (sides.oppositeSide) {
                    top = sides.oppositeSide;
                }
            } else if (isTopOverflow && isBottomOverflow){
                top = indentFromEdge;
                bottom = indentFromEdge;
            }

            return {
                style: {
                    top: top,
                    bottom: bottom,
                    left: ddBoundingClientRect.left,
                    width: width
                },

                scrollTop: scrollDistance
            };
        },

        getScrollData: function(deltaY, optionsEl, listEl){
            var optionsElRect = optionsEl.getBoundingClientRect();
            var edge;
            var currentOptionsPosition;
            var hasOverflow = optionsElRect.height < listEl.scrollHeight;
            var scrollData = {distance: 0};

            if (hasOverflow){
                if (deltaY > 0){
                    edge = 'top';
                    currentOptionsPosition = Math.floor(optionsElRect.top);
                } else {
                    edge = 'bottom';
                    currentOptionsPosition = Math.floor(dropdownManager.getViewportHeight() - optionsElRect.bottom);
                }

                if (shouldMoveEdge(currentOptionsPosition)){
                    scrollData.distance = getAllowedPosition(currentOptionsPosition, deltaY, listEl);
                    scrollData.edge = edge;
                } else {
                    scrollData.distance = deltaY;
                }
            }

            return scrollData;
        }
    });
});
