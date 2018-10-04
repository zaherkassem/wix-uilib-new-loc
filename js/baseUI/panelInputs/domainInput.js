define([
    'react-dom',
    'react',
    'lodash',
    'jquery',
    'baseUI/panelInputs/statefulInputMixin',
    'baseUI/popovers/tooltipManager',
    'baseUI/panelInputs/domainInput.rt'
], function(ReactDOM, React, _, $, statefulInputMixin, tooltipManager, template) {
    'use strict';

    return React.createClass({
        displayName: 'DomainInput',
        mixins: [React.addons.LinkedStateMixin, statefulInputMixin],
        propTypes: {
            isEditable: React.PropTypes.bool.isRequired,
            onChange: React.PropTypes.func,
            prefix: React.PropTypes.string,
            domainValidator: React.PropTypes.func,
            biHandler: React.PropTypes.func
        },
        uniqueTooltipId: '',
        getInitialState: function(){
            this.uniqueTooltipId = _.uniqueId();
            var domain = this.getValueFromProps();
            var state = {
                value: domain,
                sanitizedValue: null,
                invalidMessage: '',
                isFocused: Boolean(this.props.isEditable)
            };

            if (this.props.domainValidator) {
                _.assign(state, this.validateDomainAndGetStateToSet(domain));
            }

            return state;
        },
        getTooltipId: function() {
            return 'domain-input-validation-error' + this.uniqueTooltipId;
        },
        setFocusState: function(isFocused) {
            this.setState({isFocused: isFocused});
        },
        validateDomainAndGetStateToSet: function(value) {
            var state = { value: value };
            if (this.props.domainValidator) {
                var result = this.props.domainValidator(value);
                if (!result.success) {
                    state.invalidMessage = result.errorMessage;
                    state.sanitizedValue = null;
                } else {
                    state.invalidMessage = '';
                    state.sanitizedValue = result.extraInfo;
                }
            }
            return state;
        },
        handleChange: function(evt) {
            var self = this;
            var domain = evt.target.value;
            var newState = this.validateDomainAndGetStateToSet(domain);
            this.setState(newState,
                self.callOnChangeIfExists({value: newState.value, sanitizedValue: newState.sanitizedValue, isValid: !newState.invalidMessage}));
        },
        handleInputKeyDown: function(evt) {
            switch (evt.keyCode) {
                case 13: //enter
                case 27: //esc
                    var $inputNode = $(ReactDOM.findDOMNode(this.refs.domain));
                    $inputNode.blur();
                    this.setFocusState(false);
            }
        },
        handleInputBlur: function() {
            this.setFocusState(false);
            this.reportInvalidValueIfNeeded();
        },
        handleDomainNameClickBI: function() {
            if (this.props.handleDomainNameClickBI) {
                this.props.handleDomainNameClickBI();
            }
        },
        componentWillReceiveProps: function(nextProps) {
            var valueFromProps = this.getValueFromProps(nextProps);
            if (valueFromProps !== this.state.value) {
                this.setState(this.validateDomainAndGetStateToSet(valueFromProps));
            }
        },
        componentDidMount: function() {
            var $inputNode = $(ReactDOM.findDOMNode(this.refs.domain));
            if (this.props.isEditable) {
                $inputNode.focus();
                $inputNode.select();
            }
        },
        componentDidUpdate: function(prevProps, prevState) {
            var $inputNode = $(ReactDOM.findDOMNode(this.refs.domain));

            if (this.props.isEditable && !prevProps.isEditable) {
                $inputNode.focus();
                $inputNode.select();
            }

            if (this.state.invalidMessage) {
                tooltipManager.show(this.getTooltipId());
            } else if (prevState.invalidMessage){
                tooltipManager.hide(this.getTooltipId());
            }
        },
        componentWillUnmount: function() {
            tooltipManager.hide(this.getTooltipId());
        },
        reportValueClickedIfNeeded: function() {
            if (!this.props.isEditable) {
                this.props.biHandler('DISABLED_DOMAIN_PART_CLICKED');
            }
        },
        reportPrefixClicked: function() {
            this.props.biHandler('DISABLED_DOMAIN_PART_CLICKED');
        },
        reportInvalidValueIfNeeded: function() {
            if (this.state.invalidMessage) {
                this.props.biHandler('DOMAIN_VALIDATION_ERROR');
            }
        },
        render: template
    });
});
