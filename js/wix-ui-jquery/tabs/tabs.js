var layoutUtils = require('util/layout/layoutUtils');

jQuery.fn.definePlugin('Tabs', function ($) {
    'use strict';

    var styles = {
        className: ' tabs',
        tabPane: '.tabs'
    };
    var events = {
        click: 'click'
    };

    return {
        init: function(){
            var className = this.options.className || '';
            this.markup(className + styles.className);
            this.bindEvents();
            this.setValue(this.options.defaultValue);
        },
        getDefaults: function(){
            return {
                tabValueAttrName : 'data-tab',
                tabClassName: 'tab-label',
                selectedClassName: 'selected',
                defaultValue : 'tab0'
            };
        },
        markup: function(className){
            if(!this.$el.hasClass(className)){
                this.$el.addClass(className);
            }
            this.tabs = this.$el.find('li['+this.options.tabValueAttrName+']')
                .addClass(this.options.tabClassName);
            this.tabsContent = this.$el.find('.tab-content > div['+this.options.tabValueAttrName+']');
        },
        bindEvents: function () {
            var tabs = this;
            this.$el.on('click', '.'+this.options.tabClassName, function (e) {
                tabs.selectTab($(this));
            });

            this.onChange = function (cb) {
                this.callback = cb;
            };
        },
        getValue: function () {
            return this.value;
        },
        setValue: function (value) {
            var $el = $('li[data-tab='+ value +']');
            if (_.isEmpty($el)) {
                $el = $(this.tabs[0]);
            }
            this.selectTab($el);
        },
        selectTab: function ($el) {
            var tabs = this;
            if ($el.hasClass(tabs.options.selectedClassName)) { return; }
            tabs.tabsContent.hide();
            tabs.tabs.removeClass(tabs.options.selectedClassName);
            var dataTab = $el.attr(tabs.options.tabValueAttrName);
            $el.addClass(tabs.options.selectedClassName);
            $.each(tabs.tabsContent, function(index, value) {
                var $elem = $(value);
                if($elem.attr(tabs.options.tabValueAttrName) === dataTab){
                    $elem.show();
                }
            });

            if (this.callback) {
                this.callback(dataTab);
            }

            this.value = dataTab;
        }
    };
});
