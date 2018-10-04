define([
    'react-dom',
    'react',
    'lodash',
    'baseUI/panelInputs/autoCompleteTextInput.rt'
], function(ReactDOM, React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'autoCompleteTextInput',

        propTypes: {
            complete: React.PropTypes.func, // complete is a method that gets the current value and return the whole value (completion and prefix)
            onChange: React.PropTypes.func
        },

        getInitialState: function() {
            return {
                value: '',
                cursor: 0,
                hasCompletion: false
            };
        },

        getContainerProps: function () {
            return _.pick(this.props, ['style', 'class', 'className']);
        },

        onKeyDown: function(evt) {
            if (evt.keyCode === 8) { // delete key
                this.isDelete = true;
            }

            // pass on the on key down event in case was passed in props
            if (this.props.onKeyDown) {
                this.props.onKeyDown(evt);
            }
        },

        onChange: function(evt) {
            var newVal = evt.target.value;
            var cursor = ReactDOM.findDOMNode(this.refs.input).selectionStart;

            this.setValue(newVal, cursor);
        },

        focus: function () {
            var input = ReactDOM.findDOMNode(this.refs.input);

            if (input) {
                input.focus();
            }
        },

        setValue: function (newVal, cursor) {
            cursor = cursor || newVal.length;

            if (newVal === this.state.value){
                return;
            }

            this.callOnChangeIfExists(newVal);
            var atEnd = (cursor === newVal.length);
            var isDelete = this.isDelete;
            this.isDelete = false;

            var hasCompletion = atEnd && !isDelete;

            var completedVal = newVal;
            if (hasCompletion && this.props.complete) {
                completedVal = this.props.complete(newVal);
                if (!completedVal) {
                    hasCompletion = false;
                    completedVal = newVal;
                }
            }
            this.setState({value: completedVal, cursor: cursor, hasCompletion: hasCompletion});
        },

        componentDidUpdate: function() {
            if (this.state.hasCompletion) {
                ReactDOM.findDOMNode(this.refs.input).setSelectionRange(this.state.cursor, this.state.value.length);
            }
        },

        callOnChangeIfExists: function(newVal) {
            var onChange = this.props.valueLink ? this.props.valueLink.requestChange : this.props.onChange;
            if (onChange) {
                onChange(newVal);
            }
        },

        onClickCancel: function (e) {
            e.stopPropagation();
            this.setValue('');
        },

        render: template
    });
});
