(function mtheoryscope() {
    'use strict';

    var mtheory = {};

    function unique(arr) {
        var a = [],
            l = arr.length;
        for (var i = 0; i < l; i++) {
            for (var j = i + 1; j < l; j++)
                if (arr[i].toCents() === arr[j].toCents()) j = ++i;
            a.push(arr[i]);
        }
        return a;
    }

    // Taken from http://www.javascriptsource.com/math-related/gcd-lcm-calculator.html
    // Will be re-written for readability.
    function lcm(a, b) {
        var gcd = 1;
        if (a > b) {
            a = a + b;
            b = a - b;
            a = a - b;
        }
        if ((b == (Math.round(b / a)) * a)) {
            gcd = a
        } else {
            for (var i = Math.round(a / 2); i > 1; i = i - 1) {
                if ((a == (Math.round(a / i)) * i))
                    if ((b == (Math.round(b / i)) * i)) {
                        gcd = i;
                        i = -1;
                    }
            }
        }
        return gcd;
    }

    // Taken from http://rosettacode.org/wiki/Greatest_common_divisor#JavaScript
    // Will be re-written for readability
    function gcd(a, b) {
        if (a < 0) {
            a = -a;
        }
        if (b < 0) {
            b = -b;
        }
        if (b > a) {
            var temp = a;
            a = b;
            b = temp;
        }
        while (true) {
            a %= b;
            if (a === 0) {
                return b;
            }
            b %= a;
            if (b === 0) {
                return a;
            }
        }
    }

    function fromCents(cents) {
        return fromDecimal(Math.pow(2, cents / 1200));
    }

    // Taken from https://stackoverflow.com/questions/14002113/how-to-get-lowest-possible-fraction-for-a-decimal
    // Will be re-written for readability.
    function fromDecimal(x0) {
        //TODO: Adjust epsilon based on number of decimal places in a number.
        // E-17 is a nice medium but can cause wierdness with some numbers. Should adjust itself for maximum accuracy / precision.
        // epsilon should have rules base^(-k) where k is the total number of digits in the pattern after the decimal
        //  OR total number of digits after the decimal if a pattern is not detected.
        // ex. 1.123123123 would give an epsilon of 3.
        // ex. 1.123124125 would give an epsilon of 9.
        var eps = 1.0E-13,
            h, h1, h2, k, k1, k2, a, x;

        x = x0;
        a = Math.floor(x);
        h1 = 1;
        k1 = 0;
        h = a;
        k = 1;

        while (x - a > eps * k * k) {
            x = 1 / (x - a);
            a = Math.floor(x);
            h2 = h1;
            h1 = h;
            k2 = k1;
            k1 = k;
            h = h2 + a * h1;
            k = k2 + a * k1;
        }

        return new MTheoryInterval(h, k);
    }

    mtheory.util = {}

    mtheory.util.gcd = function (a, b) {
        return gcd(a, b);
    }

    mtheory.util.lcm = function (a, b) {
        return lcm(a, b);
    }

    mtheory.scale = function (interval, tones) {
        return new MTheoryScale(interval, tones);
    }

    mtheory.interval = function (numerator, denominator) {
        return new MTheoryInterval(numerator, denominator);
    }

    mtheory.interval.fromDecimal = function (ratio) {
        return fromDecimal(ratio);
    }

    mtheory.interval.fromCents = function (ratio) {
        return fromCents(ratio);
    }

    function MTheoryInterval(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
        this.simplify();
    }

    MTheoryInterval.prototype = {
        simplify: function () {
            var res = gcd(this.numerator, this.denominator);
            this.numerator /= res;
            this.denominator /= res;
        },

        toString: function () {
            return this.numerator + '/' + this.denominator;
        },

        toDecimal: function () {
            return this.numerator / this.denominator;
        },

        toCents: function () {
            return +(Math.round(1200 * (Math.abs(Math.log2(this.numerator / this.denominator))) + "e+5") + "e-5");
        },

        multiply: function (interval) {
            var numerator = this.numerator * interval.numerator;
            var denominator = this.denominator * interval.denominator;
            return mtheory.interval(numerator, denominator);
        },

        divide: function (interval) {
            var numerator = this.numerator * interval.denominator;
            var denominator = this.denominator * interval.numerator;
            return mtheory.interval(numerator, denominator);
        },

        inverse: function () {
            return mtheory.interval.fromDecimal(2).divide(this);
        }
    };

    mtheory.MTheoryInterval = MTheoryInterval;

    function MTheoryScale(interval, tones) {
        this.octaves = 1;
        this.ratios = new Array();
        this.intervals = new Array();

        var currRatio = 1;

        this.ratios.push(mtheory.interval.fromDecimal(1));

        while (this.ratios.length < tones && currRatio != 2) {
            currRatio = currRatio * interval.toDecimal();

            var div = parseInt(currRatio);
            this.octaves += div - 1;
            currRatio /= div;

            var rat = mtheory.interval.fromDecimal(currRatio);

            this.ratios.push(rat);

            var tempRatios = new Array();

            this.ratios.forEach(function (element, index, array) {
                tempRatios.push(rat.divide(element));
            });

            this.intervals = this.intervals.concat(tempRatios);

            this.intervals = unique(this.intervals);
        }

        var oct = mtheory.interval.fromDecimal(2);

        this.ratios.push(oct);

        this.ratios.forEach(function (element, index, array) {
            tempRatios.push(oct.divide(element));
        });

        this.intervals = this.intervals.concat(tempRatios);

        this.ratios.sort(function (a, b) {
            return a.toDecimal() - b.toDecimal();
        });

        this.intervals = unique(this.intervals);

        this.intervals.sort(function (a, b) {
            return a.toDecimal() - b.toDecimal();
        });
    }

    mtheory.MTheoryScale = MTheoryScale;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = mtheory;
        }
        exports.mtheory = mtheory;
    } else if (typeof this !== 'undefined') {
        this.mtheory = mtheory;
    } else if (typeof window !== 'undefined') {
        window.mtheory = mtheory;
    }
}());
