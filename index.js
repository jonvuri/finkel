
module.exports = exports = function (_) {
    var isHole = function isHole(object) { // _
        return object === _;
    };
    
    var isSplat = function isSplat(object) { // [_]
        return _.isArray(object) && object.length === 1 && object[0] === _;
    };
    
    var arrayOf = function arrayOf(value, length) {
        return _.map(_.range(0, length), function () { return value; });
    };
    
    var curry = function curry(fn) {
        var left = _.rest(arguments),
            right = [],
            leftFill = [],
            rightFill = [];
        
        (function () {
            var i;
            for (i = 0; i < left.length; i += 1) {
                if (isSplat(left[i])) {
                    right = _.filter(_.rest(left, i), function (x) { return !isSplat(x); });
                    left = _.first(left, i);
                    break;
                } else if (isHole(left[i])) {
                    leftFill.push(i);
                }
            }
            for (i = 0; i < right.length; i += 1) {
                if (isHole(right[i])) {
                    rightFill.push(i);
                }
            }
        }());
        
        return function () {
            var l = leftFill.length,
                r = rightFill.length,
                m = arguments.length - l - r,
                mid = [];
            while (r-- > 0) {
                right[rightFill[r]] = arguments[l + m + r];
            }
            while (m-- > 0) {
                mid[m] = arguments[l + m];
            }
            while (l-- > 0) {
                left[leftFill[l]] = arguments[l];
            }
            return fn.apply(this, left.concat(mid, right));
        };
    };
    
    _.mixin({curry: curry});
};
