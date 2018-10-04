define(['react', 'lodash', 'baseUI/controls/radioButtonsMixin', 'baseUI/controls/thumbnails.rt'],
    function (React, _, radioMixin, template) {
        'use strict';

        return React.createClass({
            displayName: 'Thumbnails',
            mixins: [radioMixin],
            propTypes: {
                options: React.PropTypes.array,
                maxThumbsPerRow: React.PropTypes.string,
                itemsToSkip: React.PropTypes.string,
                title: React.PropTypes.string,
                onMouseOver: React.PropTypes.func,
                onMouseOut: React.PropTypes.func,
                infoTitle: React.PropTypes.string,
                infoText: React.PropTypes.string,
                square: React.PropTypes.bool,
                radioType: React.PropTypes.oneOf(['image', 'symbol', 'class'])
            },
            getDefaultProps: function () {
                return {
                    radioType: 'symbol',
                    itemsToSkip: '0',
                    options: [
                        {value: '1', label: '16:9', symbolName: 'aspect-ratio-16-9'},
                        {value: '2', label: '4:3', symbolName: 'aspect-ratio-4-3'},
                        {value: '3', label: '1:1', symbolName: 'aspect-ratio-1-1'},
                        {value: '4', label: '1:1', symbolName: 'aspect-ratio-3-4'},
                        {value: '5', label: '1:1', symbolName: 'aspect-ratio-1-1'}
                    ],
                    square: true
                };
            },

            onMouseOver: function(optionValue){
                if (this.props.onMouseOver){
                    this.props.onMouseOver(optionValue);
                }
            },
            getClasses: function () {
                var classes = [];
                classes.push(this.getClassName('control-thumbnails'));
                if (this.props.title) {
                    classes.push('with-title');
                }
                if (this.props.square) {
                    classes.push('square');
                }
                if (_.isString(this.props.activeDesign)) {
                    classes.push(this.props.activeDesign);
                }
                return classes.join(' ');
            },
            onMouseOut: function(selectedValue){
                if (this.props.onMouseOut){
                    this.props.onMouseOut(selectedValue);
                }
            },
            render: template
        });
    });
