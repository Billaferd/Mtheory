(function mtheoryscope() {
    'use strict';

    var mtheory = {};

    function gcd(a, b) {
        if (a < 0) { a = -a; }
        if (b < 0) { b = -b; }
        if (b > a) { var temp = a; a = b; b = temp; }
        while (true) {
            a %= b;
            if (a === 0) { return b; }
            b %= a;
            if (b === 0) { return a; }
        }
    }

    function fromCents(cents) {
        return fromDecimal(Math.pow(2, cents / 1200));
    }

    function fromDecimal(x0) {
        var eps = 1.0E-15, h, h1, h2, k, k1, k2, a, x;

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
            return 1200 * (Math.abs(Math.log2(this.numerator / this.denominator)));
        }
    };

    mtheory.MTheoryInterval = MTheoryInterval;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) { exports = module.exports = mtheory; }

        exports.mtheory = mtheory;
    } else if (typeof this !== 'undefined') { this.mtheory = mtheory; } else if (typeof window !== 'undefined') { window.mtheory = mtheory; }

}());
