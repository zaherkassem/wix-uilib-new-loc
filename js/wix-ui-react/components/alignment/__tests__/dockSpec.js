define(['react', 'wix-ui-react/components/alignment/dock'], function (React, dock) {

    describe('dock test', function () {

        var testUtils = React.addons.TestUtils;

        function getComp(props) {
            var elem = React.createElement(dock, props);
            return testUtils.renderIntoDocument(elem);
        }

        it('should load module', function () {
            expect(dock).toBeDefined();
        });

        it('should have initial value', function() {
            var comp = getComp();
            expect(comp.state.value).toEqual('TOP');
        });

        it('should set initial value from defaultValue', function() {
            var comp = getComp({defaultValue: 'TOP_RIGHT'});
            expect(comp.state.value).toEqual('TOP_RIGHT');
        });

        it('should change value upon handleChange', function() {
            var comp = getComp({defaultValue: 'TOP_RIGHT'});
            comp.handleChange('TOP');
            expect(comp.state.value).toEqual('TOP');
        });

        it('should call onChange upon handleChange if defined', function() {
            var comp = getComp({defaultValue: 'TOP_RIGHT', onChange: jasmine.createSpy('onChange')});
            comp.handleChange('TOP');
            expect(comp.props.onChange).toHaveBeenCalledWith('TOP_CENTER');
        });

    });
});