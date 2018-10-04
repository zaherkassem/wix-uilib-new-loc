define(['react', 'symbols/data/symbols'], function (React, symbols) {

    describe('symbols test', function () {
        it('should create aliases for renames', function () {
            expect(symbols.PPOpenMonthlyArrow).toBe(symbols.playAnimation);
            expect(symbols.infoSmall).toBe(symbols.info);
            expect(symbols.mobileCompWithLink).toBe(symbols.link);
        })
    });
});