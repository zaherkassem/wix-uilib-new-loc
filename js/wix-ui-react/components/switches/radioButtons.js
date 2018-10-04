require('baseUI/controls/radioButtons.scss');
var _ = require('lodash');

define(['react', 'lodash', 'Wix', 'baseUI/controls/radioButtonsMixin', 'wix-ui-react/components/switches/radioButtons.rt'],
    function (React, _, Wix, radioMixin, template) {
        'use strict';

        return React.createClass({
            displayName: 'RadioButtons',
            mixins: [radioMixin],
            propTypes: {
                title: React.PropTypes.string,
                disabled: React.PropTypes.bool,
                options: React.PropTypes.arrayOf(React.PropTypes.shape({
                    value: React.PropTypes.string.isRequired,
                    label: React.PropTypes.string.isRequired,
                    className: React.PropTypes.string,
                    type: React.PropTypes.string
                })),
                onChange: React.PropTypes.func,
                infoText: React.PropTypes.string,
                infoTitle: React.PropTypes.string,
                defaultValue: React.PropTypes.string
            },
            onClick: function () {
                if (this.props && this.props.onClickPreview) {
                    this.props.onClickPreview(this.props);
                }
            },
            onMouseOver: function () {
                if (this.props && this.props.onMouseOverPreview) {
                    this.props.onMouseOverPreview(this.props);
                }
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
            enable: function() {
                this.setState({ disabled: false});
            },
            disable: function() {
                this.setState({ disabled: true});
            },
            render: template
        });
    });
