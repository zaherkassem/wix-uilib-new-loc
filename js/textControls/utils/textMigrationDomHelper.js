define(['lodash', 'jquery'], function (_, $) {
    'use strict';

    var blockElementTags = ['audio', 'dd', 'dt', 'li', 'video', 'address', 'article', 'aside', 'blockquote', 'details', 'div', 'dl', 'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'menu', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul', 'center', 'dir', 'noframes'];

    function mootoolsTypeOf(item){
        if (item === null) {
            return 'null';
        }
        if (item.$family) {
            return item.$family();
        }

        if (item.nodeName){
            if (item.nodeType === 1) {
                return 'element';
            }
            if (item.nodeType === 3) {
                return (/\S/).test(item.nodeValue) ? 'textnode' : 'whitespace';
            }
        } else if (typeof item.length === 'number'){
            if (item.callee) {
                return 'arguments';
            }
            if ('item' in item) {
                return 'collection';
            }
        }

        return typeof item;
    }

    /**
     *  IE8 - mootools bug, when a mootools element there are round 130 attributes, and the copy method makes functions to be string - no good..
     this is a very partial list of attributes, should suffice for the current use of the function
     * @param element
     */
    function getAllAttributes(element){
        var attributeCollection = element.attributes;
        var attributeArray = [];
        if (attributeCollection.length < 20){
            attributeArray = collectionToArray(attributeCollection);
        } else {
            var attrMap = element.getProperties('class', 'style', 'dir', 'href', 'background', 'action', 'src', 'data', 'align', 'alt', 'color', 'face', 'label', 'for', 'link', 'id', 'name', 'value');
            _.forEach(attrMap, function(value, key){
                if (key && value){
                    attributeArray.push({
                        'name': key,
                        'value': value
                    });
                }
            });
        }
        return attributeArray;
    }

    function moveChildren(from, target) {
        if (from === target) {
            return;
        }

        var child;
        while (( child = from.firstChild )) {
            target.appendChild(from.removeChild(child));
        }
    }

    function collectionToArray(col) {
        //copied from http://stackoverflow.com/questions/3199588/fastest-way-to-convert-javascript-nodelist-to-array
        function convertNodeListToArray(nl) {
            var arr = [];
            for (var i = nl.length; i--; ) {
                arr.unshift(nl[i]);
            }

            return arr;
        }

        return convertNodeListToArray(col);
    }

    function renameNode(node, newTag) {
        // If it's already correct exit here.
        if (node.tagName.toLowerCase() === newTag.toLowerCase()) {
            return node;
        }

        // Create the new node.
        var newNode = document.createElement(newTag);

        // Copy all attributes.
        var attributeArray = getAllAttributes(node);
        _.forEach(attributeArray, function (attr) {
            newNode.setAttribute(attr.name, attr.value);
        });

        // Move children to the new node.
        moveChildren(node, newNode);

        // Replace the node.
        if (node.parentNode) {
            node.parentNode.replaceChild(newNode, node);
        }
        return newNode;
    }

    function isBlockElement(element) {
        var elementTag = element.tagName && element.tagName.toLowerCase();
        return _.includes(blockElementTags, elementTag);
    }

    function isOnlyWhiteSpace(elements){
        return elements.every(function(el){
            return mootoolsTypeOf(el) === 'whitespace';
        });
    }

    function isDomElement(element){
        return mootoolsTypeOf(element) === 'element';
    }

    /**
     *
     * @param element
     * @return {Boolean} true only if it's a real text node, not only whitespace
     * @private
     */
    function isTextNode(element) {
        return mootoolsTypeOf(element) === 'textnode';
    }

    function hasBlockElementChildren(element) {
        return _.some(element.children, isBlockElement);
    }

    function replaceElementWithItsChildren(element){
        var parent = element.parentNode;
        var children = collectionToArray(element.childNodes);
        _.each(children, function(childToAppend) {
            parent.insertBefore(childToAppend, element);
        });
        parent.removeChild(element);
    }

    function isElementHasAttributes(element){
        var attributes = getAllAttributes(element);
        if (!attributes){
            return false;
        }
        for (var i = 0; i < attributes.length; i++){
            var attrVal = attributes[i].value;
            //if attribute has value
            if (attrVal){
                return true;
            }
        }
        return false;
    }

    function removeClass(element, cssClass){
        var jElement = $(element);
        jElement.removeClass(cssClass);
        if (jElement.prop('class').length === 0){
            jElement.removeAttr('class');
        }
    }

    /**
     * @param node - the node to update its style
     * @param styleProperties - object of key-value pairs of properties to update in the style
     */
    function setStyle(node, styleProperties) {
        $(node).css(styleProperties);
        var styleValue = node.getAttribute('style');
        //for some reason in phantomJS jquery adds extra space to the style string, in order to pass the test in all browser
        //the space is removed &  fixed here
        if (styleValue && styleValue.charAt(styleValue.length - 1) === ' ') {
            node.setAttribute('style', styleValue.substr(0, styleValue.length - 1));
        }
    }

    return {
        moveChildren: moveChildren,
        collectionToArray: collectionToArray,
        isBlockElement: isBlockElement,
        hasBlockElementChildren: hasBlockElementChildren,
        isDomElement: isDomElement,
        isTextNode: isTextNode,
        isElementHasAttributes: isElementHasAttributes,
        replaceElementWithItsChildren: replaceElementWithItsChildren,
        renameNode: renameNode,
        isOnlyWhiteSpace: isOnlyWhiteSpace,
        removeClass: removeClass,
        setStyle: setStyle
    };
});