define([
    'react-dom',
    'react',
    'lodash',
    'Wix',
    'wix-ui-react/components/colorSpace/colorPickerMixin'
], function(ReactDOM, React, _, Wix, colorPickerMixin) {

    var getMixin = function (props, state) {
        return _.defaultsDeep(_.clone(colorPickerMixin), {
            props: props || {},
            state: state || {},
            setState: jasmine.createSpy('setStateSpy').and.callFake(function (obj, callback) {
                if (callback) {
                    callback();
                }
            }),
            isMounted: function () {
                return true;
            }
        });
    };

    describe('colorPickerMixin', function () {
        const DEFAULT_OPACITY = 1;
        const DEFAULT_STANDALONE_COLOR = '#3D9BE9';

        var rgbaColor = 'rgba(100,100,100,0.6)';
        var rgbaColorObj = {
            value: rgbaColor,
            reference: 'color-21',
            name: 'color_31'
        };

        var siteColorsMock = [
            {
                "name": "color_1",
                "value": "#FFFFFF",
                "reference": "white/black"
            },
            {
                "name": "color_2",
                "value": "#000000",
                "reference": "black/white"
            },
            {
                "name": "color_3",
                "value": "#ED1C24",
                "reference": "primery-1"
            },
            {
                "name": "color_4",
                "value": "#0088CB",
                "reference": "primery-2"
            },
            {
                "name": "color_5",
                "value": "#FFCB05",
                "reference": "primery-3"
            },
            {
                "name": "color_11",
                "value": "#FFFFFF",
                "reference": "color-1"
            },
            {
                "name": "color_12",
                "value": "#CCCCCC",
                "reference": "color-2"
            },
            {
                "name": "color_13",
                "value": "#A0A09F",
                "reference": "color-3"
            },
            {
                "name": "color_14",
                "value": "#605E5E",
                "reference": "color-4"
            },
            {
                "name": "color_15",
                "value": "#2F2E2E",
                "reference": "color-5"
            },
            {
                "name": "color_16",
                "value": "#BAE9FF",
                "reference": "color-6"
            },
            {
                "name": "color_17",
                "value": "#97DEFF",
                "reference": "color-7"
            },
            {
                "name": "color_18",
                "value": "#30BDFF",
                "reference": "color-8"
            },
            {
                "name": "color_19",
                "value": "#207EA9",
                "reference": "color-9"
            },
            {
                "name": "color_20",
                "value": "#103F54",
                "reference": "color-10"
            },
            {
                "name": "color_21",
                "value": "#B6E8E3",
                "reference": "color-11"
            },
            {
                "name": "color_22",
                "value": "#8DD1CA",
                "reference": "color-12"
            },
            {
                "name": "color_23",
                "value": "#41BAAE",
                "reference": "color-13"
            },
            {
                "name": "color_24",
                "value": "#2B7C74",
                "reference": "color-14"
            },
            {
                "name": "color_25",
                "value": "#163E3A",
                "reference": "color-15"
            },
            {
                "name": "color_26",
                "value": "#F4C0AF",
                "reference": "color-16"
            },
            {
                "name": "color_27",
                "value": "#E99F86",
                "reference": "color-17"
            },
            {
                "name": "color_28",
                "value": "#DE5021",
                "reference": "color-18"
            },
            {
                "name": "color_29",
                "value": "#943616",
                "reference": "color-19"
            },
            {
                "name": "color_30",
                "value": "#4A1B0B",
                "reference": "color-20"
            },
            rgbaColorObj,
            {
                "name": "color_32",
                "value": "#E9DB89",
                "reference": "color-22"
            },
            {
                "name": "color_33",
                "value": "#DEC328",
                "reference": "color-23"
            },
            {
                "name": "color_34",
                "value": "#94821B",
                "reference": "color-24"
            },
            {
                "name": "color_35",
                "value": "#4A410D",
                "reference": "color-25"
            }
        ];
        var styleParamsMock = {
            "colors": {},
            "numbers": {},
            "booleans": {},
            "fonts": {},
            "googleFontsCssUrl": ""
        };

        function getColorNameByRef (siteColors, reference) {
            return _.result(_.find(siteColors, {reference: reference}), 'name') || '';
        }

        beforeAll(function () {
            spyOn(Wix.Styles, 'openColorPicker');
            spyOn(Wix.Styles, 'setUILIBParamValue');
            spyOn(Wix.Styles, 'setColorParam');
            spyOn(Wix.Styles, 'getSiteColors');
            spyOn(Wix.Styles, 'getStyleParams');
        });

        beforeEach(function () {
            Wix.Styles.getSiteColors.and.callFake(function (callback) {
                callback(siteColorsMock)
            });
            Wix.Styles.getStyleParams.and.callFake(function (callback) {
                callback(styleParamsMock);
            });
            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
        });

        describe('getInitialState', function () {
            it('should start with default color', function () {
                var mixin = getMixin();
                expect(mixin.getInitialState.call(mixin)).toEqual({
                    colorData: {
                        alpha: 1,
                        color: '',
                        name: 'color-1'
                    }
                });
            });

            it('should start with the color & alpha supplied via props', function () {
                var props = {
                    startWithColor: 'color-10',
                    startWithOpacity: .5
                };
                var mixin = getMixin(props);
                expect(mixin.getInitialState.call(mixin)).toEqual({
                    colorData: {
                        alpha: props.startWithOpacity,
                        color: '',
                        name: props.startWithColor
                    }
                });
            });
        });

        describe('componentDidMount', function () {
            it('should register \'paletteChange\' event listener', function () {
                Wix.Utils.getViewMode.and.returnValue('standalone');
                var comp = getMixin();
                spyOn(comp, 'setComponentState');
                spyOn(document, 'addEventListener');
                comp.componentDidMount();
                expect(document.addEventListener).toHaveBeenCalledWith('paletteChange', comp.paletteChangeHandler, false);
            });

            describe('standalone implementation', function () {
                beforeEach(function () {
                    Wix.Utils.getViewMode.and.returnValue('standalone');
                });

                it('should set default initial value & opacity', function () {
                    var comp = getMixin();
                    spyOn(comp, 'setComponentState');
                    comp.componentDidMount();
                    expect(comp.setComponentState).toHaveBeenCalledWith(DEFAULT_OPACITY, DEFAULT_STANDALONE_COLOR, '');
                });

                it('should get initial value & opacity from props if supplied', function () {
                    var startWithColor = '#3D9BE9';
                    var startWithOpacity = .4;
                    var comp = getMixin({
                        startWithColor: startWithColor,
                        startWithOpacity: startWithOpacity
                    });
                    spyOn(comp, 'setComponentState');
                    comp.componentDidMount();
                    expect(comp.setComponentState).toHaveBeenCalledWith(startWithOpacity, startWithColor, '');
                    //expect(comp.setComponentState).toHaveBeenCalledWith(DEFAULT_OPACITY, siteColorsMock[0].value, siteColorsMock[0].name);
                });
            });

            describe('implemented in editor env', function () {
                var styleParamsWithMyColor = {
                    "colors": {
                        myColor: {
                            value: rgbaColorObj.value,
                            themeName: rgbaColorObj.reference
                        }
                    },
                    "numbers": {},
                    "booleans": {},
                    "fonts": {},
                    "googleFontsCssUrl": ""
                };

                beforeEach(function () {
                    Wix.Styles.getSiteColors.and.callFake(function (callback) {
                        callback(siteColorsMock);
                    });
                    Wix.Styles.getStyleParams.and.callFake(function (callback) {
                        callback(styleParamsWithMyColor);
                    });
                });

                it('should get saved color from saved styleParams if already setted', function () {
                    spyOn(Wix.Styles, 'getColorByreference').and.returnValue(rgbaColorObj);
                    var comp = getMixin({
                        'wix-param': 'myColor'
                    }, {
                        colorData: {
                            name: rgbaColorObj.reference
                        }
                    });
                    spyOn(comp, 'setComponentState').and.callFake(function (alpha, color, name, callback) {
                        expect(parseFloat(alpha)).toBe(parseFloat(comp.getAlphFromRgba(rgbaColor)));
                        expect(color).toBe(comp.rgb2hex(rgbaColor));
                        expect(name).toBe(rgbaColorObj.name);
                    });
                    comp.componentDidMount();
                });

                it('should get the color from the palette if not setted yet', function () {
                    var notSettedColor = _.find(siteColorsMock, {reference: "color-10"});
                    spyOn(Wix.Styles, 'getColorByreference').and.returnValue(notSettedColor);
                    var comp = getMixin({
                        'wix-param': 'not-setted-color'
                    }, {
                        colorData: {
                            name: 'color-10',
                            alpha: 1
                        }
                    });
                    spyOn(comp, 'updateStyleAndUiLib');
                    spyOn(comp, 'setComponentState').and.callFake(function (alpha, color, name, callback) {
                        expect(parseFloat(alpha)).toBe(comp.state.colorData.alpha);
                        expect(color).toBe(notSettedColor.value);
                        expect(name).toBe(getColorNameByRef(siteColorsMock, notSettedColor.reference));
                        callback();
                        expect(comp.updateStyleAndUiLib).toHaveBeenCalled();
                    });
                    comp.componentDidMount();
                });

                it('should handle hex color passed', function () {
                    var comp = getMixin({
                        startWithColor: '#123456'
                    }, {
                        colorData: {
                            alpha: 1
                        }
                    });
                    spyOn(comp, 'setComponentState');
                    comp.componentDidMount();

                    expect(comp.setComponentState).toHaveBeenCalledWith(1, '#123456', '', jasmine.any(Function));
                });
            });
        });

        describe('componentWillUnmount', function () {
            it('should remove paletteChange event listener', function () {
                var comp = getMixin();
                spyOn(document, 'removeEventListener');
                comp.componentWillUnmount();
                expect(document.removeEventListener).toHaveBeenCalledWith('paletteChange', comp.paletteChangeHandler, false);
            });
        });

        describe('openColorPicker', function () {
            var position = {
                top: 100,
                left: 100
            };
            var props = {
                'wix-param': 'wixParam'
            };
            var state = {
                colorData: {
                    color: {
                        rgba: 'rgba(0,1,2,1)',
                        name: 'color-1'
                    }
                }
            };
            var comp = getMixin(props, state);
            var onColorChange = jasmine.createSpy('onColorChange');
            it('should open editor color picker with the right arguments', function () {
                spyOn(ReactDOM, 'findDOMNode').and.returnValue({
                    getBoundingClientRect: function() {
                        return pos;
                    }
                });
                var pos = {
                    right: 100,
                    top:150
                };
                comp.openColorPicker(onColorChange, '', true, position);
                expect(Wix.Styles.openColorPicker).toHaveBeenCalledWith({
                    left: pos.right + 12,
                    top: pos.top,
                    wixParam: props['wix-param'],
                    color: state.colorData.color
                }, jasmine.any(Function));
            });
        });

        describe('onColorPickerResponse', function () {
            it('shuold trigger openColorPicker first argument', function () {
                spyOn(ReactDOM, 'findDOMNode').and.returnValue({
                    getBoundingClientRect: function () {
                        return {
                            top: 0,
                            right: 0
                        }
                    }
                });
                Wix.Styles.openColorPicker.and.callFake(function (params, callback) {
                    callback({
                        panelClose: {}
                    })
                });
                var closeSpy = jasmine.createSpy('onClose');
                var comp = getMixin({}, {
                    colorData: {color: ''}
                });
                comp.openColorPicker(closeSpy);
                expect(closeSpy).toHaveBeenCalled();
            });

            it('should handle palette change', function () {
                var colorsMock = "colorsMock";
                var comp = getMixin();
                spyOn(document, 'dispatchEvent').and.callFake(function (event) {
                    expect(event).toBeDefined();
                    expect(event.type).toBe("paletteChange");
                    expect(event.detail.colors).toEqual(colorsMock);
                });
                comp.onColorPickerResponse(_.noop, {
                    paletteChange: true,
                    colors: colorsMock
                });
            });


            it('should update comp state with new values', function () {
                var comp = getMixin({'wix-param': 'wixParam'}, {
                    colorData: {
                        alpha: 1
                    }
                });
                spyOn(comp, 'setComponentState');
                comp.onColorPickerResponse(_.noop, {
                    colorParam: {
                        value: '#abcdef',
                        themeName: 'color-2'
                    }
                });
                expect(comp.setComponentState).toHaveBeenCalledWith(1, '#abcdef', 'color-2');
            });

            it('should update ui lib with the new value', function () {
                var wixParam = 'wixParam';
                var rgbaColor = 'rgba(171,205,239,1)';
                var hexColor = '#abcdef';
                var themeName = 'color-2';
                var comp = getMixin({'wix-param': wixParam}, {
                    colorData: {
                        alpha: 1
                    }
                });
                spyOn(comp, 'setComponentState');
                comp.onColorPickerResponse(_.noop, {
                    colorParam: {
                        value: hexColor,
                        themeName: themeName
                    }
                });
                expect(Wix.Styles.setUILIBParamValue).toHaveBeenCalledWith('colors', wixParam, {
                    value: rgbaColor,
                    themeName: themeName
                });
            });

            it('should invoke onChange if exist', function () {
                var onChange = jasmine.createSpy('onChange');
                var color = '#123456';
                var opac = 0.7;
                var comp = getMixin({
                    'wix-param': 'wix-param',
                    onChange: onChange
                }, {
                    colorData: {
                        alpha: opac
                    }
                });
                spyOn(comp, 'setComponentState');
                comp.onColorPickerResponse(_.noop, {
                    colorParam: {
                        value: color,
                        themeName: 'color-1'
                    }
                });
                expect(onChange).toHaveBeenCalledWith({
                    color: color,
                    opacity: opac
                });
            });
        });

        describe('paletteChangeHandler', function () {
            var wixParam = 'wixParam';
            var onChange = jasmine.createSpy('onChange');
            var eventDetailsColor = {};
            var rgbaColor = 'rgba(171,205,239,1)';
            var hexColor = '#abcdef';
            var colorName = 'color_28';
            var themeName = 'color-18';

            eventDetailsColor[wixParam] = {
                "themeName": colorName,
                "value": hexColor
            };
            var comp = getMixin({
                'wix-param': wixParam,
                onChange: onChange
            }, {
                colorData: {
                    alpha: 1,
                    name: themeName
                }
            });

            beforeEach(function () {
                spyOn(comp, 'setComponentState');
            });

            it('shuold invoke onChange if supplied in props', function () {
                comp.paletteChangeHandler({
                    detail: {
                        colors: eventDetailsColor
                    }
                });
                expect(onChange).toHaveBeenCalled();
            });

            it('should update UI lib param value', function () {
                comp.paletteChangeHandler({
                    detail: {
                        colors: eventDetailsColor
                    }
                });
                expect(Wix.Styles.setUILIBParamValue).toHaveBeenCalledWith('colors', wixParam, {
                    value: rgbaColor,
                    themeName: themeName
                });
            });

            it('should update component state to use the right color from the updated palette', function () {
                comp.paletteChangeHandler({
                    detail: {
                        colors: eventDetailsColor
                    }
                });
                expect(comp.setComponentState).toHaveBeenCalledWith(1, hexColor, themeName);
            });
        });

        describe('updateStyleAndUiLib', function () {
            var wixParam = 'wixParam';
            var rgbaColor = 'rgba(171,205,239,1)';
            var hexColor = '#abcdef';
            var themeName = 'color-2';
            var opac = 1;

            var props = {
                'wix-param': wixParam
            };
            var state = {
                colorData: {
                    color: hexColor,
                    themeName: themeName,
                    alpha: opac
                }
            };
            var comp;
            beforeEach(function () {
                comp = getMixin(props, state);
            });

            it('should update ui lib value', function () {
                comp.updateStyleAndUiLib();
                expect(Wix.Styles.setUILIBParamValue).toHaveBeenCalledWith('colors', wixParam, {
                    value: rgbaColor,
                    themeName: themeName
                });
            });

            it('should update editor style value', function () {
                comp.updateStyleAndUiLib();
                expect(Wix.Styles.setColorParam).toHaveBeenCalledWith(wixParam, {
                    value: {
                        rgba: rgbaColor,
                        opacity: opac
                    }
                });
            });
        });

        describe('handleSlideEnd', function () {
            var comp;
            var onChange = jasmine.createSpy('onChange');
            beforeAll(function () {
                comp = getMixin({
                    'wix-param': 'wix-param',
                    onChange: onChange
                }, {
                    colorData: {
                        alpha: 1,
                        color: '#abcdef'
                    }
                });
                spyOn(comp, 'updateStyleAndUiLib');
            });

            it('should update editor param and UI lib component', function () {
                comp.handleSlideEnd();
                expect(comp.updateStyleAndUiLib).toHaveBeenCalled();
            });

            it('should invoke onChange if supplied', function () {
                comp.handleSlideEnd();
                expect(onChange).toHaveBeenCalled();
            })
        });

        describe('rgb2hex', function () {
            var comp = getMixin();
            it('should convert rgb color to hex color', function () {
                expect(comp.rgb2hex('rgb(255,255,255)')).toBe('#ffffff');
                expect(comp.rgb2hex('rgba(255,255,255,0.5)')).toBe('#ffffff');
                expect(comp.rgb2hex('rgb(0,0,0)')).toBe('#000000');
                expect(comp.rgb2hex('rgba(0,0,0,0.5)')).toBe('#000000');
                expect(comp.rgb2hex('rgb(0,0,255)')).toBe('#0000ff');
                expect(comp.rgb2hex('rgba(0,0,255,0.5)')).toBe('#0000ff');
            });
        });

        describe('convertHex', function () {
            var comp = getMixin();
            it('should convert hex color to rgb color', function () {
                expect(comp.convertHex('#ffffff', 1)).toBe('rgba(255,255,255,1)');
                expect(comp.convertHex('#ffffff', .5)).toBe('rgba(255,255,255,0.5)');
                expect(comp.convertHex('#000000', 1)).toBe('rgba(0,0,0,1)');
                expect(comp.convertHex('#000000', .5)).toBe('rgba(0,0,0,0.5)');
                expect(comp.convertHex('#0000ff', 1)).toBe('rgba(0,0,255,1)');
                expect(comp.convertHex('#0000ff', .5)).toBe('rgba(0,0,255,0.5)');
            });
        });

        describe('getAlphFromRgba', function () {
            var comp = getMixin();
            it('should get the alpha from rgba color', function () {
                expect(parseFloat(comp.getAlphFromRgba('rgba(255,255,255,0.5)'))).toBe(.5);
                // TODO: add more tests
            });
        });

        describe('setValue', function () {

            beforeEach(function () {
                this.props = {
                    'wix-param': 'myColor'
                };
                this.state = {
                    colorData: {
                        name: rgbaColorObj.name,
                        alpha: 1,
                        color: rgbaColorObj.value
                    }
                };

            });

            it('should set opacity if legal', function () {
                var comp = getMixin(this.props, this.state);

                comp.setValue({opacity: 0.5});
                expect(comp.setState).toHaveBeenCalledWith({
                    colorData: {
                        name: rgbaColorObj.name,
                        alpha: 0.5,
                        color: rgbaColorObj.value
                    }
                }, jasmine.any(Function));
            });

            it('should not set new opacity if illegal', function () {
                var comp = getMixin(this.props, this.state);

                comp.setValue({opacity: 2});
                expect(comp.setState).toHaveBeenCalledWith({
                    colorData: {
                        name: rgbaColorObj.name,
                        alpha: 1,
                        color: rgbaColorObj.value
                    }
                }, jasmine.any(Function));
            });

            it('should set color if legal (6 digit hexa color)', function () {
                var comp = getMixin(this.props, this.state);

                comp.setValue({color: '#FF69B4'});
                expect(comp.setState).toHaveBeenCalledWith({
                    colorData: {
                        name: '',
                        alpha: 1,
                        color: '#FF69B4'
                    }
                }, jasmine.any(Function));
            });

            it('should set color if legal rgb', function () {
                var comp = getMixin(this.props, this.state);

                comp.setValue({color: 'rgb(255,192,203)'});
                expect(comp.setState).toHaveBeenCalledWith({
                    colorData: {
                        name: '',
                        alpha: 1,
                        color: '#ffc0cb'
                    }
                }, jasmine.any(Function));
            });

            it('should not set new color if illegal', function () {
                var comp = getMixin(this.props, this.state);

                comp.setValue({color: 'FF69B4'});
                expect(comp.setState).toHaveBeenCalledWith({
                    colorData: {
                        name: rgbaColorObj.name,
                        alpha: 1,
                        color: rgbaColorObj.value
                    }
                }, jasmine.any(Function));
            });

            it('should set opacity and color if legal', function () {
                var comp = getMixin(this.props, this.state);

                comp.setValue({opacity: 0.5, color: '#FF69B4'});
                expect(comp.setState).toHaveBeenCalledWith({
                    colorData: {
                        name: '',
                        alpha: 0.5,
                        color: '#FF69B4'
                    }
                }, jasmine.any(Function));
            });
        });
    });
});
