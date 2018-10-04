define(['react', 'lodash', 'wix-ui-react/components/switches/toggle'], function (React, _, toggle) {

    describe('toggle test', function () {

        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(toggle, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(toggle).toBeDefined();
        });

        it('should set initial value from defaultValue', function() {
            var comp = getComp({defaultValue: true});
            expect(comp.state.checked).toBeTruthy();
        });

        it('should set initial value to false in case no defaultValue given', function() {
            var comp = getComp({});
            expect(comp.state.checked).toBeFalsy();
        });

        it('should change value when handleChange was called', function(done) {
            var comp = getComp({});
            var originalSetState = comp.setState;
            spyOn(comp, 'setState').and.callFake(function (nextState) {
                originalSetState.call(comp, nextState, function () {
                    expect(comp.state.checked).toBeTruthy();
                    done();
                })
            });

            comp.handleChange(true);
        });

        it('should call onChange upon handleChange', function() {
            var comp = getComp({onChange: jasmine.createSpy('onChange')});
            comp.handleChange(true);
            expect(comp.props.onChange).toHaveBeenCalledWith(true);
        });

        describe('setValue', function () {
            it('should change comp checked value to be true', function () {
                var comp = getComp({defaultValue: false});
                spyOn(comp, 'setState').and.callFake(function (nextState) {
                    expect(nextState.checked).toBe(true);
                });
                comp.setValue(true);

            });

            it('should change comp checked value to be true', function () {
                var comp = getComp({defaultValue: true});
                spyOn(comp, 'setState').and.callFake(function (nextState) {
                    expect(nextState.checked).toBe(false);
                });
                comp.setValue(false);
            });

            it('should ignore calls with non boolean parameter', function () {
                var comp = getComp({defaultValue: true});
                spyOn(comp, 'setState');
                comp.setValue(0);
                expect(comp.setState).not.toHaveBeenCalled();
            });
        });

    });
});
