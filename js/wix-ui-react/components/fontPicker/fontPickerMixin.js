define(['lodash'], function (_) {

    var DEFAULT_THEME = 'font_2';

    return {
        getInitialState: function () {
            var overrides = this.getInitialOverrides();
            return {
                displayName: '',
                hasOverrides: !_.isEmpty(overrides),
                initialOverrides: overrides
            };
        },
        componentDidMount: function () {
            if (Wix.Utils.getViewMode() !== 'editor') {
                return;
            }

            this.getSavedWixParamValue()
            // got saved value, not dealing with overrides
            .then((savedTheme)=> {
                var displayName;
                displayName = savedTheme.displayName || savedTheme.preset;
                if (!displayName && savedTheme.family) {
                    // old ui lib fontFamily saved value, completing missing data
                    this.getThemeWithOverrides()
                    .then((baseThemeWithOverrides)=>{
                        this.getFontDisplayNameByFamily(savedTheme.family).then((displayFontName)=>{
                            this.setState({
                                displayName: displayFontName,
                                fontStyle: _.defaults({family: savedTheme.family}, baseThemeWithOverrides)
                            })
                        })
                    });
                } else {
                    this.setState({
                        displayName: displayName,
                        fontStyle: savedTheme
                    })
                }
            })
            // no saved value, happened only on the first time settings being opened
            .catch(()=> {
                this.getThemeWithOverrides(this.state.initialOverrides)
                    .then((theme)=> {
                        var displayName;
                        if (!this.props.hideTheme) {
                            displayName = this.state.hasOverrides ? 'Custom' : theme.displayName;
                            this.updateState(displayName, theme, true);
                        } else if (this.props.startWithFont) {
                            displayName = this.props.startWithFont;
                            this.updateState(displayName, theme, true);
                        } else {
                            this.getFontDisplayNameByFamily(theme.family)
                                .then((displayName)=> {
                                    this.updateState(displayName, theme, true);
                                });
                        }
                    });
            });

        },
        updateState: function (displayName, theme, shouldBroadcastChange) {
            this.setState({
                displayName: displayName,
                fontStyle: theme
            }, ()=> {
                // if change is from the editor you shouldn't update ui lib and set editor param.
                if (shouldBroadcastChange) {
                    Wix.Styles.setFontParam(this.props['wix-param'], {value: theme});
                    Wix.Styles.setUILIBParamValue('fonts', this.props['wix-param'], theme);
                }
            });
        },
        getThemeWithOverrides: function () {
            return new Promise((resolve) => {
                this.getBaseTheme()
                .then((baseTheme)=> {
                    var theme = _.cloneDeep(this.state.initialOverrides);
                    _.defaultsDeep(theme, baseTheme);
                    var themeWithOverrides = {
                        family: theme.fontFamily,
                        displayName: theme.displayName,
                        style: theme.style,
                        size: _.isString(theme.size) ? theme.size.replace('px', '') : theme.size,
                        preset: this.state.hasOverrides ? 'Custom' : theme.baseThemeKey,
                        editorKey: theme.editorKey,
                        fontStyleParam: true
                    };

                    if (theme.startWithFont) {
                        this.getEditorFonts()
                            .then((editorFonts)=> {
                                var fontObj = _.find(editorFonts, {displayName: theme.startWithFont});
                                //TO-DO add a unit that checks that if fontObj has no fontFamily get it from the theme
                                themeWithOverrides.family = _.get(fontObj, 'fontFamily', theme.fontFamily);
                                resolve(themeWithOverrides);
                            })
                    } else {
                        resolve(themeWithOverrides);
                    }
                });
            });
        },
        getSavedWixParamValue: function () {
            return new Promise((resolve, reject) => {
                var wixParam = this.props['wix-param'];
                Wix.Styles.getStyleParams((styleParams)=> {
                    var wixParamValue = _.get(styleParams, 'fonts[' + wixParam + ']');
                    if (wixParamValue) {
                        return resolve(wixParamValue);
                    }
                    reject();
                });
            });
        },
        getBaseTheme: function () {
            return new Promise((resolve, reject)=> {
                var baseThemeKey, baseTheme;
                Wix.Styles.getSiteTextPresets((textPresets)=> {
                    baseThemeKey = _.findKey(textPresets, {editorKey: this.props.startWithTheme});
                    baseThemeKey = baseThemeKey || _.findKey(textPresets, {editorKey: DEFAULT_THEME});
                    baseTheme = textPresets[baseThemeKey];
                    if (baseTheme) {
                        baseTheme.baseThemeKey = baseThemeKey;
                        baseTheme.style = {
                            bold: baseTheme.weight === 'bold',
                            italic: baseTheme.style === 'italic',
                            underline: false
                        };
                        return resolve(baseTheme);
                    }
                    reject();
                })
            })
        },
        getInitialOverrides: function () {
            var overrides = {};
            if (this.props.startWithFont) {
                overrides.startWithFont = this.props.startWithFont;
            }
            if (this.props.startWithSize) {
                overrides.size = this.props.startWithSize;
            }
            if (this.props.startWithStyle) {
                overrides.style = this.props.startWithStyle;
            }
            return overrides;
        },
        getFontDisplayNameByFamily: function (family) {
            return new Promise((resolve)=> {
                this.getEditorFonts()
                .then((editorFonts)=> {
                    var fontObj = _.find(editorFonts, {fontFamily: family});
                    resolve(_.get(fontObj, 'displayName'));
                });
            });
        },
        getEditorFonts: function () {
            return new Promise((resolve)=> {
                Wix.Styles.getEditorFonts((editorFonts)=>{
                    var fonts = [];
                    _.forEach(editorFonts, (fontLangArray)=>{
                        fonts = fonts.concat(fontLangArray.fonts);
                    });
                    resolve(fonts);
                });
            });
        },
        onFontClick: function (event) {
            var title = this.props.showDefaultPanelTitle ? '' : this.props.title;
            Wix.Styles.openFontPicker({
                title: title,
                left: event.clientX,
                top: event.clientY,
                wixParam: this.props['wix-param'],
                hideStyle: this.props.hideStyle,
                hideFont: this.props.hideFont,
                hideSize: this.props.hideSize,
                hideTheme: this.props.hideTheme,
                fontMinSize: this.props.fontMinSize,
                fontMaxSize: this.props.fontMaxSize
            }, this.onFontChange);
        },
        onFontChange: function (newStyle) {
            if (this.props.onChange) {
                this.props.onChange(newStyle.fontParam);
            }
            if (this.props.hideTheme) {
                this.getFontDisplayNameByFamily(newStyle.fontParam.family)
                .then((displayName)=>{
                    this.updateState(displayName, newStyle.fontParam);
                });
            } else {
                var displayName = newStyle.fontParam.displayName || 'Custom';
                this.updateState(displayName, newStyle.fontParam);
            }

            Wix.Styles.setUILIBParamValue('fonts', this.props['wix-param'], newStyle.fontParam);
        },
        getValue: function () {
            return this.state.fontStyle;
        }
    };
});
