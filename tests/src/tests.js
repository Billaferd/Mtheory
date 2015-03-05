pavlov.specify("Mtheory Cover Tests", function () {

    describe("Mtheory", function () {

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

            given([1, 1, 2, 1], [2, 3, 2, 1], [1, 7, 2, 1]).
            it("Should return a proper numerator and denominator after multiplication.", function (n1, d1, n2, d2) {
                var interval = mtheory.interval(n1, d1);
                var interval2 = mtheory.interval(n2, d2);

                var interval3 = interval.multiply(interval2);

                assert(interval3.numerator).equals(n1 * n2);
                assert(interval3.denominator).equals(d1 * d2);
            });

            given([1, 1, 2, 1], [1, 3, 1, 2], [1, 7, 2, 1]).
            it("Should return a proper numerator and denominator after division.", function (n1, d1, n2, d2) {
                var interval = mtheory.interval(n1, d1);
                var interval2 = mtheory.interval(n2, d2);

                var interval3 = interval.divide(interval2);

                assert(interval3.numerator).equals(n1 * d2);
                assert(interval3.denominator).equals(d1 * n2);
            });

            given(100, 500, 700, 600).
            it("Should give the musical inverse of the interval.", function (cents) {
                var interval = mtheory.interval.fromCents(cents);
                var interval2 = interval.inverse();
                assert(interval2.toCents()).equals(1200 - cents);
            });
        });

        describe("MtheoryScale", function () {
            given([mtheory.interval(3, 2), 12], [mtheory.interval.fromCents(700), 12]).
            it("Should pass through 7 octaves", function (interval, tones) {
                var scale = mtheory.scale(interval, tones);
                assert(scale.octaves).equals(7);
            });

            given([mtheory.interval(3, 2), 12], [mtheory.interval.fromCents(700), 12]).
            it("Should have 12 tones defined plus the octave.", function (interval, tones) {
                var scale = mtheory.scale(interval, tones);
                assert(scale.ratios.length).equals(tones + 1);
            });

            it("Should have 13 steps of 100 cents.", function (interval, tones) {
                var scale = mtheory.scale(mtheory.interval.fromCents(700), 12);

                scale.ratios.forEach(function (element, index, array) {
                    assert(element.toCents()).equals(index * 100);
                });
            });

            it("Should have 13 intervals that are 100 cents apart.", function (interval, tones) {
                var scale = mtheory.scale(mtheory.interval.fromCents(700), 12);

                scale.intervals.forEach(function (element, index, array) {
                    assert(element.toCents()).equals(index * 100);
                });
            });
        });

        describe("MtheoryUtil", function () {
            given([3, 6], [1, 2], [5, 15]).
            it("Should return the greatest common divisor.", function (a, b) {
                var c = mtheory.util.gcd(a, b);

                assert(c).equals(a);
            });

            given([5, 15], [20, 25]).
            it("Should return the least common multiple.", function (a, b) {
                var c = mtheory.util.lcm(a, b);

                assert(c).equals(5);
            });

            given([2, 1], [1, 2]).
            it("Should return the least common multiple.", function (a, b) {
                var c = mtheory.util.lcm(a, b);

                assert(c).equals(1);
            });

            given([2, 6], [6, 2]).
            it("Should return the least common multiple.", function (a, b) {
                var c = mtheory.util.lcm(a, b);

                assert(c).equals(2);
            });
        });
    });
});
