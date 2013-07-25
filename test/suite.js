var expect = require('chai').expect;

var identity = function (a) {
    return a;
};

var first = function (a, b, c) {
    return a;
};

var second = function (a, b, c) {
    return b;
};

var secondNonformal = function (a) {
    return arguments[1];
};

var sum = function (a, b) {
    return a + b;
};

var sumThree = function (a, b, c) {
    return a + b + c;
};

var sumThreeNonformal = function () {
    return arguments[0] + arguments[1] + arguments[2];
};

var sumFour = function (a, b, c, d) {
    return a + b + c + d;
};

module.exports = function (_) {
    return {
        'curry': {
            'should fix normal arguments': function () {
                var fn = _.curry(identity, 'turmeric');

                expect(fn()).to.equal('turmeric');
            },

            'should apply arguments that have not been fixed': function () {
                var fn = _.curry(second, 'garlic');

                expect(fn('ginger')).to.equal('ginger');
            },

            'should remap arguments': function() {
                var fn = _.curry(sum, _(1), _(0));

                expect(fn('mint ', 'saffron ')).to.equal('saffron mint ');
            },

            'should respect splats when remapping arguments': function() {
                var fn = _.curry(sumFour, _(3), [_], _(0), _(1));

                expect(fn('zero ', 'one ', 'two ' , 'three '))
                    .to.equal('three two zero one ');
            },

            'should respect holes when remapping arguments': function() {
                var fn = _.curry(sumFour, _(3), _, _(2), _);

                expect(fn('zero ', 'one ', 'two ' , 'three '))
                    .to.equal('three zero two one ');
            },

            'populate with the same value with abandon': function() {
                var fn = _.curry(sumFour, _(3), _(3), _(3), _(3));

                expect(fn('swedish ', 'chef ', 'says ', 'bork '))
                    .to.equal('bork bork bork bork ');
            },

            'should not nuke nonformal arguments': function () {
                var fn = _.curry(secondNonformal, 'coriander');

                expect(fn('cumin')).to.equal('cumin');
            },

            'should apply arguments to "holes"': function () {
                var fn = _.curry(sum, _, ' cardamom');

                expect(fn('green')).to.equal('green cardamom');
            },

            'should apply remaining arguments to "splats" once holes are filled': function () {
                var fn = _.curry(sumThree, [_], _);

                expect(fn('Indian', ' long', ' pepper')).to.equal('Indian long pepper');
            },

            'should fill splats with all remaining arguments, regardless of arity': function () {
                var fn = _.curry(sumThreeNonformal, 'California', [_], _);

                expect(fn(' bay', ' leaf')).to.equal('California bay leaf');
            },

            'should ignore splats after the first': function () {
                var fn = _.curry(sumFour, [_], 'ti', [_], 'da');

                expect(fn('asa', 'foe')).to.equal('asafoetida');
            },

            'should fix nonformal arguments': function () {
                var fn = _.curry(secondNonformal, 'clove', 'cinnamon');

                expect(fn()).to.equal('cinnamon');
            },

            'should not apply unfixed arguments that are not given': function () {
                var fn = _.curry(second, _, _, 'nutmeg');

                expect(fn('mustard seed')).to.be.undefined;
            },

            'i heard you like curry': function () {
                var fn = _.compose(_.curry(_.curry, sum), sum);

                expect(fn('jalapeño', ' chili')(' pepper')).to.equal('jalapeño chili pepper');
            }
        }
    };
};

