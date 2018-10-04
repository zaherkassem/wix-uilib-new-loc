define(['jquery'], function ($) {
    'use strict';

    return {
        afterImagesLoad: function(callback, $container){
            $container = $container || $(ReactDOM.findDOMNode(this));

            if (!$container){
                return;
            }

            var imagesInContainer = $container.find('img');
            var totalImages = imagesInContainer.length;
            var loadedImages = 0;

            function tryApplyCallback(){
                if (totalImages === loadedImages){
                    callback();
                }
            }

            imagesInContainer.each(function(){
                var isAlreadyLoaded = $(this)[0].complete;

                if (isAlreadyLoaded){
                    loadedImages++;
                    tryApplyCallback();
                } else {
                    $(this).load(function(){
                        loadedImages++;
                        tryApplyCallback();
                    });
                }
            });
        }
    };
});
