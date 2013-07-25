# Finkel

A simple, yet powerful currying mixin for [Underscore](http://underscorejs.org/) or [Lo-Dash](http://lodash.com/). Yes, technically this is [actually](http://benalman.com/news/2012/09/partial-application-in-javascript/#currying) [partial](http://en.wikipedia.org/wiki/Currying) [application](http://en.wikipedia.org/wiki/Partial_application), but currying is more fun to say, even if true currying doesn't make much sense in Javascript.

You might notice that there is no option for setting `this`. This is by design; that's not the responsibility of a currying or partial application function. If you do need to set `this`, there is a native function: `fn.bind(newthis)`.

## How to use

    var _ = require('underscore');
    require('finkel')(_);
    
    var fn = function (a, b, c, d) {
        return a + b + c + d;
    }
    
    // The following all result in 'wxyz'
    _.curry(fn, 'w', 'x')('y', 'z');
    _.curry(fn, _, 'x')('w', 'y', 'z');
    _.curry(fn, [_], 'z')('w', 'x', 'y');
    _.curry(fn, [_], 'y', _)('w', 'x', 'z');
    _.curry(fn, 'w', [_], 'z')('x', 'y');
    _.curry(fn, _(3), _(2), _(1), _(0))('z', 'y', 'x', 'w');

* * * *

### Hole: `_`

Indicates an argument to be filled in when the curried function is called. `_` should be a reference to the Underscore object.

### Mapped Arguments: `_(n)`

Indicates a position in the argument list that should be populated from one of the other arguments when called. `n` is an integer.

### Splat: `[_]`

Indicates a break in the argument list, to be filled by all arguments that have not filled holes.

* * * *

### _.curry(function, args...)

Returns a new function with the same body as `function`, but with the given arguments partially applied. Arguments supplied to the curried function will be appended to the argument list.

### _.curry(function, [args | holes]...)

Returns a new function with the given arguments partially applied. Arguments supplied to the curried function will be inserted in holes, in order, and then appended to the argument list.

### _.curry(function, [args | holes]..., splat, [args | holes]...)

Returns a new function with the given arguments partially applied. Arguments at the beginning of the argument list supplied to the curried function will be inserted in holes preceding the splat, and arguments at the end of the list will be inserted in holes following the splat. Any remaining arguments in the middle of the list will be filled in where the splat occurs.

*Note: The arguments to curry may contain multiple splats, but only the first will be recognized. Any more splats will do nothing, not even act as a normal hole. Think of a splat as a greedy * in regex.*

## License

This software is released under the [MIT license](http://www.opensource.org/licenses/MIT).
