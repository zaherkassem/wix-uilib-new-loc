define([
    'react-dom',
    'react',
    'lodash',
    'util',
    'baseUI/panelInputs/inputMixin',
    'baseUI/panelInputs/dropDown/dropdownManager',
    'baseUI/panelInputs/dropDown/cacheMixin',
    'baseUI/mixins/reportUIChangeMixin',
    'baseUI/panelInputs/dropDown/dropDown.rt'
], function(
    ReactDOM,
    React,
    _,
    util,
    inputMixin,
    dropdownManager,
    cacheMixin,
    reportUIChangeMixin,
    template) {
    'use strict';

    function getSelectedIndex(options, value){
        var selectedIndex = 0;

        options.some(function(child, i){
            var isSelected = child.props.value === value;

            if (isSelected){
                selectedIndex = i;
            }

            return isSelected;
        });

        return selectedIndex;
    }

    var TOGGLE_KEY_CODES = [32, 38, 40];

    return {
        mixins: [
            inputMixin,
            cacheMixin,
            util.translationMixin,
            reportUIChangeMixin
        ],

        propTypes: {
            label: React.PropTypes.string,
            tabIndex: React.PropTypes.number,
            scrollSpeed: React.PropTypes.number,
            toggleIcon: React.PropTypes.bool,
            template: React.PropTypes.func,
            autotranslate: React.PropTypes.bool,
            infoText: React.PropTypes.string,
            setSelectedAnyway: React.PropTypes.bool
        },

        render: template,

        getInitialState: function(){
            var value = this.getValueFromProps();
            var optionsData = this.getOptionsData(value, this.props.children);
            var options = optionsData.options;
            var selectedIndex = optionsData.selectedIndex;

            this.updateCache({
                selectedContent: this.getSelectedContent(selectedIndex, options),
                options: options,
                footer: optionsData.footer
            });

            return {
                value: value,
                selectedIndex: selectedIndex,
                expanded: false
            };
        },

        componentWillReceiveProps: function (nextProps) {
            var newVal = this.getValueFromProps(nextProps);

            if (nextProps.children !== this.props.children){
                var optionsData = this.getOptionsData(newVal, nextProps.children);

                this.updateCache({
                    selectedContent: this.getSelectedContent(optionsData.selectedIndex, optionsData.options),
                    options: optionsData.options,
                    footer: optionsData.footer
                });

                this.setState({selectedIndex: optionsData.selectedIndex});
            }

            if (this.getValueFromProps() !== newVal) {
                var options = this.getCached('options');
                var selectedIndex = getSelectedIndex(options, newVal);

                this.updateCache('selectedContent', this.getSelectedContent(selectedIndex, options));

                this.setState({
                    value: newVal,
                    selectedIndex: selectedIndex
                });
            }
        },

        componentWillUnmount: function(){
            dropdownManager.hide();
        },

        getSelectedContent: function(selectedIndex, children){
            var content = children[selectedIndex].props.children || '';

            if (this.props.autotranslate && typeof content === 'string'){
                content = this.translateIfNeeded(content.trim());
            }

            return content;
        },

        getOptionsData: function(value, children){
            var autotranslate = this.props.autotranslate;
            var optionIndex = 0;

            var optionsData = {
                options: [],
                footer: null
            };
            var filteredChildren = _(children).flattenDeep().filter(React.isValidElement).value();
            
            React.Children.forEach(filteredChildren, function(child){
                if (child){
                    if (child.props.type === 'footer'){
                        optionsData.footer = child;
                    } else {
                        var optionClone;

                        var newProps = {
                            key: 'option-' + optionIndex,
                            index: optionIndex,
                            autotranslate: autotranslate
                        };

                        //set selected index to the first child with value === value
                        if (optionsData.selectedIndex === undefined && value === child.props.value){
                            optionsData.selectedIndex = optionIndex;
                        }

                        optionClone = React.cloneElement(child, newProps);
                        optionsData.options.push(optionClone);

                        optionIndex++;
                    }
                }
            });

            //if we didn't find any child to be selected, select the first option
            if (!optionsData.selectedIndex) {
                optionsData.selectedIndex = 0;
            }

            return optionsData;
        },

        getData: function(){
            return {
                options: this.getCached('options'),
                footer: this.getCached('footer'),
                selectedIndex: this.state.selectedIndex,
                className: this.className,
                showScrollBar: this.props.showScrollBar
            };
        },

        getDDClassName: function(){
            var addClassName = '';

            if (this.className){
                addClassName += ' ' + this.className;
            }

            if (this.props.className){
                addClassName += ' ' + this.props.className;
            }

            if (this.state.expanded){
                addClassName += ' expanded';
            }

            if (this.props.showScroll){
                addClassName += ' show-scroll';
            }

            if (this.props.disabled){
                addClassName += ' disabled';
            }

            return addClassName.trim();
        },

        getDDEl: function(){
            return ReactDOM.findDOMNode(this.refs.dropdown);
        },

        getOnChange: function(newValue){
            return this.callOnChangeIfExists.bind(this, newValue);
        },

        setSelected: function(optionData){
            var newValue = optionData.value;
            var newIndex = optionData.index;

            if (this.props.setSelectedAnyway || (this.state.value !== newValue || this.state.selectedIndex !== newIndex)){
                this.reportUIChange({value: newValue});
                this.updateCache('selectedContent', optionData.content);

                this.setState({
                    value: newValue,
                    selectedIndex: newIndex
                }, this.getOnChange(newValue));
            }
        },

        toggle: function(event) {
            if (!this.props.disabled && this.props.onClick) {
                this.props.onClick(event);
            } else if (!this.props.disabled){
                dropdownManager.toggle(this);
                this.preventBlur = true;
            }
        },

        onKeyDown: function(e){
            if (TOGGLE_KEY_CODES.indexOf(e.keyCode) > -1){
                this.toggle(e);
                e.preventDefault();
                e.stopPropagation();
            }
        },

        focus: function(){
            if (this.isMounted()){
                ReactDOM.findDOMNode(this).focus();
            }
        },

        isExpanded: function(){
            return dropdownManager.isExpanded(this);
        },

        setExpanded: function(isExpanded){
            this.setState({expanded: isExpanded});
        },

        getFocusEl: function(){
            var focusElement = this.refs.focusElement;

            if (focusElement){
                return ReactDOM.findDOMNode(focusElement);
            }
        }//,

        //onBlur: function(){
        //    if (!this.preventBlur){
        //        dropdownManager.blur();
        //    } else {
        //        this.preventBlur = false;
        //    }
        //}
    };
});
