define(['react', 'wix-ui-react/components/switches/toggleButtonsGroup'], function (React, toggleButtonsGroup) {

    describe('toggleButtonsGroup test', function () {
        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(toggleButtonsGroup, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(toggleButtonsGroup).toBeDefined();
        });

        it('should set initial value from defaultValue', function() {
            var comp = getComp({defaultValue: [1,2]});
            expect(comp.state.checked).toEqual([1,2]);
        });

        it('should set initial value to [] when no defaultValue given', function() {
            var comp = getComp({});
            expect(comp.state.checked).toEqual([]);
        });

        it('should toggle value upon when handleChange was called', function(done) {
            var comp = getComp({defaultValue: [1]});
            var originalSetState = comp.setState.bind(comp);
            spyOn(comp, 'setState').and.callFake(function (nextState, originalStateReady) {
                originalSetState(nextState, function () {
                    if (_.isFunction(originalStateReady)){
                        originalStateReady();
                    }
                    expect(comp.state.checked).toEqual([]);
                    done();
                })
            });
            comp.handleChange(1);
        });
    });
});
