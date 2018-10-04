define([
    'react-dom',
    'react',
    'lodash',
    'jquery',
    'baseUI/panelInputs/combobox/combobox.rt',
    'baseUI/panelInputs/inputMixin',
    'util'
], function(ReactDOM, React, _, $, template, inputMixin, util) {
    'use strict';

    var DOWN = 40;
    var UP = 38;
    var ENTER = 13;
    var TAB = 9;
    var BACKSPACE = 8;
    var ESC = 27;


    return React.createClass({
        displayName: 'combobox',
        render: template,
        mixins: [inputMixin, util.translationMixin, util.outerClickMixin, util.blockOuterScrollMixin],
        propTypes: {
            shouldShowLabel: React.PropTypes.bool,
            withFooter: React.PropTypes.bool,
            hasSmallArrow: React.PropTypes.bool.isRequired,
            label: React.PropTypes.string,
            data: React.PropTypes.arrayOf(React.PropTypes.shape({
                groupName: React.PropTypes.string.isRequired,
                items: React.PropTypes.arrayOf(React.PropTypes.shape({
                    label: React.PropTypes.string.isRequired,
                    value: React.PropTypes.string.isRequired,
                    style: React.PropTypes.object
                }))
            })),
            infoText: React.PropTypes.string,
            infoTitle: React.PropTypes.string,
            onClose: React.PropTypes.func
        },
        getDefaultProps: function () {
            return {
                shouldShowOptionLabel: true,
                withFooter: false,
                hasSmallArrow: false
            };
        },
        getInitialState: function () {
            this.items = _(this.props.data).map('items').flattenDeep().value();
            this.groups = _(this.props.data).map('groupName').flattenDeep().value();
            var selectedItem = this.items[0];
            if (this.getValueFromProps()) {
                selectedItem = this.getItemByValue(this.getValueFromProps());
                if (!selectedItem) {
                    //todo - report error
                    console.log('Wrong value::' + this.getValueFromProps());
                    selectedItem = this.items[0];
                }
            }
            this.initialItem = selectedItem;

            return {
                open: false,
                selectedItem: selectedItem,
                text: selectedItem.label,
                selectStart: selectedItem.label.length
            };
        },
        show: function (e) {
            e.stopPropagation();
            this.setState({
                open: true,
                selectStart: 0
            });
            this.setListPosition();
            this.shouldScroll = true;
        },
        setListPosition: function () {
            var inputFieldBounding = ReactDOM.findDOMNode(this.refs.input).getBoundingClientRect();
            var top = inputFieldBounding.top + inputFieldBounding.height;
            if (this.refs.itemsListContainer) {
                var optionsContainer = ReactDOM.findDOMNode(this.refs.itemsListContainer);
                optionsContainer.style.setProperty('top', top + 'px');
                optionsContainer.style.setProperty('left', inputFieldBounding.left + 'px');
            }
        },
        hide: function () {
            var text = this.state.text;
            this.setState({
                open: false,
                selectStart: text.length
            });

            if (this.props.onClose) {
                this.props.onClose();
            }
        },
        toggle: function (e) {
            if (!this.state.open) {
                this.show(e);
            } else {
                this.hide();
            }
        },
        handleNewValueFromProps: function (newVal) {
            var newItem = this.getItemByValue(newVal);
            if (newItem) {
                this.initialItem = newItem;

                this.setState({
                    selectedItem: newItem,
                    text: newItem.label
                });
            }
        },
        componentWillReceiveProps: function (nextProps) {
            var newVal = this.getValueFromProps(nextProps);
            var currentVal = this.getValueFromProps();
            if (newVal !== currentVal && !this.state.open) {
                this.handleNewValueFromProps(newVal);
            }
        },
        componentWillUpdate: function (nextProps, nextState) {
            this.shouldScroll = this.state.selectedItem !== nextState.selectedItem || this.state.open !== nextState.open;
            this.shouldReSelect = this.state.selectStart !== nextState.selectStart || this.state.selectStart === 0;
        },
        componentDidUpdate: function () {
            if (this.shouldReSelect) {
                var self = this;
                setTimeout(function() {
                    var inputField = ReactDOM.findDOMNode(self.refs.input);
                    if (inputField) {
                        inputField.setSelectionRange(self.state.selectStart, self.state.text.length);
                    }
                }, 0);
            }
            if (this.state.open) {
                if (this.shouldScroll) {
                    var itemsListContainer = $(ReactDOM.findDOMNode(this.refs.itemsList));
                    var selectedItemElement = itemsListContainer.find('.wdd-item.selected');
                    if (selectedItemElement && selectedItemElement.length) {
                        itemsListContainer.scrollTop(selectedItemElement.offset().top - itemsListContainer.offset().top + itemsListContainer.scrollTop() - (selectedItemElement.height() * 2));
                    }
                }
            }
        },

        handleKeyDown: function (e) {

            var keyCode = e.keyCode;

            if (keyCode === ENTER || keyCode === TAB) {
                this.handleClick(this.state.selectedItem);
                e.target.blur();
            }

            if (keyCode === UP || keyCode === DOWN) {
                e.preventDefault();
                this.handleChangeByArrows(keyCode === UP);
            }

            if (keyCode === ESC) {
                this.handleCancel(e);
                e.target.blur();
            }

            if (keyCode === BACKSPACE) {
                this.shuoldAutoComplete = false;
            } else {
                this.shuoldAutoComplete = true;
            }

        },
        handleChangeByArrows: function (isUp) {

            var selectedItemIndex = this.state.focusedItem ? this.getItemIndex(this.state.focusedItem) : this.getItemIndex(this.state.selectedItem);

            this.setState({
                focusedItem: undefined,
                selectStart: 0
            });

            var index = (isUp) ? selectedItemIndex - 1 : selectedItemIndex + 1;
            if (index < 0 || index >= this.items.length) {
                return;
            }
            this.selectItem(this.items[index]);
        },
        onOuterClick: function () {
            if (this.state.open) {
                this.selectItem(this.initialItem);
                this.hide();
            }
        },
        handleCancel: function (e) {
            e.stopPropagation();
            this.hide();
            this.selectItem(this.initialItem);
        },
        handleChange: function (e) {
            var enteredText = e.target.value;
            var foundItem = this.searchMatchedItem(enteredText);

            if (this.shuoldAutoComplete && foundItem) {
                this.setState({
                    text: foundItem.label,
                    selectStart: enteredText.length
                });
                this.selectItem(foundItem);
            } else {
                this.setState({
                    text: enteredText,
                    selectStart: enteredText.length
                });
            }
        },
        handleClick: function (item) {
            this.initialItem = item;
            this.hide();
            this.selectItem(item);
            this.setState({selectStart: item.label.length});
        },
        handleMouseEnter: function (item) {
            this.setState({focusedItem: item});
        },
        getItemByValue: function (value) {
            return _.find(this.items, function (item) {
                return item.value === value;
            });
        },
        searchMatchedItem: function (searchText) {
            searchText = searchText.toLowerCase();
            return _.find(this.items, function (item) {
                return item.label.toLowerCase().indexOf(searchText) === 0;
            });
        },

        getItemIndex: function (currentItem) {
            return _.findIndex(this.items, currentItem);
        },
        selectItem: function (item) {
            this.setState({text: item.label, selectedItem: item});
            this.callOnChangeIfExists(item.value);
        },
        shouldDisplayGroupNames: function (){
            return this.groups.length > 1;
        }

    });

});
