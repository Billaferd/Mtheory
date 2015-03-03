pavlov.specify("Mtheory Cover Tests", function(){

    describe("Mtheory", function(){

        var foo;

        before(function(){
        });

        after(function(){
        });

        describe("MtheoryInterval", function(){

            it("Should have a numerator of 3", function () {
                var interval = mtheory.interval(3, 2);

                assert(interval.numerator).equals(3);
            });

            it("Should have a denominator of 2", function () {
                var interval = mtheory.interval(3, 2);

                assert(interval.denominator).equals(2);
            });

            given([3, 2], [2, 1], [1,1]).
            it("Should give a correct decimal representation", function(numerator, denominator) {
                var interval = mtheory.interval(numerator, denominator);

                assert(interval.toDecimal()).equals(numerator / denominator);
            });

            given([1.0136432647705078]).
            it("Should give a correct ratio from a decimal representation", function(ratio) {
                var interval = mtheory.interval.fromDecimal(ratio);

                assert(interval.numerator).equals(531441);
                assert(interval.denominator).equals(524288);
            });

            given([1]).
            it("Should give a correct ratio from a decimal representation", function(ratio) {
                var interval = mtheory.interval.fromDecimal(ratio);

                assert(interval.numerator).equals(1);
                assert(interval.denominator).equals(1);
            });

            given([23.46001038464901]).
            it("Should give a correct ratio from cents", function(cents) {
                var interval = mtheory.interval.fromCents(cents);

                assert(interval.numerator).equals(531441);
                assert(interval.denominator).equals(524288);
            });
        });
    });
});
