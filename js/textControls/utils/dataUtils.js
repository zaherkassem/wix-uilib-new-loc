/*eslint-disable*/
define(['lodash', 'textControls/utils/constants'], function (_, constants) {
    'use strict';

    var _tempPrefix = '';

    function removeHtmlComments(text) {
        return text.replace(/<!--[^>]*>/g, "");
    }

    function removeRedundantNodesAndAttributes(element) {
        var nodes2remove = [];
        _.forEach(element.children, function (child) {
            if (_shouldNodeBeRemoved(child)) {
                nodes2remove.push(child);
            } else {
                _removeForbiddenAttributes(child);
                _removeForbiddenValuesFromSensitiveAttributes(child);
                removeRedundantNodesAndAttributes(child);
            }
        });
    }

    function _removeForbiddenAttributes(element) {
        var attrs2remove = _isImageNode(element) ? _getForbiddenImageAttributesNames(element) : _getForbiddenBaseAttributesNames(element);
        _.forEach(attrs2remove, function (attrName) {
            element.removeAttribute(_tempPrefix + attrName);
        }, this);

    }

    function _shouldNodeBeRemoved(node) {
        return _.some(constants.FORBIDDEN_TAGS, function (tag) {
            return node.nodeName.toLowerCase() === (_tempPrefix + tag);
        }, this);
    }

    function _isImageNode(node) {
        return node.nodeName.toLowerCase() === 'img';
    }

    function _getForbiddenBaseAttributesNames(element) {
        var attrs2remove = constants.FORBIDDEN_TAGS_AND_ATTRIBUTES;
        if (element.nodeName.toLowerCase() === 'a') {
            _.pull(attrs2remove, 'dataquery');
        }
        return attrs2remove;
    }

    function _getForbiddenImageAttributesNames(element) {
        var attrs2remove = _.difference(_getElementAttributesNames(element), constants.IMAGE_WHITE_LIST_ATTRIBUTES);
        return attrs2remove;
    }

    function _getElementAttributesNames(element) {
        var attrNames = _.map(element.attributes, function (attribute) {
            return attribute.nodeName.toLowerCase();
        });
        return attrNames;
    }

    function _removeForbiddenValuesFromSensitiveAttributes(element) {
        var atrValue;
        _.forEach(constants.SENSITIVE_ATTRIBUTES, function (attrName) {
            atrValue = element.getAttribute(attrName);
            if (atrValue) {
                atrValue = atrValue.toLowerCase();
                if ((attrName !== "style" && atrValue.indexOf('script') > -1) || atrValue.indexOf('expression') > -1){
                    element.removeAttribute(attrName);
                }
            }
        });
    }

    function isEmptyHtmlText(html) {
        var tempDiv = window.document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent.length < 1;
    }

    return {
        removeHtmlComments: removeHtmlComments,
        removeRedundantNodesAndAttributes: removeRedundantNodesAndAttributes,
        isEmptyHtmlText: isEmptyHtmlText
    }
});
/*eslint-enable*/
