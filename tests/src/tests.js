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

        });
    });
});
