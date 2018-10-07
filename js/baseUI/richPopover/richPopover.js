define([
    'react-dom',
    'react',
    'lodash',
    'webui-popover',
    'baseUI/framework/uiConstants'
],
    function(ReactDOM, React, _,webuiPopover ,uiConstants) {
        'use strict';

        return React.createClass({
            displayName: 'richPopover',
            propTypes: {
				placement:	React.PropTypes.string,
			    container: 	document.body,
			    width:		React.PropTypes.string,
			    height:		React.PropTypes.string,
			    trigger:	React.PropTypes.string,
			    selector:	React.PropTypes.bool,
			    style:		React.PropTypes.string,
			    animation:	React.PropTypes.string,
			    delay: {
			        show: React.PropTypes.string,
			        hide: React.PropTypes.number
			    },
			    cache:React.PropTypes.bool,
			    multi:React.PropTypes.bool,
			    arrow:React.PropTypes.bool,
			    title:React.PropTypes.string,
			    content:React.PropTypes.string,
			    closeable:React.PropTypes.bool,
			    direction:React.PropTypes.string,
			    padding:React.PropTypes.bool,
			    type:React.PropTypes.string,
			    url:React.PropTypes.string,
			    backdrop:React.PropTypes.bool,
			    dismissible:React.PropTypes.bool,
			    autoHide:React.PropTypes.bool,
			    offsetTop:React.PropTypes.oneOfType([
                    React.PropTypes.number,
                    React.PropTypes.string
                ]),
			    offsetLeft:React.PropTypes.oneOfType([
                    React.PropTypes.number,
                    React.PropTypes.string
                ]),
			    onShow: function($element) {},
			    onHide: function($element) {},           	
           },
            getDefaultProps: function () {
                return {
                	placement:'auto',//values: auto,top,right,bottom,left,top-right,top-left,bottom-right,bottom-left,auto-top,auto-right,auto-bottom,auto-left,horizontal,vertical
				    container: document.body,// The container in which the popover will be added (i.e. The parent scrolling area). May be a jquery object, a selector string or a HTML element. See https://jsfiddle.net/1x21rj9e/1/
				    width:'auto',//can be set with  number
				    height:'auto',//can be set with  number
				    trigger:'click',//values:  click,hover,manual(handle events by your self),sticky(always show after popover is created);
				    selector:false,// jQuery selector, if a selector is provided, popover objects will be delegated to the specified. 
				    style:'',// Not to be confused with inline `style=""`, adds a classname to the container for styling, prefixed by `webui-popover-`. Default '' (light theme), 'inverse' for dark theme
				    animation:null, //pop with animation,values: pop,fade (only take effect in the browser which support css3 transition)
				    delay: {//show and hide delay time of the popover, works only when trigger is 'hover',the value can be number or object
				        show: null,
				        hide: 300
				    },
				    cache:true,//if cache is set to false,popover will destroy and recreate
				    multi:false,//allow other popovers in page at same time
				    arrow:true,//show arrow or not
				    title:'',//the popover title, if title is set to empty string,title bar will auto hide
				    content:'',//content of the popover,content can be function
				    closeable:false,//display close button or not
				    direction:'', // direction of the popover content default is ltr ,values:'rtl';
				    padding:true,//content padding
				    type:'html',//content type, values:'html','iframe','async'
				    url:'',//if type equals 'html', value should be jQuery selecor.  if type equels 'async' the plugin will load content by url.
				    backdrop:false,//if backdrop is set to true, popover will use backdrop on open
				    dismissible:true, // if popover can be dismissed by  outside click or escape key
				    autoHide:false, // automatic hide the popover by a specified timeout, the value must be false,or a number(1000 = 1s).
				    offsetTop:0,  // offset the top of the popover
				    offsetLeft:0,  // offset the left of the popover
				    onShow: _.noop, // callback after show
				    onHide: _.noop, // callback after hide     
                };
            },
            getInitialState: function () {
                this.id = this.props.id
                return null;
            },
            
        });