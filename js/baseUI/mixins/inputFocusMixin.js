define(['jquery'], function ($) {
    'use strict';

    return {
        focus: function () {
            $(ReactDOM.findDOMNode(this.refs.input)).focus();
        },
        handleAutoFocusIfNeeded: function (prevProps) {
            // this is needed because autoFocus does not work with input in panels, and neither does focusing on componentDidMount or on first componentDidUpdate
            var isFocused = this.state.isFocused;
            var isAutoFocusRequested = !!this.props.focus;

            if (isAutoFocusRequested && !isFocused) {
                var hasAutoFocusJustBeenRequested = !prevProps.focus && isAutoFocusRequested;

                if (hasAutoFocusJustBeenRequested || !this.wasFocusedBefore) {
                    this.wasFocusedBefore = false;
                    var $input = $(ReactDOM.findDOMNode(this.refs.input));
                    $input.focus();
                }
            } else if (isAutoFocusRequested && isFocused) {
                this.wasFocusedBefore = true;
            }
        }
    };
});