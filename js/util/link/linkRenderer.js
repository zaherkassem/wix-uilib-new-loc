define([
        'lodash',
        'util/validators/validate'
    ],
    function (santaUtils, validate) {
        'use strict';

        //
        // TODO: unit tests are needed!!!
        //

        /*function renderExternalLink(linkDataItem) {
         var url = linkDataItem.url;
         if (!url || !W.Utils.isValidUrl(url)) {
         return '';
         }
         return url;
         }*/

        function getPageData(editorAPI, pageId) {
            var pageIdWithoutHash = (pageId.indexOf('#') === 0) ? pageId.substr(1) : pageId;

            if (!editorAPI.pages.isPageExist(pageIdWithoutHash)) {
                return null;
            }

            return editorAPI.pages.data.get(pageIdWithoutHash);
        }


        var linkTextRenderers = {
            externallink: function (editorAPI, linkData) {
                if (!validate.url(linkData.url)) {
                    return '';
                }
                return linkData.url;
            },
            pagelink: function (editorAPI, linkData) {
                var pageData = getPageData(editorAPI, linkData.pageId);
                if (pageData) {
                    return 'Page - ' + pageData.title;
                }
                return '';
                //TODO: implement this case
                //return renderPageLink(linkDataItem);
            },
            anchorlink: function (editorAPI, linkData) {
                var pageData = getPageData(editorAPI, linkData.pageId);
                var anchorDataId;
                var anchorData;
                var anchorName;
                var pageName;

                if (pageData) {
                    anchorDataId = linkData.anchorDataId;
                    anchorData = anchorDataId.indexOf('SCROLL') < 0 && linkData;
                    anchorName = (anchorData && anchorData.name) || linkData.anchorName;
                    pageName = pageData.title;

                    return 'Anchor (' + anchorName + (pageName ? (', Page: ' + pageName) : '') + ')';
                }

                return (anchorData && anchorData.name) || linkData.anchorName || '';

            },
            emaillink: function (editorAPI, linkData) {
                var mailAddress = linkData.recipient;
                if (mailAddress) {
                    return 'Email - ' + mailAddress;
                }

                return '';
            },
            documentlink: function (editorAPI, linkData) {
                return 'Document - ' + linkData.name;
            },
            logintowixlink: function () {
                return 'Login / Signup Dialog';
            }
        };


        return {
            renderLinkDataItemForPropertyPanel: function (editorAPI, linkData) {
                var handlerKey = linkData.type.toLowerCase();
                return linkTextRenderers[handlerKey] ? linkTextRenderers[handlerKey](editorAPI, linkData) : '';
            }
        };
    });
