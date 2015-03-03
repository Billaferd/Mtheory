pavlov.specify("Mtheory Cover Tests", function () {

    describe("Mtheory", function () {

        var foo;

        before(function () {});

        after(function () {});

        describe("MtheoryInterval", function () {

            given([3, 2], [2, 3], [7, 1], [5, 6]).
            it("Numerator and denominator should match input", function (numerator, denominator) {
                var interval = mtheory.interval(numerator, denominator);

                assert(interval.numerator).equals(numerator);
                assert(interval.denominator).equals(denominator);
            });

            given([6, 4], [4, 6], [14, 2], [10, 12]).
            it("Numerator and denominator should be simplified to half", function (numerator, denominator) {
                var interval = mtheory.interval(numerator, denominator);

                assert(interval.numerator).equals(numerator / 2);
                assert(interval.denominator).equals(denominator / 2);
            });


            given([3, 2], [2, 1], [1, 1]).
            it("Should give a correct decimal representation", function (numerator, denominator) {
                var interval = mtheory.interval(numerator, denominator);

                assert(interval.toDecimal()).equals(numerator / denominator);
            });

            given(1.0136432647705078).
            it("Should give a correct ratio from a decimal representation", function (ratio) {
                var interval = mtheory.interval.fromDecimal(ratio);

                assert(interval.numerator).equals(531441);
                assert(interval.denominator).equals(524288);
            });

            given(1).
            it("Should give a correct ratio from a decimal representation", function (ratio) {
                var interval = mtheory.interval.fromDecimal(ratio);

                assert(interval.numerator).equals(1);
                assert(interval.denominator).equals(1);
            });

            given(23.46001038464901).
            it("Should give a correct ratio from cents", function (cents) {
                var interval = mtheory.interval.fromCents(cents);

                assert(interval.numerator).equals(531441);
                assert(interval.denominator).equals(524288);
            });
        });
    });
});
