define([
    'react/addons',
    'lodash',
    'baseUI/panelInputs/autoCompleteTextInput'
], function (React, _, autoCompleteTextInput) {
    'use strict';
    return function () {
        return React.createElement('div', { 'className': 'selected' }, React.createElement('span', { 'key': 'selectedContent' }, this.getCached('selectedContent'))    /* <span rt-if="!this.state.expanded" key="selectedContent">{this.getCached('selectedContent')}</span> */
                                                                                                        /* <input rt-if="this.state.expanded" key="selectedInput" ref="focusElement" type="text" value="{this.getCached('selectedContent')}" onChange="{this.onInputChange}"/> */);
    };
});