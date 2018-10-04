define(['react', 'lodash', 'wix-ui-react/components/fontPicker/fontPicker'], function (React, _, fontPicker) {
    describe('fontPicker', function () {

        var testUtils = React.addons.TestUtils;

        beforeEach(function () {
            spyOn(Wix.Styles, 'getSiteTextPresets').and.callFake(function (callback) {
                callback({
                    'Body-L': {
                        editorKey: 'font_0',
                        displayName: 'font0'
                    },
                    'Body-M': {
                        editorKey: 'font_2',
                        displayName: 'font2',
                        style: {
                            italic: false,
                            bold: false,
                            underline: false
                        },
                        fontFamily: 'fontFamily',
                        size: 'size'
                    },
                    'Body-X': {
                        editorKey: 'font_14',
                        displayName: 'font14'
                    }
                });
            });

            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'setUILIBParamValue');
            spyOn(Wix.Styles, 'setFontParam');
            spyOn(Wix.Styles, 'getEditorFonts').and.callFake((callback)=>{
                callback([
                    {fonts: [{
                        fontFamily: 'family',
                        displayName: 'displayName'
                    }]}
                ]);
            });
        });

        function getComp(props) {
            var elem = React.createElement(fontPicker, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(fontPicker).toBeDefined();
        });

        it('should set initial displayName to nothing', function () {
            var comp = getComp({startWithTheme: 'font_14'});

            expect(comp.state.displayName).toEqual('');
        });

        it('should set initial value according to wix-param in case it is given', function (done) {
            var styleParam = {
                fonts: {
                    'wix-param': {
                        displayName: 'displayName'
                    }
                }
            };
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(function (callback) {
                callback(styleParam);
            });

            var comp = getComp({'wix-param': 'wix-param'});
            comp.componentDidMount();
            setTimeout(()=>{
                expect(comp.state.displayName).toEqual('displayName');
                done();
            });
        });

        it('should set initial displayName according to startWithTheme prop preset in case style param is empty', function (done) {
            var styleParam = {
                fonts: {
                    'wix-param': {
                        displayName: null,
                        preset: 'theme_preset'
                    }
                }
            };

            spyOn(Wix.Styles, 'getStyleParams').and.callFake(function (callback) {
                callback(styleParam);
            });

            var comp = getComp({startWithTheme: 'font_0', 'wix-param': 'wix-param'});
            comp.componentDidMount();
            setTimeout(()=>{
                expect(comp.state.displayName).toEqual(styleParam.fonts['wix-param'].preset);
                done();
            });

        });

        describe('when wix-param doesn\'t exist in styleParams', function () {

            beforeEach(function () {
                spyOn(Wix.Styles, 'getStyleParams').and.callFake(function (callback) {
                    callback();
                });
            });

            it('should set displayName to startWithTheme if given', function (done) {
                var comp = getComp({startWithTheme: 'font_14', 'wix-param': 'wix-param'});
                comp.componentDidMount();
                setTimeout(()=>{
                    expect(comp.state.displayName).toEqual('font14');
                    done();
                });
            });

            it('should set displayName to default value if startWithTheme is not given', function (done) {
                var comp = getComp({'wix-param': 'wix-param'});
                comp.componentDidMount();
                setTimeout(()=>{
                    expect(comp.state.displayName).toEqual('font2');
                    expect(comp.state.fontStyle.style).toEqual({
                        italic: false,
                        bold: false,
                        underline: false
                    });
                    expect(comp.state.fontStyle.displayName).toEqual('font2');
                    expect(comp.state.fontStyle.family).toEqual('fontFamily');
                    expect(comp.state.fontStyle.size).toEqual('size');
                    done();
                });
            });

            it('should set value to default value if startWithTheme is incorrect', function (done) {
                var comp = getComp({startWithTheme: 'TEST', 'wix-param': 'wix-param'});
                comp.componentDidMount();
                setTimeout(()=>{
                    expect(comp.state.displayName).toEqual('font2');
                    done();
                });
            });

            it('should update editor and ui lib', function (done) {
                var fontParam = {
                    family: 'fontFamily',
                    editorKey: 'font_2',
                    displayName: 'font2',
                    style: {
                        bold: false,
                        italic: false,
                        underline: false
                    },
                    size: 'size',
                    preset: 'Body-M',
                    fontStyleParam: true
                };

                var comp = getComp({'wix-param': 'wix-param'});
                comp.componentDidMount();
                setTimeout(()=>{
                    expect(Wix.Styles.setFontParam).toHaveBeenCalledWith('wix-param', {
                        value: fontParam
                    });
                    expect(Wix.Styles.setUILIBParamValue).toHaveBeenCalledWith('fonts', 'wix-param', fontParam);
                    done();
                });
            });
        });

        describe('onFontClick', function () {
            var style = {
                fontParam: {}
            };
            var styleParam = {
                fonts: {
                    'someParam': {
                        displayName: 'displayName',
                        editorKey: 'font_14'
                    }
                }
            };
            beforeEach(() => {
                spyOn(Wix.Styles, 'openFontPicker').and.callFake(function (obj, callback) {
                    callback(style);
                });
                spyOn(Wix.Styles, 'getStyleParams').and.callFake(function (callback) {
                    callback(styleParam);
                });

            });

            it('shuold call Wix.Styles.openFontPicker', function () {
                var expected = {
                    title: 'title',
                    left: 10,
                    top: 11,
                    wixParam: 'someParam',
                    hideStyle: undefined,
                    hideFont: undefined,
                    hideSize: undefined,
                    hideTheme: undefined,
                    fontMinSize: undefined,
                    fontMaxSize: undefined
                };

                var comp = getComp({'wix-param': 'someParam', title: 'title'});
                comp.onFontClick({
                    clientX: 10,
                    clientY: 11
                });
                expect(Wix.Styles.openFontPicker).toHaveBeenCalledWith(expected, jasmine.any(Function));
            });
        });

        describe('onFontChange', function () {
            var newStyle = {
                fontParam: {
                    displayName: 'callbackStyleDisplayName',
                    preset: 'callbackStylePreset'
                }
            };

            it('should invoke onChange if exist', function () {
                var onChange = jasmine.createSpy('onChange');
                var comp = getComp({'wix-param': 'someParam', onChange: onChange});
                comp.onFontChange(newStyle);
                expect(onChange).toHaveBeenCalledWith(newStyle.fontParam);
            });

            it('should call Wix.Styles.setUILIBParamValue with the new style', function () {
                var onChange = jasmine.createSpy('onChange');
                var wixParam = 'someParam';
                var comp = getComp({'wix-param': wixParam, onChange: onChange});
                comp.onFontChange(newStyle);
                expect(Wix.Styles.setUILIBParamValue).toHaveBeenCalledWith('fonts', wixParam, newStyle.fontParam);
            });

            it('should set displayName to the new preset from openFontPicker callback if exist', function (done) {
                var comp = getComp({'wix-param': 'param'});
                comp.onFontChange(newStyle);
                setTimeout(()=>{
                    expect(comp.state.displayName).toEqual(newStyle.fontParam.displayName);
                    done();
                }, 0);
            });

            it('should set displayName to "Custom" if newStyle.fontParam.preset doesn\'t exist', function (done) {
                var newStyle = {
                    fontParam: {
                        preset: undefined
                    }
                };
                var comp = getComp({'wix-param': 'param'});
                comp.onFontChange(newStyle);
                setTimeout(()=>{
                    expect(comp.state.displayName).toEqual('Custom');
                    done();
                }, 0);
            });

            describe('hideTheme', function () {
                it('should set displayName to according to newStyle.fontParam.family', function (done) {
                    var newStyle = {
                        fontParam: {
                            family: 'family'
                        }
                    };
                    var comp = getComp({'wix-param': 'param', hideTheme: true});
                    comp.onFontChange(newStyle);
                    setTimeout(()=>{
                        expect(comp.state.displayName).toEqual('displayName');
                        done();
                    });
                });
            });
        });
    });
});
