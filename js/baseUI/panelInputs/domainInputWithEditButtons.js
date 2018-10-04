define([
    'react-dom',
    'react',
    'lodash',
    'jquery',
    'baseUI/panelInputs/statefulInputMixin',
    'baseUI/popovers/tooltipManager',
    'baseUI/panelInputs/domainInputWithEditButtons.rt'
], function(ReactDOM, React, _, $, statefulInputMixin, tooltipManager, template) {
    'use strict';

    return React.createClass({
        displayName: 'domainInputWithEditButtons',
        mixins: [React.addons.LinkedStateMixin, statefulInputMixin],
        propTypes: {
            isEditable: React.PropTypes.bool.isRequired,
            prefix: React.PropTypes.string,
            domainValidator: React.PropTypes.func,
            domainHandler: React.PropTypes.func,
            biHandler: React.PropTypes.func
        },
        uniqueTooltipId: '',
        getInitialState: function(){
            this.uniqueTooltipId = _.uniqueId();

            var domainValue = this.getValueFromProps();
            var state = {
                isEditingDisabled: true,
                value: domainValue,
                invalidMessage: null
            };

            return state;
        },
        getTooltipId: function() {
            return 'domain-input-validation-error' + this.uniqueTooltipId;
        },
        enableEditing: function (e) {
            e.stopPropagation();
            var newState = {
                isEditingDisabled: false
            };
            this.setState(newState, this.callOnChangeIfExists);
            this.props.biHandler('DOMAIN_EDIT_CLICKED');
        },
        validateSiteName: function(siteName) {
            if (this.getValueFromProps() !== siteName && this.props.domainValidator) {
                return this.props.domainValidator(siteName);
            }
            return {
                success: true
            };
        },
        handleChange: function(evt) {
            var domain = evt.target.value;
            var result = this.validateSiteName(domain);
            this.setState({
                value: domain,
                invalidMessage: result.success ? null : result.errorMessage
            });
        },
        handleInputKeyDown: function(evt) {
            switch (evt.keyCode) {
                case 13: //enter
                    if (!this.state.invalidMessage) {
                        this.applyEditing();
                    }
                    break;
                case 27: //esc
                    this.cancelEditing();
                    break;
            }
        },
        getSanitizedSiteName: function(siteName) {
            if (siteName === this.getValueFromProps()) {
                return siteName;
            }
            return this.props.domainValidator(siteName).extraInfo;
        },
        wasSiteNameChangedByUser: function(siteName) {
            return siteName !== this.getValueFromProps();
        },
        updateSiteName: function(name, onSuccess, onError) {
            if (this.props.domainHandler) {
                this.props.domainHandler(name, onSuccess, onError);
            } else {
                onSuccess(); // used in mock save
            }
        },
        cancelEditing: function() {
            var prevValue = this.getValueFromProps();
            var newState = {
                isEditingDisabled: true,
                value: prevValue,
                invalidMessage: null
            };
            this.setState(newState, this.callOnChangeIfExists.bind(this, prevValue));
            this.props.biHandler('DOMAIN_EDIT_CANCEL_CLICKED');
        },
        applyEditing: function() {
            var self = this;
            var sanitizedName = this.getSanitizedSiteName(this.state.value);

            if (this.wasSiteNameChangedByUser(sanitizedName)) {
                this.updateSiteName(sanitizedName, handleUpdateNameSuccess, handleUpdateNameFailure);
            } else {
                this.setState({
                    isEditingDisabled: true,
                    value: sanitizedName
                }, this.callOnChangeIfExists(sanitizedName));
            }

            this.props.biHandler('DOMAIN_EDIT_SAVE_CLICKED');

            function handleUpdateNameSuccess() {
                var newState = {
                    isEditingDisabled: true,
                    value: sanitizedName
                };
                self.setState(newState, self.callOnChangeIfExists.bind(self, sanitizedName));
            }
            function handleUpdateNameFailure(errorMessage) {
                var newState = {};
                if (errorMessage) {
                    newState = {
                        isEditingDisabled: false,
                        invalidMessage: errorMessage
                    };
                    self.setState(newState);
                } else {
                    var prevValue = self.getValueFromProps();
                    newState = {
                        isEditingDisabled: true,
                        value: prevValue
                    };
                    self.setState(newState, self.callOnChangeIfExists.bind(self, prevValue));
                }
            }
        },
        shouldDisplayEditButton: function() {
            return this.props.isEditable && this.state.isEditingDisabled;
        },
        shouldDisplayApplyCancelButtons: function() {
            return this.props.isEditable && !this.state.isEditingDisabled;
        },
        componentDidUpdate: function(prevProps, prevState) {
            if (!this.state.isEditingDisabled && prevState.isEditingDisabled) {
                var $inputElement = $(ReactDOM.findDOMNode(this.refs.domain));
                $inputElement.focus();
                $inputElement.select();
            } else if (this.state.isEditingDisabled && !prevState.isEditingDisabled) {
                var inputElement = ReactDOM.findDOMNode(this.refs.domain);
                inputElement.selectionEnd = 0; // shit to deselect the text on Safari
                $(inputElement).blur();
            }

            if (this.state.invalidMessage) {
                tooltipManager.show(this.getTooltipId());
            } else if (prevState.invalidMessage){
                tooltipManager.hide(this.getTooltipId());
            }
        },
        reportPrefixClicked: function() {
            this.props.biHandler('DISABLED_DOMAIN_PART_CLICKED');
        },
        reportValueClickedIfNeeded: function() {
            if (this.state.isEditingDisabled) {
                this.props.biHandler('DISABLED_DOMAIN_PART_CLICKED');
            }
        },
        reportInvalidValueIfNeeded: function() {
            if (this.state.invalidMessage) {
                this.props.biHandler('DOMAIN_VALIDATION_ERROR');
            }
        },
        render: template
    });
});