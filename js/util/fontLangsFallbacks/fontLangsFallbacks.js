define(['lodash'], function (_) {
    'use strict';


    var FONT_FALLBACKS = {
        'ru': {
            'anton': 'Play',
            'basic': 'Open Sans',
            'caudex': 'Forum',
            'chelsea market': 'Open Sans',
            'corben': 'Forum',
            'enriqueta': 'Droid Serif',
            'fredericka the great': 'EB Garamond',
            'jockey one': 'Kelly Slab',
            'josefin slab': 'Courier New',
            'lucida console': 'Open Sans',
            'lucida sans unicode': 'Open Sans',
            'mr de haviland': 'Marck Script',
            'niconne': 'Marck Script',
            'noticia text': 'Droid Serif',
            'overlock': 'Open Sans',
            'palatino linotype': 'EB Garamond',
            'patrick hand': 'comic Sans MS',
            'sarina': 'Lobster',
            'signika': 'Open Sans',
            'spinnaker': 'Open Sans',
            'tahoma': 'Open Sans',
            'stencil-w01-bold': 'bodoni-w01-poster',
            'itc-arecibo-w01-regular': 'Kelly slab',
            'avenida-w01': 'Kelly slab',
            'pacifica-w00-condensed': 'Open Sans Condensed',
            'geotica-w01-four-open': 'bodoni-w01-poster',
            'aarzo-w00-regular': 'Verdana',
            'braggadocio-w01': 'bodoni-w01-poster',
            'reklamescriptw00-aedium': 'Lobster',
            'snellroundhandw01-scrip': 'Marck Script',
            'helvetica-w01-light': 'helvetica-w01-roman',
            'nimbus-sans-tw01con': 'Open Sans Condensed',
            'soho-w01-thin-condensed': 'Open Sans Condensed',
            'clarendon-w01-aedium-692107': 'Georgia',
            'museo-w01-700': 'Courier New',
            'museo-slab-w01-100': 'Courier New',
            'americantypwrteritcw01--731025': 'Courier New',
            'monoton': 'Arial Black',
            'sacramento': 'Marck Script',
            'cookie': 'Lobster',
            'raleway': 'helvetica-w01-roman',
            'amatic sc': 'Open Sans Condensed',
            'coquette-w00-light': 'Marck Script',
            'rosewood-w01-regular': 'bodoni-w01-poster'
        },
        'ja': {
            'anton': 'ｍｓ ｐゴシック',
            'arial': 'ｍｓ ｐゴシック',
            'courier new': 'ｍｓ ｐゴシック',
            'arial black': 'ｍｓ ｐゴシック',
            'basic': 'ｍｓ ｐゴシック',
            'caudex': 'ｍｓ 明朝',
            'chelsea market': 'ｍｓ 明朝',
            'comic sans ms': 'メイリオ',
            'corben': 'ｍｓ 明朝',
            'eb garamond': 'ｍｓ 明朝',
            'enriqueta': 'ｍｓ ｐ明朝',
            'forum': 'ｍｓ ｐ明朝',
            'fredericka the great': 'ｍｓ ｐゴシック',
            'georgia': 'ｍｓ 明朝',
            'impact': 'ｍｓ ｐゴシック',
            'jockey one': 'ｍｓ ゴシック',
            'josefin slab': 'ｍｓ 明朝',
            'jura': 'ｍｓ 明朝',
            'kelly slab': 'ｍｓ ゴシック',
            'lucida console': 'ｍｓ ｐゴシック',
            'lucida sans unicode': 'ｍｓ ｐゴシック',
            'marck script': 'ｍｓ 明朝',
            'lobster': 'ｍｓ ｐゴシック',
            'mr de haviland': 'ｍｓ 明朝',
            'niconne': 'ｍｓ 明朝',
            'noticia text': 'メイリオ',
            'open sans': 'ｍｓ ｐゴシック',
            'overlock': 'メイリオ',
            'palatino linotype': 'メイリオ',
            'patrick hand': 'ｍｓ 明朝',
            'play': 'ｍｓ ｐゴシック',
            'sarina': 'ｍｓ ｐゴシック',
            'signika': 'ｍｓ ｐゴシック',
            'spinnaker': 'ｍｓ ｐゴシック',
            'tahoma': 'ｍｓ ｐゴシック',
            'times new roman': 'ｍｓ ｐ明朝',
            'verdana': 'ｍｓ ｐゴシック',
            'bodoni-w01-poster': 'ｍｓ ｐゴシック',
            'stencil-w01-bold': 'ｍｓ ｐゴシック',
            'itc-arecibo-w01-regular': 'ｍｓ ｐゴシック',
            'avenida-w01': 'ｍｓ ｐ明朝',
            'pacifica-w00-condensed': 'ｍｓ 明朝',
            'geotica-w01-four-open': 'ｍｓ ｐゴシック',
            'marzo-w00-regular': 'ｍｓ ｐ明朝',
            'braggadocio-w01': 'ｍｓ ｐゴシック',
            'reklamescriptw00-medium': 'ｍｓ ｐゴシック',
            'snellroundhandw01-scrip': 'ｍｓ 明朝',
            'din-next-w01-light': 'ｍｓ 明朝',
            'helvetica-w01-roman': 'メイリオ',
            'helvetica-w01-light': 'メイリオ',
            'helvetica-w01-bold': 'ｍｓ ｐゴシック',
            'nimbus-sans-tw01con': 'メイリオ',
            'soho-w01-thin-condensed': 'ｍｓ 明朝',
            'droid-serif-w01-regular': 'ｍｓ ゴシック',
            'clarendon-w01-medium-692107': 'ｍｓ ｐゴシック',
            'museo-w01-700': 'ｍｓ ｐゴシック',
            'museo-slab-w01-100': 'ｍｓ ｐゴシック',
            'americantypwrteritcw01--731025': 'ｍｓ 明朝',
            'monoton': 'メイリオ',
            'sacramento': 'ｍｓ ｐ明朝',
            'cookie': 'ｍｓ ｐ明朝',
            'raleway': 'メイリオ',
            'open sans condensed': 'メイリオ',
            'amatic sc': 'ｍｓ ｐ明朝',
            'coquette-w00-light': 'ｍｓ ｐ明朝',
            'rosewood-w01-regular': 'ｍｓ ゴシック'
        },
        'tr': {
            'amatic sc': 'comic sans ms',
            'bodoni-w01-poster': 'open sans condensed',
            'braggadocio-w01': 'arial black',
            'chelsea market': 'comic sans ms',
            'corben': 'noticia text',
            'fredericka the great': 'clarendon-w01-medium-692107',
            'geotica-w01-four-open': 'anton',
            'itc-arecibo-w01-regular': 'kelly slab',
            'josefin slab': 'american typewriter',
            'lucida sans unicode': 'open sans',
            'marzo-w00-regular': 'open sans condensed',
            'mr de haviland': 'marck script',
            'museo-w01-700': 'enriqueta',
            'museo-slab-w01-100': 'courier new',
            'niconne': 'cookie',
            'nimbus-sans-tw01con': 'open sans condensed',
            'overlock': 'open sans',
            'pacifica-w00-condensed': 'jura',
            'raleway': 'helvetica-w01-light',
            'rosewood-w01-regular': 'clarendon-w01-medium-692107',
            'snellroundhandw01-scrip': 'cookie',
            'spinnaker': 'helvetica',
            'stencil-w01-bold': 'impact',
            'soho-w01-thin-condensed': 'Open Sans Condensed',
            'helvetica-w01-light': 'open sans condensed',
            'helvetica-w01-bold': 'arial black',
            'monoton': 'reklamescriptw00-medium',
            'americantypwrteritcw01--731025': 'forum',
            'din-next-w01-light': 'open sans condensed'
        },
        'pl': {
            'helvetica-w01-light': 'open sans condensed',
            'soho-w01-thin-condensed': 'amatic sc',
            'bodoni-w01-poster': 'anton',
            'braggadocio-w01': 'impact',
            'stencil-w01-bold': 'impact',
            'monoton': 'reklamescriptw00-medium',
            'geotica-w01-four-open': 'sacramento',
            'mr de haviland': 'amatic sc',
            'americantypwrteritcw01--731025': 'amatic sc',
            'din-next-w01-light': 'helvetica',
            'museo-slab-w01-100': 'Courier New',
            'raleway': 'helvetica-w01-roman',
            'overlock': 'Open Sans',
            'museo-w01-700': 'enriqueta'
        }
    };

    function enforceMaxFontSize(maxFontSize, match, m1) {
        return Math.min(parseInt(m1, 10), maxFontSize) + 'px';
    }

    return {
        getFallbackFontsForLang: function (langKey) {
            return FONT_FALLBACKS[langKey];
        },
        getFontFallbackIfNeeded: function (langKey, fontFamily) {
            return FONT_FALLBACKS[langKey] && FONT_FALLBACKS[langKey][fontFamily] ? FONT_FALLBACKS[langKey][fontFamily] : fontFamily;
        },
        getUpdatedFonts: function (allFonts, lang, maxFontSize) {
            return _.reduce(allFonts, function (res, value, key) {
                res[key] = _.reduce(FONT_FALLBACKS[lang], function (acc, value2, key2) {
                    return acc.replace(key2, value2.replace(/ /g, '+').toLowerCase());
                }, value);

                if (_.isNumber(maxFontSize) && maxFontSize > 0) {
                    res[key] = res[key].replace(/(\d+)px/, enforceMaxFontSize.bind(null, maxFontSize));
                }

                return res;
            }, {});
        }

    };
});