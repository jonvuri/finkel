module.exports = function (_) {
    var isHole = function isHole(object) { // _
        return object === _;
    };

    var isSplat = function isSplat(object) { // [_]
        return _.isArray(object) && object.length === 1 && object[0] === _;
    };

    var isNotSplat = function isNotSplat(object) {
        return !isSplat(object);
    };

    var isArgHole = function isArgHole(object) { // _(int)
        return !_.isUndefined(_.result(object, 'identity'));
    };

    var firstSplat = function firstSplat(args) {
        var first = -1; // indexOf and friends consider this not found.

        _.find(args, function(v, k) {
            if (isSplat(v)) {
                first = k;
            }
            return (first === k);
        });

        return first;
    };

    // Remove positionally specified arguments from consideration.
    var filterArgs = function filterArgs(args, position) {
        var pv = _.values(position);

        function filterFn(v, k) {
            return _.include(pv, k);
        }

        return _.reject(args, filterFn);
    };

    var arrayOf = function arrayOf(value, length) {
        return _.map(_.range(0, length), function () { return value; });
    };

    var curry = function curry(fn) {
        var args      = _.rest(arguments),
            left      = [],
            right     = [],
            leftFill  = [],
            rightFill = [],
            position  = {};

        (function () {
            var splatIndex = firstSplat(args),
                hasSplat   = !!~splatIndex,
                i, to, from;

            // Store the positional arguments in a hash.
            // Underscore was not designed to work on "sparse" arrays.
            for (i = 0; i < args.length; i += 1) {
                if (isArgHole(args[i])) {
                    from = args[i].identity();
                    to = i;
                    if (hasSplat && (i > splatIndex)) {
                        to = i + splatIndex + 1;
                    }
                    position[to] = from;
                } else {
                    left.push(args[i]);
                }
            }

            for (i = 0; i < left.length; i += 1) {
                if (isSplat(left[i])) {
                    right = _.filter(_.rest(left, i), isNotSplat);
                    left = _.first(left, i);
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
            var args   = filterArgs(arguments, position),
                l      = leftFill.length,
                r      = rightFill.length,
                m      = args.length - l - r,
                pk     = _.keys(position),
                params = [],
                mid    = [],
                from, to, i;


            while (r > 0) {
                r -= 1;
                right[rightFill[r]] = args[l + m + r];
            }
            while (m > 0) {
                m -= 1;
                mid[m] = args[l + m];
            }
            while (l > 0) {
                l -= 1;
                left[leftFill[l]] = args[l];
            }

            // Splice the positional arguments into the resulting params.
            params = left.concat(mid, right);
            for (i = 0; i < pk.length; i++) {
                to = pk[i];
                from = position[to];
                params.splice(parseInt(to, 10), 0, arguments[from]);
            }

            return fn.apply(this, params);
        };
    };

    _.mixin({curry: curry});
};

