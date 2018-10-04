define(['react', 'lodash', 'wix-ui-react/components/fontPicker/fontPickerMixin'], function (React, _, fontPickerMixin) {
    describe('fontPickerMixin', function () {
        beforeEach(function () {
            fontPickerMixin.props = {
                'wix-param': 'wix-param'
            };
            fontPickerMixin.state = {
                fontStyle: {}
            };
        });

        describe('onFontClick', function () {
            describe('call Wix.Styles.openFontPicker', function () {
                it('params.hideStyle should be falsy', function (done) {
                    spyOn(Wix.Styles, 'openFontPicker').and.callFake(function (params, cb) {
                        expect(params.hideStyle).toBeFalsy();
                        done();
                    });
                    fontPickerMixin.onFontClick({
                        clientX: 0,
                        clientY: 0
                    });
                });

                it('params.hideStyle should be truthy', function (done) {
                    fontPickerMixin.props.hideStyle = true;
                    spyOn(Wix.Styles, 'openFontPicker').and.callFake(function (params, cb) {
                        expect(params.hideStyle).toBeTruthy();
                        done();
                    });
                    fontPickerMixin.onFontClick({
                        clientX: 0,
                        clientY: 0
                    });
                });
            });
        });
    });
});
