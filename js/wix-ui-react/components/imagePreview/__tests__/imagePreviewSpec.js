define(['react', 'lodash', 'wix-ui-react/components/imagePreview/imagePreview'], function (React, _, imagePreview) {
    var testUtils = React.addons.TestUtils;

    function getComp(props) {
        var elem = React.createElement(imagePreview, props);
        return testUtils.renderIntoDocument(elem);
    }

    describe('imagePreview', function () {
        var onClickSpy = jasmine.createSpy('onClick');
        var simpleButton = {
            label: 'label',
            icon: 'icon',
            tooltip: 'tooltip',
            onClick: onClickSpy
        };
        var baseUIButton = {
            nonEmptyButtonLabel: 'label',
            emptyButtonLabel: 'label',
            nonEmptyButtonIcon: 'icon',
            emptyButtonIcon: 'icon',
            emptyButtonTooltip: 'tooltip',
            nonEmptyButtonTooltip: 'tooltip',
            onClick: onClickSpy
        };

        it('should load module', function () {
            expect(imagePreview).toBeDefined();
        });

        describe('setInitialValue', function () {
            it('should set state defaults for empty props', function () {
                var comp = getComp({});
                expect(comp.state).toEqual({
                    value: [],
                    buttons: []
                });
            });

            //TODO: react15
            it('should set value from props', function () {
                var props = {
                    value: [{
                        relativeUri: 'spotify:album:6oxVabMIqCMJRYN1GqR3Vf'
                    }]
                };
                var comp = getComp(props);
                expect(comp.state.value).toEqual(props.value);
            });
        });

        describe('getButtons', function () {
            it('should convert simplified button structure to baseUI image preview button structure', function () {
                var comp = getComp({
                    buttons: simpleButton
                });
                expect(comp.state.buttons).toEqual([baseUIButton])
            });

            it('should convert simplified buttons array structure to baseUI image preview button structure', function () {
                var comp = getComp({
                    buttons: [simpleButton, simpleButton]
                });
                expect(comp.state.buttons).toEqual([baseUIButton, baseUIButton])
            });

            it('should limit to only 2 buttons', function () {
                var comp = getComp({
                    buttons: [simpleButton, simpleButton, simpleButton, simpleButton]
                });
                expect(comp.state.buttons).toEqual([baseUIButton, baseUIButton])
            });
        });

        describe('componentWillReceiveProps', function () {
            describe('value change', function () {

                it('should invoke props.onChange on value change', function () {
                    var onChange = jasmine.createSpy('onChange');
                    var comp = getComp({
                        onChange: onChange
                    });
                    var nextProps = {
                        value: [{
                            relativeUri: 'relativeUri'
                        }]
                    };

                    comp.componentWillReceiveProps(nextProps);

                    expect(onChange).toHaveBeenCalledWith(nextProps.value);
                });

                it('should update comp state on value change', function () {
                    var comp = getComp({});
                    var nextProps = {
                        value: [{
                            relativeUri: 'relativeUri'
                        }]
                    };
                    spyOn(comp, 'setState').and.callFake(function (nextState) {
                        expect(nextState.value).toBe(nextProps.value);
                    });

                    comp.componentWillReceiveProps(nextProps);
                });
            });

            it('should update comp state on buttons change', function () {
                var comp = getComp({});
                var nextProps = {
                    buttons: simpleButton
                };
                spyOn(comp, 'setState').and.callFake(function (nextState) {
                    expect(nextState.buttons).toEqual([baseUIButton]);
                });

                comp.componentWillReceiveProps(nextProps);
            });
        });
    });
});
