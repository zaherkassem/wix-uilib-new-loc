define(['react', 'lodash', 'textControls/comps/iconsDropDown.rt', 'baseUI'], function (React, _, template, baseUI) {
    'use strict';

    return React.createClass({
        displayName: 'iconsDropDown',
        propTypes: {
            fixedIconName: React.PropTypes.string
        },
        render: template,
        getFixedIcon: function () {
            if (this.props.fixedIconName) {
                return React.createElement(baseUI.symbol, {name: this.props.fixedIconName});
            }
        },
        isExpanded: function (){
            return this.refs.dropdown.isExpanded();
        }
    });
});
