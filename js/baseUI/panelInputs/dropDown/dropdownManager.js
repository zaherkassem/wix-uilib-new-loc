define([
    'lodash'
], function(
    _
    ){
    'use strict';

    var state = {
        optionsComponent: null,
        selectedIndex: null,
        currentDropdown: null,
        currentOptionsList: null,
        hoveredOption: null,
        isOptionsVisible: false // synchronous state, which shows the options visibility. Added due to a setState in React is async
    };

    return {
        INDENT_FROM_EDGE: 12,
        defaultScrollSpeed: 5,
        MIN_LIST_HEIGHT: 180,
        keyboardContext: 'dropdown',

        controlKeys: [
            27, // esc
            32, // space
            13, // enter
            38, // arrow up
            40  // arrow down
        ],

        setState: function(name, value){
            if (typeof name === 'string'){
                state[name] = value;
            } else if (typeof name === 'object'){
                _.forEach(name, function(val, prop){
                    state[prop] = val;
                });
            }

            return state;
        },

        reset: function(){
            this.setState({
                optionsComponent: null,
                selectedIndex: null,
                currentDropdown: null,
                currentOptionsList: null,
                hoveredOption: null,
                isOptionsVisible: false
            });
        },

        registerOptionsComponent: function(optsComp){
            return this.setState('optionsComponent', optsComp);
        },

        addOption: function(option){
            if (state.currentOptionsList.indexOf(option) === -1){
                state.currentOptionsList.push(option);
            }
        },

        toggle: function(dropdownComponent){
            var optsComp = state.optionsComponent;

            if (optsComp){
                var isOptionsHidden = !state.isOptionsVisible;

                if (isOptionsHidden){
                    if (dropdownComponent){
                        var dropdownData = dropdownComponent.getData();

                        this.setState({
                            selectedIndex: dropdownData.selectedIndex,
                            currentDropdown: dropdownComponent,
                            currentOptionsList: [],
                            isOptionsVisible: true
                        });

                        dropdownComponent.setExpanded(isOptionsHidden);
                        optsComp.show(dropdownData);
                    }
                } else {
                    if (dropdownComponent){
                        dropdownComponent.setExpanded(isOptionsHidden);
                    } else if (state.currentDropdown){
                        state.currentDropdown.setExpanded(isOptionsHidden);
                    }

                    this.hide();
                }
            }
        },

        hide: function(){
            this.setState('isOptionsVisible', false);
            if(state.optionsComponent) {
                state.optionsComponent.hide();
            }
        },

        getOptionsLocation: function(){
            var optsComp = state.optionsComponent;
            var dropdownComponent = state.currentDropdown;

            //TODO: test and refactor
            return dropdownComponent.getOptionsLocation(dropdownComponent.getDDEl(), optsComp.getOptionsListEl(), optsComp.getSelectedEl(dropdownComponent.state.selectedIndex), optsComp.getFooterEl());
        },

        select: function(option){
            this.toggle();
            state.currentDropdown.setSelected(option.getData());
        },

        getScrollData: function(deltaY){
            var optionsComp = state.optionsComponent;
            var currentDropdown = state.currentDropdown;

            return currentDropdown.getScrollData ? currentDropdown.getScrollData(deltaY, optionsComp.getOptionsEl(), optionsComp.getOptionsListEl()) : null;
        },

        getViewportHeight: function(){
            return document.documentElement.clientHeight;
        },

        getSelectedIndex: function(){
            return state.selectedIndex;
        },

        focusDropdown: function(){
            if (state.currentDropdown && state.currentDropdown.isMounted()){
                state.currentDropdown.focus();
            }
        },

        setHovered: function(option){
            if (state.hoveredOption){
                state.hoveredOption.unhover();
            }

            if (option) {
                option.hover();
            }

            this.setState('hoveredOption', option);
        },

        getKeyboardHandlers: function(){
            var self = this;

            var preventNative = function(e){
                e.preventDefault();
                e.stopPropagation();
            };

            var escape = function(e){
                self.toggle();
                preventNative(e);
            };

            var select = function(e){
                if (state.hoveredOption){
                    self.select(state.hoveredOption);
                }

                preventNative(e);
            };

            var hover = function(e){
                var keyCode = e.keyCode;

                if (keyCode === 38 || keyCode === 40){
                    var hoveredOptIndex;
                    var nextHoveredIndex;

                    hoveredOptIndex = state.hoveredOption ? state.hoveredOption.props.index : state.selectedIndex;

                    if (keyCode === 38){
                        nextHoveredIndex = hoveredOptIndex - 1;
                    } else {
                        nextHoveredIndex = hoveredOptIndex + 1;
                    }

                    if (nextHoveredIndex >= 0 && nextHoveredIndex < state.currentOptionsList.length){
                        self.setHovered(state.currentOptionsList[nextHoveredIndex]);
                    }
                }

                preventNative(e);
            };

            return {
                esc: escape,
                enter: select,
                space: select,
                up: hover,
                down: hover,
                backspace: preventNative
            };
        },

        isExpanded: function(dropdown){
            return state.currentDropdown === dropdown && state.isOptionsVisible;
        },

        getFocusedElement: function(){
            return document.activeElement;
        },

        focus: function(el){
            var isOptions = el === state.optionsComponent.getOptionsEl();
            var ddFocusEl = state.currentDropdown.getFocusEl();

            if (isOptions && ddFocusEl) {
                ddFocusEl.focus();
            } else {
                el.focus();
            }
        },

        blur: function(){
            if (state.currentDropdown.getFocusEl() !== this.getFocusedElement()){
                this.toggle();
            }
        }
    };
});