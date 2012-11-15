var expect = require('chai').expect;

var identity = function (a) {
    return a;
}

var first = function (a, b, c) {
    return a;
}

var second = function (a, b, c) {
    return b;
}

var third = function (a, b, c) {
    return c;
}

var secondNonformal = function (a) {
    return arguments[1];
}

var sum = function (a, b) {
    return a + b;
}

var sumThree = function (a, b, c) {
    return a + b + c;
}

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

            'should not nuke nonformal arguments': function () {
                var fn = _.curry(secondNonformal, 'coriander');
                
                expect(fn('cumin')).to.equal('cumin');
            },
            
            'should apply arguments to "holes"': function () {
                var fn = _.curry(sum, _, ' cardamom');
                
                expect(fn('green')).to.equal('green cardamom');
            },
            
            'should apply all missing formal arguments to "splats"': function () {
                var fn = _.curry(sumThree, [_], ' pepper');
                
                expect(fn('Indian', ' long')).to.equal('Indian long pepper');
            },
            
            'should ignore splats after the first': function () {
                var fn = _.curry(sumThree, [_], ' bay', [_], ' leaf');
                
                expect(fn('California')).to.equal('California bay leaf');
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

