define([], function() {
    'use strict';

    var validationExpressions = {
        /**
         * @description a Regular Expression that test for a valid Url
         * note that this is more forgiving, in other words, it will allow 'some' invalid domains (e.g. youtu.1), but we don't care too much - that's the users problem already
         */
        validUrlReg: /^(?:(?:ftps?:|https?:)?\/\/)?(?:(?:[\u0400-\uA69F\w][\u0400-\uA69F\w-]*)?[\u0400-\uA69F\w]\.)+(?:[\u0400-\uA69Fa-z]+|\d{1,3})(?::[\d]{1,5})?(?:[/?#].*)?$/i,

        /**
         * @description a Regular Expression that test for a valid url characters which are allowed for page uri naming
         */
        invalidUrlCharacters: /[^A-Za-z0-9-]/g,

        /**
         * @description a Regular Expression that test for a valid Video Url - different formats
         */
        validYouTubeLongUrlReg: /(?:youtube\.com\/watch[^\s]*[\?&]v=)([\w-]+)/,
        validYouTubeShortUrlReg: /(?:youtu\.be\/)([\w-]+)/,
        validVimeoUrlReg: /vimeo\.com\/(\d+)$/,

        /**
         * @description a Regular Expression that test for a valid Video (Youtube or Vimeo) Url
         */
        validVideoUrlReg: /^(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/|^\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,

        /**
         * @description a Regular Expression that test for a valid Email
         */
        validEmailReg: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

        validPinItUrl: /^https:\/\/?www\.pinterest\.com\/pin\/\d+\/*$/,

        validatePinterestUrl: /^(https?:\/\/)?www\.pinterest\.com\/[^&%$#*?\\_=+.!<>|]+\/?$/,

        validTwitterUser: /^@?[a-zA-Z0-9_%]{1,15}$/,

        validNumericValueReg: /^[0-9]+(\.[0-9]+)?$/,

        validFacebookPageId: /[^\w\.]/,

        validDisqusId: /^[a-zA-Z0-9_-]+$/
    };

    return Object.freeze(validationExpressions);
});
