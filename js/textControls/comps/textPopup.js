define(['react-dom', 'react', 'lodash', 'util', 'textControls/comps/textPopup.rt'], function(ReactDOM, React, _, util, template) {
    'use strict';

    return React.createClass({
        displayName: 'textPopup',
        propTypes: {
            label: React.PropTypes.string,
            iconName: React.PropTypes.string,
            width: React.PropTypes.number
        },
        mixins: [util.outerClickMixin],
        getInitialState: function () {
            return {
                popupOpen: false
            };
        },
        togglePopup: function () {
            var toggle = !this.state.popupOpen;
            this.setState({popupOpen: toggle});
            if (toggle) {
                this.setPopupPosition();
            }
        },
        hide: function () {
            if (this.state.popupOpen) {
                this.setState({popupOpen: false});
            }
        },
        onOuterClick: function () {
            this.hide();
        },
        setPopupPosition: function () {
            var buttonBounding = ReactDOM.findDOMNode(this.refs.popupButton).getBoundingClientRect();
            if (this.refs.popupContainer) {
                var popupContainer = ReactDOM.findDOMNode(this.refs.popupContainer);
                var right = 0 - popupContainer.getBoundingClientRect().width / 2;
                var bottom = buttonBounding.height + 10;

                popupContainer.style.setProperty('bottom', bottom + 'px');
                popupContainer.style.setProperty('right', right + 'px');
            }
        },
        render: template
    });
});
