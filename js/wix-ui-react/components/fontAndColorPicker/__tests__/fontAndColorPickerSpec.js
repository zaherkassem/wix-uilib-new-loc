define(['react', 'lodash', 'wix-ui-react/components/fontAndColorPicker/fontAndColorPicker'], function (React, _, fontAndColorPicker) {
    'use strict';

    var testUtils = React.addons.TestUtils;

    describe('fontAndColorPicker', function () {

        function getComp(props) {
            var elem = React.createElement(fontAndColorPicker, props);
            return testUtils.renderIntoDocument(elem);
        }

        beforeEach(function () {
            spyOn(Wix.Utils, 'getViewMode').and.returnValue('editor');
            spyOn(Wix.Styles, 'setFontParam');
            spyOn(Wix.Styles, 'setUILIBParamValue');
            spyOn(Wix.Styles, 'getSiteTextPresets').and.callFake(function (callback) {
                callback({
                    'Title': {
                        editorKey: 'font_0',
                        displayName: 'Site Title'
                    }
                });
            });
        });

        it('should render the color picker', function () {
            var comp = getComp();
            expect(comp.refs.colorPicker).toBeDefined();
        });

        it('should render the font picker', function () {
            var comp = getComp();
            expect(comp.refs.fontPicker).toBeDefined();
        });

        describe('infoIcon', function () {
            it('should render info icon if title && infoTitle is passed in props ', function () {
                var comp = getComp({
                    title: 'title',
                    infoTitle: 'infoTitle'
                });
                var info = testUtils.scryRenderedDOMComponentsWithClass(comp, 'info-icon');
                expect(info.length).toBe(1);
            });

            it('should render info icon if title && infoText is passed in props ', function () {
                var comp = getComp({
                    title: 'title',
                    infoText: 'infoText'
                });
                var info = testUtils.scryRenderedDOMComponentsWithClass(comp, 'info-icon');
                expect(info.length).toBe(1);
            });

            it('should not render info icon if title is not passed in props ', function () {
                var comp = getComp({
                    infoTitle: 'infoTitle',
                    infoText: 'infoText'
                });
                var info = testUtils.scryRenderedDOMComponentsWithClass(comp, 'info-icon');
                expect(info.length).toBe(0);
            });
        });

        xit('getValue should return an object with the selected font and color', function () {
            // TODO: fix that test
            var styleParam = {
                fonts: {
                    'wix-param-font': {
                        displayName: 'name'
                    }
                }
            };
            spyOn(Wix.Styles, 'getStyleParams').and.callFake(function (callback) {
                callback(styleParam);
            });
            var props = {
                startWithColor: 'color-1',
                'wix-param-font': 'wix-param'
            };
            var comp = getComp(props);
            expect(comp.getValue()).toEqual({
                font: styleParam.fonts['wix-param-font'],
                color: {
                    alpha: 1,
                    color: '',
                    name: 'color-1'
                }
            });
        });

    });

});
