require('baseUI/controls/thumbnails.css');
require('baseUI/controls/radio.scss');
require('./overrides.scss');

var _ = require('lodash');

define(['react', 'lodash', 'Wix', 'baseUI/controls/radioButtonsMixin', './thumbnails.rt'],
    function (React, _, Wix, radioMixin, template) {
        'use strict';

        return React.createClass({
            displayName: 'RadioButtons',
            mixins: [radioMixin],
            propTypes: {
                options: React.PropTypes.array,
                maxThumbsPerRow: React.PropTypes.string,
                title: React.PropTypes.string,
                onMouseOver: React.PropTypes.func,
                onMouseOut: React.PropTypes.func,
                infoTitle: React.PropTypes.string,
                infoText: React.PropTypes.string,
                square: React.PropTypes.bool,
                //itemsToSkip: React.PropTypes.string, TODO: what is it for?
                activeDesign: React.PropTypes.oneOf(['vmark', 'highlighted', 'background'])
                //imageType: React.PropTypes.oneOf(['image', 'svg'])
            },
            getInitialState: function(){
                return {
                    value: this.props.defaultValue || (this.props.options && this.props.options[0].value),
                    disabled: this.props.disabled
                };
            },
            componentDidMount: function() {
                var wixParam = this.props['wix-param'];
                if (Wix.Utils.getViewMode() !== 'standalone' && wixParam) {
                    Wix.Styles.getStyleParams(function (styleParams, callback) {
                        var number = _.isNumber(styleParams.numbers[wixParam]) || _.isObject(styleParams.numbers[wixParam])? styleParams.numbers[wixParam] : { value : this.props.value || this.props.defaultValue || this.props.options[0].value };
                        this.setState({
                            value: _.isObject(number) ? number.value : "" + number
                        }, callback);
                    }.bind(this));
                }
            },
            getValue: function () {
                return this.state.value;
            },
            getValueLink: function (valueName) {
                var that = this;
                return {
                    value: that.state[valueName],
                    requestChange: function(newValue){
                        that.handleChangeInner(newValue, valueName);
                    }
                };
            },
            handleChangeInner: function (newValue, valueName, callback) {
                var stateToSet = {};
                stateToSet[valueName] = newValue;
                this.setState(stateToSet, function() {
                    var wixParam = this.props['wix-param'];
                    if (wixParam) {
                        Wix.Styles.setNumberParam(wixParam, {
                            value: newValue
                        });
                    }
                    if (_.isFunction(this.props.onChange)) {
                        this.props.onChange(newValue);
                    }
                    if(_.isFunction(callback)){
                        callback();
                    }
                });

                if (_.isFunction(this.props.onClickPreview)) {
                    this.props.onClickPreview.call(this, newValue);
                }
            },
            getProps: function () {
                return _.defaults({
                    radioType: 'image',
                    valueLink: this.getValueLink('value')
                }, this.props);
            },
            render: template
        });
    });
