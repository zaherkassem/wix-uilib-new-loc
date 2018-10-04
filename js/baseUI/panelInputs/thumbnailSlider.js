define([
    'react-dom',
    'react',
    'lodash',
    'jquery',
    'util',
    'baseUI/controls/radioButtonsMixin',
    'baseUI/panelInputs/thumbnailSlider.rt'
], function(ReactDOM, React, _, $, util, radioButtonsMixin, template) {
    'use strict';

    var INTERVAL_TIME = 200;
    var DEFAULT_SLIDER_WIDTH = 400;
    var DEFAULT_SELECTED_ITEM_OFFSET = 50;
    var DEFAULT_STEP_WIDTH = 96;

    function setPosition(newPosition){
        if (this.state.position === newPosition){
            return;
        }

        var positionDiff = newPosition - this.state.position;
        var newDistanceToScroll = this.state.distanceToScroll - positionDiff;
        this.setState({position: newPosition, distanceToScroll: newDistanceToScroll, isLeftEdge: newPosition === 0, isRightEdge: newDistanceToScroll === 0});
    }

    function singleStepRight(){
        var distanceToMove = Math.min(this.state.distanceToScroll, this.props.stepWidth);
        var newPosition = this.state.position + distanceToMove;
        setPosition.call(this, newPosition);
    }

    function singleStepLeft(){
        var distanceToMove = Math.min(this.state.position, this.props.stepWidth);
        var newPosition = this.state.position - distanceToMove;
        setPosition.call(this, newPosition);
    }

    function moveToRight(){

        if (this.state.distanceToScroll === 0){
            clearInterval(this.moveInterval);
            return;
        }

        singleStepRight.call(this);
    }

    function moveToLeft(){

        if (this.state.position === 0){
            clearInterval(this.moveInterval);
            return;
        }

        singleStepLeft.call(this);
    }

    return React.createClass({
        displayName: 'thumbnailSlider',
        mixins: [radioButtonsMixin, util.imagesContainerMixin],
        moveInterval: undefined,
        propTypes: {
            items: React.PropTypes.array.isRequired,
            width: React.PropTypes.number,
            stepWidth: React.PropTypes.number,
            selectedItemOffset: React.PropTypes.number
        },
        getDefaultProps: function(){
            return {
                width: DEFAULT_SLIDER_WIDTH,
                stepWidth: DEFAULT_STEP_WIDTH,
                selectedItemOffset: DEFAULT_SELECTED_ITEM_OFFSET
            };
        },
        getInitialState: function(){
            return {};//{position: 0, distanceToScroll: 0 , isRightEdge: true, isLeftEdge: true};
        },
        componentDidMount: function(){
            this.focusOnSelectedSkin();
        },
        focusOnSelectedSkin: function(){
            var visibleContainer = ReactDOM.findDOMNode(this);

            this.afterImagesLoad(function(){
                var maxDistanceToScroll = visibleContainer.scrollWidth - visibleContainer.clientWidth;

                var selectedSkinElement = $(visibleContainer).find('input:checked').parent();
                var selectedSkinPosition = selectedSkinElement.position();
                var selectedSkinLeftOffset = selectedSkinPosition ? selectedSkinPosition.left : 0;

                var distanceToScrollToSelected = Math.max(selectedSkinLeftOffset - this.props.selectedItemOffset, 0);

                var position = Math.min(maxDistanceToScroll, distanceToScrollToSelected);
                var distanceToScroll = maxDistanceToScroll - position;

                var itemsContainer = $(visibleContainer).find('.itemsContainer');
                itemsContainer.css({
                    'margin-top': -itemsContainer.height() / 2,
                    'visibility': 'visible'
                });

                this.setState({position: position, distanceToScroll: distanceToScroll, isRightEdge: distanceToScroll === 0, isLeftEdge: position === 0});
            }.bind(this), $(visibleContainer));
        },
        getPosition: function(){
            return this.state.position;
        },
        startRight: function() {
            moveToRight.apply(this);
            this.moveInterval = setInterval(moveToRight.bind(this), INTERVAL_TIME);
        },
        endRight: function() {
            clearInterval(this.moveInterval);
        },
        startLeft: function() {
            moveToLeft.apply(this);
            this.moveInterval = setInterval(moveToLeft.bind(this), INTERVAL_TIME);
        },
        endLeft: function() {
            clearInterval(this.moveInterval);
        },
        componentWillUnmount: function(){
            clearInterval(this.moveInterval);
        },
        render: template
    });
});
