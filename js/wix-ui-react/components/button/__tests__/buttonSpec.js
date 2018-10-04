define(['react', 'lodash', 'wix-ui-react/components/button/button'], function (React, _, button) {
    var testUtils = React.addons.TestUtils;

    function getComp(props) {
        var elem = React.createElement(button, props);
        return testUtils.renderIntoDocument(elem);
    }

    describe('button', function () {
        it('should add arrowLeftSmall as icon if className contains btn-back', function () {
            var comp = getComp({className: 'btn-back'});
            expect(comp.getProps().icon).toBe('arrowLeftSmall');
        });
        it('should keep supplied icon if given even when className contains btn-back', function () {
            var comp = getComp({className: 'btn-back', icon: 'myIcon'});
            expect(comp.getProps().icon).toBe('myIcon');
        });
        it('shouldn\'t add any icon if className not contains btn-back', function () {
            var comp = getComp({className: 'btn-danger-primary'});
            expect(comp.getProps().icon).toBeUndefined();
        });
    });
});
