define([
    'react-dom',
    'react',
    'lodash',
    'util',
    'baseUI/panelInputs/dropDown/dropdownManager',
    'baseUI/panelInputs/dropDown/cacheMixin',
    'baseUI/panelInputs/dropDown/options.rt'
], function(ReactDOM, React, _, util, dropdownManager, cacheMixin, template) {
    'use strict';

    var keyboardShortcuts = util.keyboardShortcuts;

    function hasClass(className, el){
        return el.classList.contains(className);
    }

    function hasBottomOverflow(el){
        return (el.offsetHeight + el.scrollTop + 1) < el.scrollHeight; // + 1 is a hack
    }

    function hasTopOverflow(el){
        return el.scrollTop > 0;
    }

    return React.createClass({
        displayName: 'options',

        mixins: [cacheMixin],

        preventBlur: false,

        render: template,

        getInitialState: function(){
            this.updateCache({
                optionalClasses: null,
                initialKeyboardContext: '',
                optionsElStyle: null
            });

            return {
                visible: false,
                className: '',
                showScrollBar: false
            };
        },

        getWindow: function(){ // this needed because of tests and phantom strange bug
            return window;
        },

        componentDidMount: function(){
            var windowObj = this.getWindow();

            dropdownManager.registerOptionsComponent(this);
            keyboardShortcuts.registerContext(dropdownManager.keyboardContext, dropdownManager.getKeyboardHandlers());

            this.onWindowResize = function(){
                if (this.state.visible){
                    this.locate(dropdownManager.getOptionsLocation());

                    if (!this.state.showScrollBar){
                        this.toggleScrollArrows();
                    }
                }
            }.bind(this);

            this.onWindowScroll = function(){
                if (this.state.visible){
                    this.hide();
                }
            }.bind(this);

            windowObj.addEventListener('resize', this.onWindowResize);
            windowObj.addEventListener('scroll', this.onWindowScroll);
        },

        shouldComponentUpdate: function(nextProps, nextState){
            return (nextState.visible !== undefined && nextState.visible !== this.state.visible) || (nextState.className !== undefined && nextState.className !== this.state.className);
        },

        componentDidUpdate: function(){
            var optionsEl = this.getOptionsEl();

            if (this.state.visible){
                this.locate(dropdownManager.getOptionsLocation());

                if (this.state.showScrollBar){
                    this.hideScrollArrows();
                } else {
                    this.toggleScrollArrows();
                }

                dropdownManager.focus(optionsEl);
            } else {
                var optionalClasses = this.getCached('optionalClasses');

                if (optionalClasses && optionalClasses.length){
                    optionalClasses.forEach(function(optionalClass){
                        optionsEl.classList.remove(optionalClass);
                    });

                    this.updateCache('optionalClasses', null);
                }
            }
        },

        componentWillUnmount: function(){
            var windowObj = this.getWindow();

            windowObj.removeEventListener('resize', this.onWindowResize);
            windowObj.removeEventListener('scroll', this.onWindowScroll);
            keyboardShortcuts.unregisterContext(dropdownManager.keyboardContext);
        },

        show: function(dropdownData){
            this.updateCache({
                options: dropdownData.options,
                initialKeyboardContext: keyboardShortcuts.getContext(),
                footer: dropdownData.footer
            });

            keyboardShortcuts.setContext(dropdownManager.keyboardContext);

            this.setState({
                visible: true,
                className: dropdownData.className,
                showScrollBar: dropdownData.showScrollBar
            });

            this.disableBrowserScroll();
        },

        hide: function(){
            this.setState({visible: false});
            this.enableBrowserScroll();
            this.resetOptionsElStyle();
            dropdownManager.focusDropdown();
            dropdownManager.setHovered(null);

            if (keyboardShortcuts.getContext() === dropdownManager.keyboardContext){
                keyboardShortcuts.setContext(this.getCached('initialKeyboardContext'));
            }
        },

        getOptionsListEl: function(){
            return ReactDOM.findDOMNode(this.refs.list);
        },

        getOptionsEl: function(){
            return ReactDOM.findDOMNode(this.refs.options);
        },

        getSelectedEl: function(selectedOptionIndex){
            return this.getOptionsListEl().children[selectedOptionIndex];
        },

        getFooterEl: function(){
            var footer = this.refs.footer;

            if (footer){
                return ReactDOM.findDOMNode(footer);
            }

            return null;
        },

        locate: function(location){
            var optionsEl = this.getOptionsEl();
            var optionalClasses = location.optionalClasses;
            var toCache = {};

            _.forEach(location.style, function(value, prop){
                optionsEl.style.setProperty(prop, value + 'px');
            });

            toCache.optionsElStyle = location.style;
            this.getOptionsListEl().scrollTop = location.scrollTop || 0;

            if (optionalClasses && optionalClasses.length){
                optionalClasses.forEach(function(optionalClass){
                    optionsEl.classList.add(optionalClass);
                });

                toCache.optionalClasses = optionalClasses;
            }

            this.updateCache(toCache);
        },

        toggleScrollArrows: function(){
            var listEl = this.getOptionsListEl();
            var optionsEl = this.getOptionsEl();
            var hasUpClass = hasClass('up', optionsEl);
            var hasDownClass = hasClass('down', optionsEl);
            var hasScrollClass = hasClass('scroll', optionsEl);
            var hasListTopOverflow = hasTopOverflow(listEl);
            var hasListBottomOverflow = hasBottomOverflow(listEl);

            if ((hasListTopOverflow || hasListBottomOverflow) && !hasScrollClass){
                optionsEl.classList.add('scroll');
            } else if (!hasListTopOverflow && !hasListBottomOverflow && hasScrollClass){
                optionsEl.classList.remove('scroll');
            }

            if (hasListTopOverflow && !hasUpClass){
                optionsEl.classList.add('up');
            } else if (hasUpClass && !hasListTopOverflow){
                optionsEl.classList.remove('up');
            }

            if (hasListBottomOverflow && !hasDownClass){
                optionsEl.classList.add('down');
            } else if (hasDownClass && !hasListBottomOverflow){
                optionsEl.classList.remove('down');
            }
        },

        hideScrollArrows: function(){
            var optionsEl = this.getOptionsEl();

            if (hasClass('up', optionsEl)){
                optionsEl.classList.remove('up');
            }

            if (hasClass('down', optionsEl)){
                optionsEl.classList.remove('down');
            }
        },

        wheelScroll: function(e){
            this.scroll(dropdownManager.getScrollData(e.deltaY));
        },

        scroll: function(scrollData){
            if (scrollData){
                if (scrollData.edge){
                    this.getOptionsEl().style.setProperty(scrollData.edge, scrollData.distance + 'px');
                } else {
                    this.getOptionsListEl().scrollTop += scrollData.distance;
                }

                if (!this.state.showScrollBar){
                    this.toggleScrollArrows();
                }
            }
        },

        scrollTo: function(direction){
            this.scroll(dropdownManager.getScrollData(direction * dropdownManager.defaultScrollSpeed));
            this.scrollAnimationFrame = window.requestAnimationFrame(this.scrollTo.bind(this, direction));
        },

        stopScrollAnimation: function(){
            window.cancelAnimationFrame(this.scrollAnimationFrame);
        },

        disableBrowserScrollKeys: function(e){
            var keys = [37, 38, 39, 40];

            keys.some(function(key){
                var isScrollKey = e.keyCode === key;

                if (isScrollKey){
                    e.preventDefault();
                }

                return isScrollKey;
            });
        },

        disableBrowserScroll: function(){
            document.onkeydown = this.disableBrowserScrollKeys;

            window.onwheel = window.onmousewheel = function(e){
                e.preventDefault();
            };
        },

        enableBrowserScroll: function(){
            window.onwheel = window.onmousewheel = document.onkeydown = null;
        },

        onMouseLeave: function(){
            dropdownManager.setHovered(null);
        },

        resetOptionsElStyle: function(){
            var optionsEl = this.getOptionsEl();

            _.forEach(this.getCached('optionsElStyle'), function(value, name){
                optionsEl.style.setProperty(name, '');
            });
        },

        onBlur: function(){
            if (this.state.visible && !this.preventBlur){
                dropdownManager.blur();
            }
        },

        disableBlur: function(){ // blur is disabled if it was fired by one of the children of the options
            this.preventBlur = true;
        },

        enableBlur: function(){ // blur is enabled in order to handle outside options clicks
            this.preventBlur = false;
        }
    });
});
