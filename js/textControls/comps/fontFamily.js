define(['react', 'lodash', 'textControls/comps/fontFamily.rt', 'util'], function (React, _, template, util) {
    'use strict';

    return React.createClass({
        displayName: 'fontFamily',
        render: template,
        getInitialState: function () {
            return {
                fontsItems: this.getFontsItems(this.props.fonts)
            };
        },
        getDefaultProps: function () {
            return {
                optionsWidth: 284
            };
        },
        componentWillReceiveProps: function (nextProps) {
            if (!_.isEqual(this.props.fonts, nextProps.fonts)) {
                this.setState({fontsItems: this.getFontsItems(nextProps.fonts)});
            }
        },
        getFontsItems: function (fontsArr) {
            var fontItems = [];
            var fontsByLang = fontsArr;
            _.forEach(fontsByLang, function (lang) {
                var langGroup = {
                    groupName: lang.lang,
                    items: []
                };

                _.forEach(lang.fonts, function (font) {
                    if (font.permissions !== 'legacy') {
                        var spriteIndex = font.spriteIndex + font.characterSets.indexOf(lang.lang);
                        var spriteYOffset = spriteIndex * (-24);

                        //todo - check about image url editor-base... -
                        //todo - mayeb it should move to scss and we will pass a class
                        var fontItem = {
                            label: font.displayName,
                            value: font.fontFamily,
                            style: {
                                'backgroundImage': 'url(' + util.media.getMediaUrl('textEditor/fonts.v1.png') + ')',
                                'backgroundPosition': '0px ' + spriteYOffset + 'px',
                                'backgroundRepeat': 'no-repeat',
                                'height': '24px',
                                'width': '264px',
                                'pointerEvents': 'none'
                            }
                        };

                        langGroup.items.push(fontItem);
                    }
                });

                fontItems.push(langGroup);
            });

            return _(fontItems).map('items').flattenDeep().value();
        },
        handleFooterOnClick: function () {
            this.props.footerOnClick();
            if (this.isExpanded()) {
                this.refs.combobox.toggle();
            }
        },
        isExpanded: function () {
            return this.refs.combobox.isExpanded();
        }
    });
});
