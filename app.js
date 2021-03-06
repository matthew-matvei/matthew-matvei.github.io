(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.ao.R === region.aF.R)
	{
		return 'on line ' + region.ao.R;
	}
	return 'on lines ' + region.ao.R + ' through ' + region.aF.R;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bK,
		impl.b3,
		impl.b0,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		C: func(record.C),
		ap: record.ap,
		al: record.al
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.C;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.ap;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.al) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bK,
		impl.b3,
		impl.b0,
		function(sendToApp, initialModel) {
			var view = impl.b4;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bK,
		impl.b3,
		impl.b0,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.an && impl.an(sendToApp)
			var view = impl.b4;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.bv);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.K) && (_VirtualDom_doc.title = title = doc.K);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.bW;
	var onUrlRequest = impl.bX;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		an: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.a3 === next.a3
							&& curr.aO === next.aO
							&& curr.a$.a === next.a$.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		bK: function(flags)
		{
			return A3(impl.bK, flags, _Browser_getUrl(), key);
		},
		b4: impl.b4,
		b3: impl.b3,
		b0: impl.b0
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { bI: 'hidden', bx: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { bI: 'mozHidden', bx: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { bI: 'msHidden', bx: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { bI: 'webkitHidden', bx: 'webkitvisibilitychange' }
		: { bI: 'hidden', bx: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		bb: _Browser_getScene(),
		bm: {
			bq: _Browser_window.pageXOffset,
			br: _Browser_window.pageYOffset,
			bp: _Browser_doc.documentElement.clientWidth,
			aM: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		bp: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		aM: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			bb: {
				bp: node.scrollWidth,
				aM: node.scrollHeight
			},
			bm: {
				bq: node.scrollLeft,
				br: node.scrollTop,
				bp: node.clientWidth,
				aM: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			bb: _Browser_getScene(),
			bm: {
				bq: x,
				br: y,
				bp: _Browser_doc.documentElement.clientWidth,
				aM: _Browser_doc.documentElement.clientHeight
			},
			bC: {
				bq: x + rect.left,
				br: y + rect.top,
				bp: rect.width,
				aM: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}


function _Url_percentEncode(string)
{
	return encodeURIComponent(string);
}

function _Url_percentDecode(string)
{
	try
	{
		return $elm$core$Maybe$Just(decodeURIComponent(string));
	}
	catch (e)
	{
		return $elm$core$Maybe$Nothing;
	}
}


function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});
var $author$project$Main$LinkClicked = function (a) {
	return {$: 0, a: a};
};
var $author$project$Main$UrlChanged = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.f) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.h),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.h);
		} else {
			var treeLen = builder.f * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.i) : builder.i;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.f);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.h) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.h);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{i: nodeList, f: (len / $elm$core$Array$branchFactor) | 0, h: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aJ: fragment, aO: host, aZ: path, a$: port_, a3: protocol, a4: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$application = _Browser_application;
var $author$project$Main$DateRetrieved = function (a) {
	return {$: 2, a: a};
};
var $author$project$Main$Model = F3(
	function (key, route, today) {
		return {aS: key, am: route, as: today};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$url$Url$Parser$State = F5(
	function (visited, unvisited, params, frag, value) {
		return {G: frag, I: params, E: unvisited, A: value, L: visited};
	});
var $elm$url$Url$Parser$getFirstMatch = function (states) {
	getFirstMatch:
	while (true) {
		if (!states.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var state = states.a;
			var rest = states.b;
			var _v1 = state.E;
			if (!_v1.b) {
				return $elm$core$Maybe$Just(state.A);
			} else {
				if ((_v1.a === '') && (!_v1.b.b)) {
					return $elm$core$Maybe$Just(state.A);
				} else {
					var $temp$states = rest;
					states = $temp$states;
					continue getFirstMatch;
				}
			}
		}
	}
};
var $elm$url$Url$Parser$removeFinalEmpty = function (segments) {
	if (!segments.b) {
		return _List_Nil;
	} else {
		if ((segments.a === '') && (!segments.b.b)) {
			return _List_Nil;
		} else {
			var segment = segments.a;
			var rest = segments.b;
			return A2(
				$elm$core$List$cons,
				segment,
				$elm$url$Url$Parser$removeFinalEmpty(rest));
		}
	}
};
var $elm$url$Url$Parser$preparePath = function (path) {
	var _v0 = A2($elm$core$String$split, '/', path);
	if (_v0.b && (_v0.a === '')) {
		var segments = _v0.b;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	} else {
		var segments = _v0;
		return $elm$url$Url$Parser$removeFinalEmpty(segments);
	}
};
var $elm$url$Url$Parser$addToParametersHelp = F2(
	function (value, maybeList) {
		if (maybeList.$ === 1) {
			return $elm$core$Maybe$Just(
				_List_fromArray(
					[value]));
		} else {
			var list = maybeList.a;
			return $elm$core$Maybe$Just(
				A2($elm$core$List$cons, value, list));
		}
	});
var $elm$url$Url$percentDecode = _Url_percentDecode;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === -1) && (dict.d.$ === -1)) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.e.d.$ === -1) && (!dict.e.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === -1) && (dict.d.$ === -1)) && (dict.e.$ === -1)) {
		if ((dict.d.d.$ === -1) && (!dict.d.d.a)) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				0,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr === 1) {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					1,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 0, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === -1) && (!left.a)) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === -1) && (right.a === 1)) {
					if (right.d.$ === -1) {
						if (right.d.a === 1) {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === -1) && (dict.d.$ === -1)) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor === 1) {
			if ((lLeft.$ === -1) && (!lLeft.a)) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === -1) {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === -2) {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === -1) && (left.a === 1)) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === -1) && (!lLeft.a)) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === -1) {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === -1) {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === -1) {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (!_v0.$) {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$url$Url$Parser$addParam = F2(
	function (segment, dict) {
		var _v0 = A2($elm$core$String$split, '=', segment);
		if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
			var rawKey = _v0.a;
			var _v1 = _v0.b;
			var rawValue = _v1.a;
			var _v2 = $elm$url$Url$percentDecode(rawKey);
			if (_v2.$ === 1) {
				return dict;
			} else {
				var key = _v2.a;
				var _v3 = $elm$url$Url$percentDecode(rawValue);
				if (_v3.$ === 1) {
					return dict;
				} else {
					var value = _v3.a;
					return A3(
						$elm$core$Dict$update,
						key,
						$elm$url$Url$Parser$addToParametersHelp(value),
						dict);
				}
			}
		} else {
			return dict;
		}
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$url$Url$Parser$prepareQuery = function (maybeQuery) {
	if (maybeQuery.$ === 1) {
		return $elm$core$Dict$empty;
	} else {
		var qry = maybeQuery.a;
		return A3(
			$elm$core$List$foldr,
			$elm$url$Url$Parser$addParam,
			$elm$core$Dict$empty,
			A2($elm$core$String$split, '&', qry));
	}
};
var $elm$url$Url$Parser$parse = F2(
	function (_v0, url) {
		var parser = _v0;
		return $elm$url$Url$Parser$getFirstMatch(
			parser(
				A5(
					$elm$url$Url$Parser$State,
					_List_Nil,
					$elm$url$Url$Parser$preparePath(url.aZ),
					$elm$url$Url$Parser$prepareQuery(url.a4),
					url.aJ,
					$elm$core$Basics$identity)));
	});
var $author$project$Route$Article = function (a) {
	return {$: 1, a: a};
};
var $author$project$Route$Home = {$: 0};
var $elm$url$Url$Parser$Parser = $elm$core$Basics$identity;
var $elm$url$Url$Parser$mapState = F2(
	function (func, _v0) {
		var visited = _v0.L;
		var unvisited = _v0.E;
		var params = _v0.I;
		var frag = _v0.G;
		var value = _v0.A;
		return A5(
			$elm$url$Url$Parser$State,
			visited,
			unvisited,
			params,
			frag,
			func(value));
	});
var $elm$url$Url$Parser$map = F2(
	function (subValue, _v0) {
		var parseArg = _v0;
		return function (_v1) {
			var visited = _v1.L;
			var unvisited = _v1.E;
			var params = _v1.I;
			var frag = _v1.G;
			var value = _v1.A;
			return A2(
				$elm$core$List$map,
				$elm$url$Url$Parser$mapState(value),
				parseArg(
					A5($elm$url$Url$Parser$State, visited, unvisited, params, frag, subValue)));
		};
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$url$Url$Parser$oneOf = function (parsers) {
	return function (state) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var parser = _v0;
				return parser(state);
			},
			parsers);
	};
};
var $author$project$Article$AreYouProvidingValue = 2;
var $author$project$Article$EitherPatternNetworkCalls = 3;
var $author$project$Article$LinqPerformanceLessons = 4;
var $author$project$Article$ProgrammingAsASecondLanguage = 1;
var $author$project$Article$ThreeBestPractices = 0;
var $elm$url$Url$Parser$s = function (str) {
	return function (_v0) {
		var visited = _v0.L;
		var unvisited = _v0.E;
		var params = _v0.I;
		var frag = _v0.G;
		var value = _v0.A;
		if (!unvisited.b) {
			return _List_Nil;
		} else {
			var next = unvisited.a;
			var rest = unvisited.b;
			return _Utils_eq(next, str) ? _List_fromArray(
				[
					A5(
					$elm$url$Url$Parser$State,
					A2($elm$core$List$cons, next, visited),
					rest,
					params,
					frag,
					value)
				]) : _List_Nil;
		}
	};
};
var $author$project$Article$parser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$url$Url$Parser$map,
			0,
			$elm$url$Url$Parser$s('no-best-practices')),
			A2(
			$elm$url$Url$Parser$map,
			1,
			$elm$url$Url$Parser$s('programming-as-a-second-language')),
			A2(
			$elm$url$Url$Parser$map,
			2,
			$elm$url$Url$Parser$s('are-you-providing-value')),
			A2(
			$elm$url$Url$Parser$map,
			3,
			$elm$url$Url$Parser$s('either-pattern-for-network-calls')),
			A2(
			$elm$url$Url$Parser$map,
			4,
			$elm$url$Url$Parser$s('linq-performance-lessons'))
		]));
var $elm$url$Url$Parser$slash = F2(
	function (_v0, _v1) {
		var parseBefore = _v0;
		var parseAfter = _v1;
		return function (state) {
			return A2(
				$elm$core$List$concatMap,
				parseAfter,
				parseBefore(state));
		};
	});
var $elm$url$Url$Parser$top = function (state) {
	return _List_fromArray(
		[state]);
};
var $author$project$Route$parser = $elm$url$Url$Parser$oneOf(
	_List_fromArray(
		[
			A2($elm$url$Url$Parser$map, $author$project$Route$Home, $elm$url$Url$Parser$top),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$Home,
			$elm$url$Url$Parser$s('index.html')),
			A2(
			$elm$url$Url$Parser$map,
			$author$project$Route$Article,
			A2(
				$elm$url$Url$Parser$slash,
				$elm$url$Url$Parser$s('blog'),
				$author$project$Article$parser))
		]));
var $author$project$Route$fromUrl = function (url) {
	return A2($elm$url$Url$Parser$parse, $author$project$Route$parser, url);
};
var $justinmimbs$date$Date$RD = $elm$core$Basics$identity;
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m) {
			case 0:
				return 0;
			case 1:
				return 31;
			case 2:
				return 59 + leapDays;
			case 3:
				return 90 + leapDays;
			case 4:
				return 120 + leapDays;
			case 5:
				return 151 + leapDays;
			case 6:
				return 181 + leapDays;
			case 7:
				return 212 + leapDays;
			case 8:
				return 243 + leapDays;
			case 9:
				return 273 + leapDays;
			case 10:
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m) {
			case 0:
				return 31;
			case 1:
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 2:
				return 31;
			case 3:
				return 30;
			case 4:
				return 31;
			case 5:
				return 30;
			case 6:
				return 31;
			case 7:
				return 31;
			case 8:
				return 30;
			case 9:
				return 31;
			case 10:
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return ($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
			$elm$core$Basics$clamp,
			1,
			A2($justinmimbs$date$Date$daysInMonth, y, m),
			d);
	});
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.ao, posixMinutes) < 0) {
					return posixMinutes + era.b;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		aD: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		aW: month,
		bs: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).aD;
	});
var $elm$time$Time$Apr = 3;
var $elm$time$Time$Aug = 7;
var $elm$time$Time$Dec = 11;
var $elm$time$Time$Feb = 1;
var $elm$time$Time$Jan = 0;
var $elm$time$Time$Jul = 6;
var $elm$time$Time$Jun = 5;
var $elm$time$Time$Mar = 2;
var $elm$time$Time$May = 4;
var $elm$time$Time$Nov = 10;
var $elm$time$Time$Oct = 9;
var $elm$time$Time$Sep = 8;
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).aW;
		switch (_v0) {
			case 1:
				return 0;
			case 2:
				return 1;
			case 3:
				return 2;
			case 4:
				return 3;
			case 5:
				return 4;
			case 6:
				return 5;
			case 7:
				return 6;
			case 8:
				return 7;
			case 9:
				return 8;
			case 10:
				return 9;
			case 11:
				return 10;
			default:
				return 11;
		}
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).bs;
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(0);
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $justinmimbs$date$Date$today = A3($elm$core$Task$map2, $justinmimbs$date$Date$fromPosix, $elm$time$Time$here, $elm$time$Time$now);
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $author$project$Main$updatePrism = _Platform_outgoingPort(
	'updatePrism',
	function ($) {
		return $elm$json$Json$Encode$null;
	});
var $author$project$Main$init = F3(
	function (_v0, url, key) {
		return _Utils_Tuple2(
			A3(
				$author$project$Main$Model,
				key,
				$author$project$Route$fromUrl(url),
				$elm$core$Maybe$Nothing),
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[
						A2($elm$core$Task$perform, $author$project$Main$DateRetrieved, $justinmimbs$date$Date$today),
						$author$project$Main$updatePrism(0)
					])));
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$none;
};
var $elm$browser$Browser$Navigation$load = _Browser_load;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var $elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + $elm$core$String$fromInt(port_));
		}
	});
var $elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var $elm$url$Url$toString = function (url) {
	var http = function () {
		var _v0 = url.a3;
		if (!_v0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		$elm$url$Url$addPrefixed,
		'#',
		url.aJ,
		A3(
			$elm$url$Url$addPrefixed,
			'?',
			url.a4,
			_Utils_ap(
				A2(
					$elm$url$Url$addPort,
					url.a$,
					_Utils_ap(http, url.aO)),
				url.aZ)));
};
var $author$project$Main$update = F2(
	function (message, model) {
		switch (message.$) {
			case 1:
				var url = message.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							am: $author$project$Route$fromUrl(url)
						}),
					$author$project$Main$updatePrism(0));
			case 0:
				var urlRequest = message.a;
				if (!urlRequest.$) {
					var url = urlRequest.a;
					return _Utils_Tuple2(
						model,
						A2(
							$elm$browser$Browser$Navigation$pushUrl,
							model.aS,
							$elm$url$Url$toString(url)));
				} else {
					var href = urlRequest.a;
					return _Utils_Tuple2(
						model,
						$elm$browser$Browser$Navigation$load(href));
				}
			default:
				var date = message.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							as: $elm$core$Maybe$Just(date)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Page$Model = function (page) {
	return {ak: page};
};
var $author$project$Page$Article = function (a) {
	return {$: 2, a: a};
};
var $author$project$Page$Home = {$: 1};
var $author$project$Page$NotFound = {$: 0};
var $author$project$Page$fromRoute = function (maybeRoute) {
	if (maybeRoute.$ === 1) {
		return $author$project$Page$NotFound;
	} else {
		if (!maybeRoute.a.$) {
			var _v1 = maybeRoute.a;
			return $author$project$Page$Home;
		} else {
			var slug = maybeRoute.a.a;
			return $author$project$Page$Article(slug);
		}
	}
};
var $author$project$Page$title = function (model) {
	var _v0 = model.ak;
	switch (_v0.$) {
		case 0:
			return '404 | Page Not Found';
		case 1:
			return 'mat-mat | Home';
		default:
			var slug = _v0.a;
			switch (slug) {
				case 0:
					return 'mat-mat | Three best practices';
				case 1:
					return 'mat-mat | Programming as a Second Language';
				case 2:
					return 'mat-mat | Are you providing value?';
				case 3:
					return 'mat-mat | \'Either\' pattern for network calls';
				default:
					return 'mat-mat | Performance lessons with LINQ';
			}
	}
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$footer = _VirtualDom_node('footer');
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$Widget$externalLink = F2(
	function (attributes, content) {
		return A2(
			$elm$html$Html$a,
			A2(
				$elm$core$List$append,
				attributes,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$target('_blank'),
						$elm$html$Html$Attributes$rel('noopener')
					])),
			content);
	});
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Footer$footerLink = F2(
	function (link, content) {
		return A2(
			$author$project$Widget$externalLink,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('blue-text text-lighten-3'),
					$elm$html$Html$Attributes$href(link)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(content)
				]));
	});
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $author$project$Footer$showYear = function (date) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (y) {
				return y + ' ';
			},
			A2(
				$elm$core$Maybe$map,
				$elm$core$String$fromInt,
				A2($elm$core$Maybe$map, $justinmimbs$date$Date$year, date))));
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$Footer$view = function (today) {
	return A2(
		$elm$html$Html$footer,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('page-footer blue darken-4')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('container row')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col s6')
							]),
						_List_fromArray(
							[
								A2($author$project$Footer$footerLink, 'https://github.com/matthew-matvei', 'My GitHub')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('col s6 right-align')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Powered by:'),
								A2(
								$elm$html$Html$ul,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2($author$project$Footer$footerLink, 'https://pages.github.com/', 'GitHub Pages')
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2($author$project$Footer$footerLink, 'https://materializecss.com/', 'Materialize CSS')
											])),
										A2(
										$elm$html$Html$li,
										_List_Nil,
										_List_fromArray(
											[
												A2($author$project$Footer$footerLink, 'https://prismjs.com/', 'PrismJS')
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('footer-copyright')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('container')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								'© ' + ($author$project$Footer$showYear(today) + 'matthew-matvei '))
							]))
					]))
			]));
};
var $author$project$Header$LargeScreen = 1;
var $author$project$Header$SmallScreen = 0;
var $elm$html$Html$header = _VirtualDom_node('header');
var $elm$html$Html$nav = _VirtualDom_node('nav');
var $elm$html$Html$img = _VirtualDom_node('img');
var $author$project$Header$logoText = function (size) {
	if (!size) {
		return 'mat‑mat';
	} else {
		return 'matthew‑matvei';
	}
};
var $author$project$Header$sizeAsClass = function (size) {
	if (!size) {
		return $elm$html$Html$Attributes$class('hide-on-med-and-up');
	} else {
		return $elm$html$Html$Attributes$class('hide-on-small-only');
	}
};
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $author$project$Header$viewLogoFor = function (size) {
	return A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href('/'),
				$elm$html$Html$Attributes$class('brand-logo')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('d-flex align-items-centre'),
						$author$project$Header$sizeAsClass(size)
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pr-1')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Header$logoText(size))
							])),
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('pl-1 profile-icon round'),
								$elm$html$Html$Attributes$src('/assets/img/matthew-matvei-250x250.jpg')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Header$view = function (_v0) {
	return A2(
		$elm$html$Html$header,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('navbar-fixed z-depth-3')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$nav,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('blue darken-2')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('nav-wrapper')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('container')
											]),
										_List_fromArray(
											[
												$author$project$Header$viewLogoFor(1),
												$author$project$Header$viewLogoFor(0)
											]))
									]))
							]))
					]))
			]));
};
var $author$project$Blog$Content$BlockQuote = function (a) {
	return {$: 6, a: a};
};
var $author$project$Blog$Content$CodeBlock = function (a) {
	return {$: 9, a: a};
};
var $author$project$Blog$Content$ComplexAttribute = function (a) {
	return {$: 1, a: a};
};
var $author$project$Blog$Content$Divider = {$: 8};
var $author$project$Blog$Content$Emphasised = function (a) {
	return {$: 1, a: a};
};
var $author$project$Blog$Content$ExternalLink = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $author$project$Blog$Content$Image = function (a) {
	return {$: 7, a: a};
};
var $author$project$Blog$Content$InlineCode = function (a) {
	return {$: 3, a: a};
};
var $author$project$Blog$Content$Paragraph = function (a) {
	return {$: 4, a: a};
};
var $author$project$Blog$Content$Section = function (a) {
	return {$: 5, a: a};
};
var $author$project$Blog$Content$Strong = function (a) {
	return {$: 2, a: a};
};
var $author$project$Blog$Content$SubTitle = function (a) {
	return {$: 1, a: a};
};
var $author$project$Blog$Content$Text = function (a) {
	return {$: 0, a: a};
};
var $author$project$Blog$Content$Title = function (a) {
	return {$: 0, a: a};
};
var $author$project$Blog$Content$WhenCreated = function (a) {
	return {$: 2, a: a};
};
var $author$project$Blog$AreYouProvidingValue$getContent = function (_v0) {
	return _List_fromArray(
		[
			$author$project$Blog$Content$Title('Are you providing value?'),
			$author$project$Blog$Content$SubTitle('... and how the road to hell is paved with good intentions'),
			$author$project$Blog$Content$WhenCreated(
			A3($justinmimbs$date$Date$fromCalendarDate, 2020, 7, 3)),
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('You are not employed to write clean code, you are not paid to write tests;\r\n                they keep you around in the hope that you will '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('add value')
									])),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('There are many value sinks in the world of programming. The only problem\r\n                is is that what they are depends on what actually brings value to your business.\r\n                Maybe you\'re dealing with throwaway proof-of-concept projects for which complex\r\n                testing isn\'t required. Or perhaps you\'re creating a distributed system for which\r\n                the most complex SQL optimisations is overkill. There are numerous factors in\r\n                deciding whether you\'re adding value, I\'d like to go through some of them with the\r\n                below examples.')
							]))
					]),
				K: $elm$core$Maybe$Nothing
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('The Either monad is a lovely way to handle success / fail code paths in a \r\n                concise, logical and (dependening on your language) compile-time knowledge that you \r\n                are handling possible errors that a method you call can result in. You can follow\r\n                this pattern in many different ways '),
								A2($author$project$Blog$Content$ExternalLink, 'https://blog.logrocket.com/elegant-error-handling-with-the-javascript-either-monad-76c7ae4924a1/', 'in JavaScript'),
								$author$project$Blog$Content$Text(' and '),
								A2($author$project$Blog$Content$ExternalLink, 'https://medium.com/@dimpapadim3/either-is-a-common-type-in-functional-languages-94b86eea325c', 'in C#'),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('By comparison, catching exceptions is a lawless, risky business. Consider the\r\n            following method signatures:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n// I\'ll return you an int (but I might blow up if I don\'t like \'number\')\r\nint ParseNumber(string number);\r\n\r\n// I\'ll \'Either\' return you success or fail, and you need to handle those possibilities\r\nEither<Error, int> ParseNumber(string number);\r\n            ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('As you can see, the issue with exceptions can be that they hide the fact\r\n                that they have possible '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('alternative return values')
									])),
								$author$project$Blog$Content$Text('. It\'s possible that the method will result in an '),
								$author$project$Blog$Content$InlineCode('int'),
								$author$project$Blog$Content$Text(', but it\'s also possible that it may result in one of many exceptions\r\n                raised due to the nature of the '),
								$author$project$Blog$Content$InlineCode('number'),
								$author$project$Blog$Content$Text(' parameter. Often, it\'s left up to a caller simply to '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('know')
									])),
								$author$project$Blog$Content$Text(' that this may happen, or look at documentation for the method, which can\r\n                be lacking, stale or misleading. It may not even be clear to the developer who\r\n                documented the method in the first place, since the exceptions that it potentially\r\n                throws may just be thrown by its dependencies.')
							])),
						$author$project$Blog$Content$BlockQuote('Right then, I hear ya, let\'s replace it all with methods that return \'Either\'s'),
						$author$project$Blog$Content$Image(
						{
							aw: 'Replace all the things',
							ay: $author$project$Blog$Content$ComplexAttribute(
								{aV: 'http://www.quickmeme.com/meme/354gb5', bk: 'Quick Meme'}),
							be: '/assets/img/replace-all-the-things.jpg'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Whoa there Nelly. Do the other developers on your team know what the hell\r\n                an \'Either\' object is? Or how to nicely bind Either instances with successive\r\n                functions to chain multiple actions into one ultimate result?')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Unfortunately, if they don\'t '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('get it')
									])),
								$author$project$Blog$Content$Text(', they won\'t use it properly, and all the benefits of it will be in vain.\r\n                You can try to make the argument that they should just suck it up and learn it, and\r\n                learning new things is lovely and all, but we all work to real constraints. Perhaps\r\n                they have enough on their plate keeping up with new practices of system monitoring\r\n                and persisting data. If they are used to catching exceptions, and let\'s face it, '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('they probably are')
									])),
								$author$project$Blog$Content$Text(', then they\'re more likely to do this correctly. It fits more naturally in\r\n                with the talents of the team and therefore lets them actually contribute more value\r\n                to the business.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This isn\'t to piss on the potential value of other patterns. If the team\r\n                is up for the learning, and there\'s something to gain for everyone (not just for you,\r\n                the person who suggested everyone adopt a new pattern), then that\'s positive. But\r\n                consider whether this other feature, no matter how fantastic it may seem in isolation,\r\n                is '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('actually')
									])),
								$author$project$Blog$Content$Text(' the right tool for the job. Or rather, it\'s a screw that other developers\r\n                have the right screwdrivers for...')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: '... that don\'t work', K: 'Good ideas'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'The after life',
							ay: $author$project$Blog$Content$ComplexAttribute(
								{aV: 'https://imgflip.com/i/2qhd80', bk: 'Imgflip'}),
							be: '/assets/img/afterlife.jpg'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('So you\'re writing a view component - maybe in React or Vue, and you want to\r\n                extract a rather complicated function out into its own module... because the\r\n                function is complicated.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Since there\'s no overarching '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('reason')
									])),
								$author$project$Blog$Content$Text(' for this module, other than just to house this function that you\'re going\r\n                to import the function from (which, you reason, will make the code more reusable\r\n                and testable), you decide to put it in a new file called '),
								$author$project$Blog$Content$InlineCode('helpers.js'),
								$author$project$Blog$Content$Text('. You put the function there, write some tests, and import it in one place\r\n                - the component you were working on when you extracted out this function.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('A few weeks later you notice in this same code base a very similar function\r\n                that was clearly written for one other particular component as well. This time, the\r\n                developer put it in a file called '),
								$author$project$Blog$Content$InlineCode('utils.js'),
								$author$project$Blog$Content$Text(' and they had no idea that your function that lives is '),
								$author$project$Blog$Content$InlineCode('helpers.js'),
								$author$project$Blog$Content$Text(' even existed. After all, they saw a file called '),
								$author$project$Blog$Content$InlineCode('helpers.js'),
								$author$project$Blog$Content$Text(' and had no idea that the particular function they needed at the time \r\n                would be in there. And how would they? The module\'s name gives no clues about what\r\n                area of functionality it\'s centred on.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('If you want to provide value to other developers with reusable code that\r\n                can be worked with and extended logically, consider what can be seen as generic, has\r\n                few dependencies and doesn\'t make strong assumptions about the calling code. For\r\n                example:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n// helpers.js\r\n\r\nconst formatResult = (data, excludedProducts) => {\r\n    let result = "";\r\n    for (var product of data) {\r\n        if (excludedProducts.some(p => p.info.id === product.info.id))\r\n            continue;\r\n            \r\n        result = result + product.info.name + \';\'\r\n    }\r\n}\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This non-descript '),
								$author$project$Blog$Content$InlineCode('helpers.js'),
								$author$project$Blog$Content$Text(' module now has a very uninformatively named '),
								$author$project$Blog$Content$InlineCode('formatResult'),
								$author$project$Blog$Content$Text(' function. Whether it serves any immediate use is one thing, but anyone\r\n                who tries to apply this to any other problem they have are likely to find it\'s not\r\n                fit for their purpose.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('To get something useful from this, let\'s try to think about what this \r\n                rather contrived function is, at the heart of it, trying to do.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Essentially, it takes an array of data and concatenates product names with\r\n                a trailing \';\' from it, as long as those products shouldn\'t be excluded. There\'s a\r\n                great number of ways that we can make this a little more generic to hopefully make\r\n                this a better candidate for reuse, depending on how much power / responsibility we\r\n                want to place back into the caller\'s hands. Some examples are:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n// products.js\r\n\r\nconst formatNames = (data, excludedProducts) => {\r\n    // Implementation as above\r\n}\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This first alternative doesn\'t change much at all. In fact, all it does\r\n                is centre this functionality in a products-related module. Depending on how\r\n                consistent your product models are, this may be enough for this function to now be\r\n                easier to find and more reusable. That said, it still makes a lot of assumptions\r\n                about both what these products look like and the fact that \'format\' means\r\n                \'concatenate\'.')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n// products.js\r\n\r\nconst concatProductNames = (\r\n    data, \r\n    {\r\n        selectName = x => x, \r\n        excludeIf = x => false\r\n    } = {}) => \r\n    data\r\n        .filter(product => !excludeIf(product))\r\n        .map(selectName)\r\n        .reduce((result, current) => result + current + \';\', \'\');\r\n\r\n// Then call this with\r\n\r\nconcatProductNames(\r\n    products,\r\n    {\r\n        selectName: p => p.info.name,\r\n        excludeIf: p => productsToExclude.some(pe => pe.info.id === p.info.id)\r\n    });\r\n)\r\n            ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This option places more responsibility again on the caller, asking them\r\n                to provide a function for both selecting a product\'s name and determining whether\r\n                a product should be included or not. This means that any other potential caller can\r\n                reuse this, even if they have a different shape of product, and even if they have a\r\n                different (or no) requirements about whether the product should be excluded. That\r\n                said, it still makes some assumptions about how the result should be concatenated,\r\n                which may be just enough contained functionality to still make this function\r\n                valuable in the domain of products.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('I rewrote the implementation above to show that, mainly, this function is\r\n                really just a filter and a map, with some string concatenation that the caller may\r\n                or may not want. What if we had no real domain logic that specified that we often\r\n                need product names listed in this contrived way? We could offer the following:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n// arrays.js\r\n\r\nconst filterMap = (array, filter, map) => {\r\n    const result = [];\r\n\r\n    for (var elem of array) {\r\n        if (filter(elem)) {\r\n            result.push(map(elem));\r\n        }\r\n    }\r\n\r\n    return result;\r\n}\r\n\r\n// Then, to get the same result as we did before\r\n\r\nconst relevantProductNames = filterMap(\r\n    products,\r\n    p => excludedProducts.every(pe => pe.info.id !== p.info.id),\r\n    p => p.info.name\r\n);\r\n\r\nconst result = relevantProductNames.reduce((acc, current) => acc + current + \';\', \'\');\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This places almost all power and responsibility at the feet of the caller,\r\n                but provides purely generic array-based functionality which could be relevant for\r\n                any manner of purpose. In fact, the only real feature this function offers is\r\n                avoiding the double enumeration of an array, which could get expensive in larger\r\n                arrays (and they\'d better be large before you start worrying too much about this).')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('On the great spectrum of reusable code, this may be verging on the side of\r\n                \'but do I even need this\', and yeah in most cases the caller could simply '),
								$author$project$Blog$Content$InlineCode('.filter'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('.map'),
								$author$project$Blog$Content$Text(' themselves. The most reusable yet useful function may lie somewhere in\r\n                the middle of the two extremes I\'ve provided.')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: '... graveyard modules', K: 'Helper libraries'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('A developer works all day on a given feature. They get their code ready,\r\n                write tests, and verify everything is working end-to-end. Then they look at what\r\n                they have - and spend another half a day writing things like:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\npublic class Point\r\n{\r\n    public int X { get; }\r\n    public int Y { get; }\r\n\r\n    public Point(int x, int y)\r\n    {\r\n        X = x;\r\n        Y = y;\r\n    }\r\n\r\n    public override bool Equals(object obj) =>\r\n        Equals(obj as Point);\r\n\r\n    public bool Equals(Point other) =>\r\n        other != null\r\n            && X == other.X\r\n            && Y == other.Y;\r\n\r\n    public override int GetHashCode() =>\r\n        19 * X.GetHashCode() + 21 * Y.GetHashCode();\r\n}\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('They write tests again for the '),
								$author$project$Blog$Content$InlineCode('Equals'),
								$author$project$Blog$Content$Text(' methods and '),
								$author$project$Blog$Content$InlineCode('GetHashCode'),
								$author$project$Blog$Content$Text(' method that they override. They find a bug or two and they look at how\r\n                they can improve the '),
								$author$project$Blog$Content$InlineCode('GetHashCode'),
								$author$project$Blog$Content$Text(' method '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('(hint: it can be)')
									])),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('And it turns out that they do this not because they have any '),
								$author$project$Blog$Content$InlineCode('IDictionary<Point, object>'),
								$author$project$Blog$Content$Text(' or '),
								$author$project$Blog$Content$InlineCode('HashSet<Point>'),
								$author$project$Blog$Content$Text(', but rather they\'ve done this work so that that functionality could be\r\n                supported in future.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('The thing is though, there\'s no way of knowing that this will actually be\r\n                a requirement for the '),
								$author$project$Blog$Content$InlineCode('Point'),
								$author$project$Blog$Content$Text(' class. Maybe it\'ll never need to be hashed, or equality ever checked, and\r\n                this has just been a great waste of time. If another developer is then working on\r\n                some more functionality surrounding '),
								$author$project$Blog$Content$InlineCode('Point'),
								$author$project$Blog$Content$Text('s, and needs this functionality, then that would be the responsible time\r\n                at which to implement these methods.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('It isn\'t just a more responsible time for the sake of getting more work\r\n                out the door faster in an iterative fashion, but consider the possibility that '),
								$author$project$Blog$Content$InlineCode('Point'),
								$author$project$Blog$Content$Text(' has in the meantime become:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\npublic class Point\r\n{\r\n    public int X { get; }\r\n    public int Y { get; }\r\n    public int Z { get; }\r\n\r\n    public Point(int X, int Y, int Z)\r\n    {\r\n        X = x;\r\n        Y = y;\r\n        Z = z;\r\n    }\r\n\r\n    // ...\r\n}\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('A '),
								$author$project$Blog$Content$InlineCode('Point'),
								$author$project$Blog$Content$Text(' has now become a 3-dimensional point in space. This means that the\r\n                implementation of its '),
								$author$project$Blog$Content$InlineCode('Equals'),
								$author$project$Blog$Content$Text(' methods and consequently its '),
								$author$project$Blog$Content$InlineCode('GetHashCode'),
								$author$project$Blog$Content$Text(' method would have to be updated. That isn\'t the end of the world, but in\r\n                the event these methods weren\'t implemented in the first place (since they weren\'t\r\n                previously required), then all the implementer has to do is write them as the\r\n                current 3-dimensional nature dictates. That might not seem like such a huge win in\r\n                the above contrived example, but consider complex objects that you may have worked\r\n                on, and how much they\'re capable of changing over time.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('When writing the '),
								$author$project$Blog$Content$InlineCode('Point'),
								$author$project$Blog$Content$Text(' class, don\'t try to write and implement the future; but '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('consider')
									])),
								$author$project$Blog$Content$Text(' the future. Think about how the type could be extended to support aspects\r\n                such as modifying, either mutably or immutably, points and whether it could be\r\n                easily modified to handle non-integer values (particularly about whether this could\r\n                be done in a non-breaking way).')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: 'You ain\'t gonna need it (probably)', K: 'YAGNI'})
			})
		]);
};
var $author$project$Blog$Content$Collection = function (a) {
	return {$: 10, a: a};
};
var $author$project$Blog$Content$InternalLink = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $author$project$Blog$Content$OrderedList = function (a) {
	return {$: 11, a: a};
};
var $author$project$Blog$EitherPatternNetworkCalls$getContent = function (_v0) {
	return _List_fromArray(
		[
			$author$project$Blog$Content$Title('The Either / Result pattern'),
			$author$project$Blog$Content$SubTitle('... for network calls'),
			$author$project$Blog$Content$WhenCreated(
			A3($justinmimbs$date$Date$fromCalendarDate, 2020, 7, 23)),
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('In most Single Page Apps that rely on back-end services, you will find\r\n                yourself making many repetitive calls to these services from your UI components,\r\n                either directly or via some module that handles network fetches. And you\'ll find\r\n                that you\'re always dealing with 3 or 4 varying factors:')
							])),
						$author$project$Blog$Content$OrderedList(
						_List_fromArray(
							[
								_List_fromArray(
								[
									$author$project$Blog$Content$Text('The endpoint uri')
								]),
								_List_fromArray(
								[
									$author$project$Blog$Content$Text('The body of the request (optional)')
								]),
								_List_fromArray(
								[
									$author$project$Blog$Content$Text('A '),
									$author$project$Blog$Content$Strong(
									_List_fromArray(
										[
											$author$project$Blog$Content$Text('successful')
										])),
									$author$project$Blog$Content$Text(' response and its possible content')
								]),
								_List_fromArray(
								[
									$author$project$Blog$Content$Text('An '),
									$author$project$Blog$Content$Strong(
									_List_fromArray(
										[
											$author$project$Blog$Content$Text('unsuccessful')
										])),
									$author$project$Blog$Content$Text(' response and its error content')
								])
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('What I often saw was code that within a UI component would invoke the api\r\n                using the '),
								$author$project$Blog$Content$InlineCode('fetch'),
								$author$project$Blog$Content$Text(' API, get a response object, and then branch logic based on whether the\r\n                result was successful or not. This can become fairly cumbersome, as shown below.')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nasync componentDidMount() {\r\n    this.setState({ isFetching: true });\r\n\r\n    try {\r\n        const productsResponse = await fetch("http://our.service/api/products");\r\n        if (productsResponse.ok) {\r\n            const products = await productsResponse.json();\r\n            this.setState({ products });\r\n        } else {\r\n            const errorContent = await productsResponse.json();\r\n            notifyError(errorContent);\r\n        }\r\n    } catch (error) {\r\n        notifyError(error);\r\n    }\r\n    \r\n    this.setState({ isFetching: false });\r\n}\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('And this is ignoring the cases where we often wanted to handle the\r\n                returned data in some way. For example, if we wanted to enrich that data with some\r\n                other content, map it to a different shape, or use the result of one fetch as the\r\n                input to another. In these cases, we often had early '),
								$author$project$Blog$Content$InlineCode('return'),
								$author$project$Blog$Content$Text(' calls in the failure branches in order to avoid further processing, which\r\n                complicated setting state very quickly.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This seems to be unreasonably complicated, given that in our heads we\'re\r\n                simply trying to capture '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('\'if it\'s successful, do this; if it\'s unsuccessful, do that\'')
									])),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('It just so happens there\'s a perfect abstraction that simplified handling\r\n                a lot of these network calls\' responses.')
							]))
					]),
				K: $elm$core$Maybe$Nothing
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'Fork in the road',
							ay: $author$project$Blog$Content$ComplexAttribute(
								{aV: 'https://www.pinnacleadvisory.com/analyst/a-fork-in-the-road-market-review/', bk: 'Pinnacle Advisory'}),
							be: '/assets/img/fork_in_road.jpg'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('The \'Either\' or \'Result\' pattern (or '),
								A2($author$project$Blog$Content$ExternalLink, 'https://adambennett.dev/2020/05/the-result-monad/', 'the Result Monad'),
								$author$project$Blog$Content$Text(', but that\'s a scary word), is very useful for encapsulating this '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('either or')
									])),
								$author$project$Blog$Content$Text(' behaviour, which I\'ve briefly written about previously '),
								A2($author$project$Blog$Content$InternalLink, '/blog/are-you-providing-value', 'here'),
								$author$project$Blog$Content$Text('. Ordinarily, a given function would return a given type of \r\n                result. A naive view of the above '),
								$author$project$Blog$Content$InlineCode('fetch'),
								$author$project$Blog$Content$Text(' request is that it should just return us our products, since that\'s what\r\n                we\'re interested in, but with the complexity of HTTP requests / responses, it\'s\r\n                only responsible for the API to first return us an object from which we can then\r\n                inspect and handle further.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('At the crux of this monad is the ability to describe '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('how')
									])),
								$author$project$Blog$Content$Text(' you would like to handle the success / failure paths of the result of \r\n                some operation. The above example can be rewritten to take advantage of this\r\n                pattern, but first it will be useful to have a function that adapts the raw '),
								$author$project$Blog$Content$InlineCode('fetch'),
								$author$project$Blog$Content$Text(' API result into '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('either')
									])),
								$author$project$Blog$Content$Text(' a successful result '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('or')
									])),
								$author$project$Blog$Content$Text(' an unsuccessful one.')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nclass Either {\r\n    isOk;\r\n    value;\r\n\r\n    constructor(isOk, value) {\r\n        isOk = isOk;\r\n        value = value;\r\n    }\r\n\r\n    handleOk(okDelegate) {\r\n        if (this.isOk) {\r\n            okDelegate(value);\r\n        }\r\n\r\n        return this;\r\n    }\r\n\r\n    handleFailure(failureDelegate) {\r\n        if (!this.isOk) {\r\n            failureDelegate(value);\r\n        }\r\n\r\n        return this;\r\n    }\r\n\r\n    // ... Here you would have some other useful methods we can talk about later\r\n\r\n    static Ok(successfulValue) {\r\n        return new Either(true, successfulValue);\r\n    }\r\n\r\n    static Fail(unsuccessfulValue) {\r\n        return new Either(false, unsuccessfulValue);\r\n    }\r\n}\r\n\r\n// Then, in some network-related module, we define a function\r\n\r\nconst fetchResult = async (url, init) => {\r\n    try {\r\n        const result = await fetch(url, init);\r\n        if (result.ok) {\r\n            return Either.Ok(await result.json());\r\n        } else {\r\n            return Either.Fail({\r\n                status: result.status, \r\n                content: await result.json() \r\n            });\r\n        }\r\n    } catch (error) {\r\n        return Either.Fail({ content: error });\r\n    }\r\n}\r\n            ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('The \'Either\' type itself can be defined in different ways; if you\'re a fan,\r\n                you could write it as a '),
								A2($author$project$Blog$Content$ExternalLink, 'https://coryrylan.com/blog/javascript-module-pattern-basics', 'function-based module'),
								$author$project$Blog$Content$Text('. I\'ve found it useful to include '),
								$author$project$Blog$Content$InlineCode('handleOk'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('handleFailure'),
								$author$project$Blog$Content$Text('methods separately in order to handle performing '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('side-effecty')
									])),
								$author$project$Blog$Content$Text(' actions for either success or failure along the pipeline, but these can\r\n                be combined in a \'cata\' as described '),
								A2($author$project$Blog$Content$ExternalLink, 'https://medium.com/@dimpapadim3/either-is-a-common-type-in-functional-languages-94b86eea325c', 'here'),
								$author$project$Blog$Content$Text('. This may all look rather unimpressive, and it\'s as though we\'ve just \r\n                created ourselves some extra work without any benefit. But with these beginning\r\n                pieces, the above example of fetching products becomes:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nasync componentDidMount() {\r\n    this.setState({ isFetching: true });\r\n\r\n    (await fetchResult("http://our.service/api/products"))\r\n        .handleFailure(({ content }) => notifyError(content))\r\n        .handleOk((products) => { this.setState({ products }) };);\r\n\r\n    this.setState({ isFetching: false });\r\n}\r\n\r\n// If we don\'t like the use of async / await, this can also be\r\n\r\nfetchResult("http://our.service/api/products")\r\n    .then((result) => result\r\n        .handleFailure(({ content }) => notifyError(content))\r\n        .handleOk((products) => { this.setState({ products }) };));\r\n            ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This massively distills the essence of what we\'re trying to convey to\r\n                other developers working on this project. At the call site, we can see that we\'re\r\n                fetching some data, notifying of failure if that occurs, and setting state if the\r\n                result is successful. That\'s it. '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('Simples')
									])),
								$author$project$Blog$Content$Text('. The below diff demonstrates how we cut\r\n                through the otherwise messy success / failure branch handling.')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n\r\nasync componentDidMount() {\r\n    this.setState({ isFetching: true });\r\n\r\n-    try {\r\n-        const productsResponse = await fetch("http://our.service/api/products");\r\n+    (await fetchResult("http://our.service/api/products"))\r\n-        if (productsResponse.ok) {\r\n-            const products = await productsResponse.json();\r\n-            this.setState({ products });\r\n-        } else {\r\n+        .handleOk((products) => this.setState({ products }))\r\n-            const errorContent = await productsResponse.json();\r\n-            notifyError(errorContent);\r\n-        }\r\n-    } catch (error) {\r\n-        notifyError(error);\r\n-    }\r\n+        .handleFailure(({ content }) => notifyError(content));\r\n    \r\n    this.setState({ isFetching: false });\r\n}\r\n            ', H: 'diff'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('The benefits become even more apparent when you want to do something\r\n                further with the successful result. Consider the below example:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nlet userName;\r\n\r\ntry {\r\n    const userResponse = await fetch("http://our.userservice/api/users/123");\r\n    if (userResponse.ok) {\r\n        const user = await userResponse.json();\r\n        if (!user.name?.first || !user.name?.last) {\r\n            return;\r\n        }\r\n\r\n        userName = user.name.first + " " + user.name.last;\r\n    } else {\r\n        const errorContent = await userResponse.json();\r\n        notifyError(errorContent);\r\n    }\r\n} catch (error) {\r\n    notifyError(error);\r\n}\r\n\r\nif (!userName) {\r\n    return;\r\n}\r\n\r\ntry {\r\n    const filteredProductsResponse = await fetch(`http://our.service/api/products?ownedBy=${userName}`);\r\n    if (filteredProductsResponse.ok) {\r\n        const filteredProducts = await filteredProductsResponse.json();\r\n        this.setState({ products: filteredProducts });\r\n    }\r\n} catch (error) {\r\n    notifyError(error);\r\n}\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('A large advantage of this monad is simplifying dealing with the happy\r\n                path whilst not failing to deal with the unhappy one. In the above, we want to\r\n                fetch the products with a filter, but '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('only')
									])),
								$author$project$Blog$Content$Text(' if the previous user name fetch was successful. We also need to check\r\n                whether the returned user object actually has a first and last name defined before\r\n                continuing, complicating the possible escape hatch '),
								$author$project$Blog$Content$InlineCode('return'),
								$author$project$Blog$Content$Text(' calls within the function.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('It would be useful if we could just pass a function that operates on a\r\n                successful result without interfering with an unsuccessful one. That function could\r\n                even return another Either, or just a simple result that we can wrap in an Either.\r\n                This functionality is handled by methods usually described as a '),
								$author$project$Blog$Content$InlineCode('.bind'),
								$author$project$Blog$Content$Text(', as described '),
								A2($author$project$Blog$Content$ExternalLink, 'https://fsharpforfunandprofit.com/posts/elevated-world-2/', 'here'),
								$author$project$Blog$Content$Text('. Let\'s have a look at some simplified examples of those.')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nclass Either {\r\n    // ... As in the above example\r\n\r\n    bind(nextDelegate) {\r\n        if (!this.isOk) return this;  // We only perform this action if Either is successful\r\n\r\n        const nextResult = nextDelegate(this.value);\r\n\r\n        // Here you can return directly if the \'nextDelegate\' function returns another Either\r\n        if (nextResult instanceof Either) {\r\n            return nextResult;\r\n        } else {\r\n            // Otherwise, with no errors raised, we can interpret this as successful\r\n            return Either.Ok(nextResult);\r\n        }\r\n    }\r\n\r\n    async bindAsync(nextDelegateAsync) {\r\n        // similar implementation to the above, but this expects \'nextDelegateAsync\' to\r\n        // return a Promise, which this method can properly \'await\'\r\n    }\r\n}\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('You could also wrap the evaluation of '),
								$author$project$Blog$Content$InlineCode('nextDelegate'),
								$author$project$Blog$Content$Text(' in a try / catch block, and handle errors by returning '),
								$author$project$Blog$Content$InlineCode('Either.Fail'),
								$author$project$Blog$Content$Text(', but that\'s very much a matter for some further thought and decision\r\n                making. After all, if a '),
								$author$project$Blog$Content$InlineCode('nextDelegate'),
								$author$project$Blog$Content$Text(' that doesn\'t attempt to return an Either instance simply fails, it may\r\n                be desirable to expect the caller to handle this within the '),
								$author$project$Blog$Content$InlineCode('nextDelegate'),
								$author$project$Blog$Content$Text(' function that they pass.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('In our above, non-Either example, it looks like we also wanted to define\r\n                when a result may be a failure. This can be handled by doing something like:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nclass Either {\r\n    // ... We\'ve seen this before folks\r\n\r\n    failIf(delegate) {\r\n        if (!this.isOk) return this;\r\n\r\n        return delegate(this.value)\r\n            ? Either.Fail(null)\r\n            : this;\r\n    }\r\n}\r\n            ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('With these pieces in place, we can now diff the simplifications. To\r\n                prevent your eyes from bleeding by stitching the two together, I\'ve separated the\r\n                removed from the added.')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n-let userName;\r\n-\r\n-try {\r\n-    const userResponse = await fetch("http://our.userservice/api/users/123");\r\n-    if (userResponse.ok) {\r\n-        const user = await userResponse.json();\r\n-        if (!user.name?.first || !user.name?.last) {\r\n-            return;\r\n-        }\r\n-\r\n-        userName = user.name.first + " " + user.name.last;\r\n-    } else {\r\n-        const errorContent = await userResponse.json();\r\n-        notifyError(errorContent);\r\n-    }\r\n-} catch (error) {\r\n-    notifyError(error);\r\n-}\r\n-\r\n-if (!userName) {\r\n-    return;\r\n-}\r\n-\r\n-try {\r\n-    const filteredProductsResponse = await fetch(`http://our.service/api/products?ownedBy=${userName}`);\r\n-    if (filteredProductsResponse.ok) {\r\n-        const filteredProducts = await filteredProductsResponse.json();\r\n-        this.setState({ products: filteredProducts });\r\n-    }\r\n-} catch (error) {\r\n-    notifyError(error);\r\n-}\r\n\r\n+(await fetchResult("http://our.userservice/api/users/123"))\r\n+   .failIf((user) => !user.name?.first || !user.name?.last)\r\n+   .bind((user) => user.name.first + " " + user.name.last)\r\n+   .bindAsync((userName) =>\r\n+       fetchResult(`http://our.service/api/products?ownedBy=${userName}`))\r\n+   .then((result) => result\r\n+       .handleFailure((error) => { \r\n+           if (error?.content) notifyError(error.content);\r\n+       })\r\n+       .handleOk((filteredProducts) => { this.setState({ products: filteredProducts }) };))\r\n            ', H: 'diff'})
					]),
				K: $elm$core$Maybe$Just(
					{aq: '... this or that', K: 'Either or'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'Confused',
							ay: $author$project$Blog$Content$ComplexAttribute(
								{aV: 'https://giphy.com/gifs/confused-huh-mark-wahlberg-zjQrmdlR9ZCM', bk: 'giphy.com'}),
							be: 'https://media.giphy.com/media/zjQrmdlR9ZCM/giphy.gif'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Despite the advantages, there are genuine reasons you may not want to\r\n                introduce an Either / Result monad into your work\'s next project:')
							])),
						$author$project$Blog$Content$Collection(
						_List_fromArray(
							[
								{bk: 'While you might believe it\'s the team\'s responsibility to learn\r\n                  whatever you\'ve read someone on the internet tell you to do, there is a genuine\r\n                  cost incurred in any new technique introduced.', K: 'Team doesn\'t understand it'},
								{bk: 'Unfortunately, developers are people too, and if they\'re not on board\r\n                  with it, they\'re likely to skirt around using it, avoid extending it, or worse,\r\n                  remove it.', K: 'Team doesn\'t like it'},
								{bk: 'If people forget that these functions are for executing some side\r\n                  effect using the current success / failure, you\'ll start to see some interesting\r\n                  attempts to use these functions to try to modify the current value contained in\r\n                  the Either instance.', K: '\'handleOk\' and \'handleFailure\' functions can be misunderstood'},
								{bk: 'Since you\'re passing function callbacks in a series, other devs might\r\n                  conclude that this is some sort of \'builder\' object, where we can define only\r\n                  once how we want to handle success or failure. Once it clicks that this is a\r\n                  pipeline, people start to realise that the placement order of a \'handleFailure\'\r\n                  matters.', K: 'Others treat it as a \'builder\' object'}
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: '... \"what\'s an \'Either\'?\"', K: 'When not to use it'})
			})
		]);
};
var $author$project$Component$Table$Caption$Emphasis = function (a) {
	return {$: 2, a: a};
};
var $author$project$Blog$Content$Heading = function (a) {
	return {$: 3, a: a};
};
var $author$project$Component$Table$Caption$InlineCode = function (a) {
	return {$: 1, a: a};
};
var $author$project$Blog$Content$Table = function (a) {
	return {$: 12, a: a};
};
var $author$project$Component$Table$Caption$Text = function (a) {
	return {$: 0, a: a};
};
var $author$project$Blog$LinqPerformanceLessons$getContent = function (_v0) {
	return _List_fromArray(
		[
			$author$project$Blog$Content$Title('Lessons on performance with LINQ'),
			$author$project$Blog$Content$SubTitle('... when comparing logically equivalent methods'),
			$author$project$Blog$Content$WhenCreated(
			A3($justinmimbs$date$Date$fromCalendarDate, 2020, 11, 7)),
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('I initially started writing benchmarks for LINQ methods during regular pull requests, when\r\n                reviewing others\' code. I would often see certain method calls that seemed unnecessary or less than\r\n                optimally efficient, but I wanted to verify my intuitions. Having done so, I can see that there can\r\n                sometimes be some mental gymnastics that goes into concluding whether a query can be optimised. However,\r\n                there are some key takeaways that I\'d like to go through. All code involved in the benchmarks referred\r\n                to below can be found in my '),
								A2($author$project$Blog$Content$ExternalLink, 'https://github.com/matthew-matvei/ComparableLinqMethodsBenchmark', 'ComparableLinqMethodsBenchmark'),
								$author$project$Blog$Content$Text(' repository.')
							])),
						$author$project$Blog$Content$Image(
						{
							aw: 'Gotta go fast',
							ay: $author$project$Blog$Content$ComplexAttribute(
								{aV: 'https://knowyourmeme.com/memes/gotta-go-fast', bk: 'Know Your Meme'}),
							be: '/assets/img/gotta-go-fast.gif'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('LINQ may not have been built for blistering-fast performance, so why worry about benchmarking various\r\n                LINQ methods? True, its strength lies in declaratively describing how a lazily-evaluated query over\r\n                some data should be performed, not necessarily in dealing with that data with the fewest allocations or\r\n                iterations. That said, if we\'re sticking within the confines of LINQ and just comparing\r\n                logically-equivalent methods (i.e., different methods that produce the same results) in a fairly\r\n                declarative way, are there any lessons to be learnt about how to best wield it?')
							])),
						$author$project$Blog$Content$BlockQuote('Short answer: there are both lessons to learn and some hidden surprises to puzzle over')
					]),
				K: $elm$core$Maybe$Nothing
			}),
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Below are the relevant specs for my machine outputted by '),
								A2($author$project$Blog$Content$ExternalLink, 'https://benchmarkdotnet.org/articles/overview.html', 'Benchmark Dotnet'),
								$author$project$Blog$Content$Text(', which I used to measure and compare performance by defining benchmarks.')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nBenchmarkDotNet=v0.12.1, OS=Windows 10.0.18363.1198 (1909/November2018Update/19H2)\r\nIntel Core i7-9700K CPU 3.60GHz (Coffee Lake), 1 CPU, 8 logical and 8 physical cores\r\n.NET Core SDK=5.0.100\r\n  [Host]     : .NET Core 5.0.0 (CoreCLR 5.0.20.51904, CoreFX 5.0.20.51904), X64 RyuJIT\r\n  DefaultJob : .NET Core 5.0.0 (CoreCLR 5.0.20.51904, CoreFX 5.0.20.51904), X64 RyuJIT\r\n\r\n', H: 'ini'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Obviously mileage can vary depending on your operating system and target runtime, but I would\r\n            hazard a guess that .NET 5 running on Windows will be a fairly common combination of factors once\r\n            adoption of .NET 5 becomes more prevalent. If you found some interesting results, particularly those that\r\n            contradict mine, using a different setup, reach out at '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('matthew')
									])),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('(dot)')
									])),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('d')
									])),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('(dot)')
									])),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('james')
									])),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('87')
									])),
								$author$project$Blog$Content$Text(' at '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('gmail.com')
									])),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Overall, though, this isn\'t about raw, absolute metrics, but rather about seeing relative\r\n                differences within the same operating environment and making decisions based on that. I\'m hoping you\r\n                can steer away from certain LINQ practices and towards others at the end of it. I should also point out that\r\n                generally the worst-case scenario is used: for example, when searching for an element in a list, to\r\n                show the full weight of a '),
								$author$project$Blog$Content$InlineCode('O(n)'),
								$author$project$Blog$Content$Text(' operation '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('(see more about Big O Notation '),
										A2($author$project$Blog$Content$ExternalLink, 'https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/', 'here'),
										$author$project$Blog$Content$Text(')')
									])),
								$author$project$Blog$Content$Text(', the element is appended when defining the source data structure (this order may\r\n                not be preserved when creating a dictionary from the elements).')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: '... set the scene', K: 'Environmental factors'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'O RLY? Let me write that down GIF',
							ay: $author$project$Blog$Content$ComplexAttribute(
								{aV: 'https://giphy.com/', bk: 'Giphy.com'}),
							be: 'https://media.giphy.com/media/Jrq94lNNcguM8/giphy.gif'
						}),
						$author$project$Blog$Content$Heading('The Baseline'),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Initially, I simply wanted to understand the differences in the same general, simple mapping\r\n                operation. This would give me an idea of how the underlying enumerable data structures can be iterated\r\n                through. In most benchmarks each enumerable data source has a size of '),
								$author$project$Blog$Content$InlineCode('200'),
								$author$project$Blog$Content$Text(' or '),
								$author$project$Blog$Content$InlineCode('201'),
								$author$project$Blog$Content$Text(', but to heighten the differences here I upped the anti to '),
								$author$project$Blog$Content$InlineCode('200,000'),
								$author$project$Blog$Content$Text('. In the class '),
								$author$project$Blog$Content$InlineCode('BaselineSelect'),
								$author$project$Blog$Content$Text(', all that is done is a simple mapping using '),
								$author$project$Blog$Content$InlineCode('Select'),
								$author$project$Blog$Content$Text(' and the enumerable that\'s produced is consumed using a '),
								$author$project$Blog$Content$InlineCode('Consumer'),
								$author$project$Blog$Content$Text(' from Benchmark Dotnet.')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('BaselineSelect'),
										$author$project$Component$Table$Caption$Emphasis(' (200,000 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Baseline (T[])', '8.597 ms', '0.1263 ms', '0.1119 ms']),
									_List_fromArray(
									['Baseline (List<T>)', '9.402 ms', '0.0857 ms', '0.0801 ms']),
									_List_fromArray(
									['Baseline (Collection<T>)', '9.258 ms', '0.0871 ms', '0.0815 ms']),
									_List_fromArray(
									['Baseline (HashSet<T>)', '9.928 ms', '0.0916 ms', '0.0856 ms']),
									_List_fromArray(
									['Baseline (Dictionary<T1, T2>)', '11.066 ms', '0.0634 ms', '0.0562 ms'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('As you can see, '),
								$author$project$Blog$Content$InlineCode('T[]'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('Dictionary<T1, T2>'),
								$author$project$Blog$Content$Text(' stand out for being noticeably better and worse respectively. This helps establish some\r\n                baseline expectations about iterating through these data structures. Any call to iterate through a '),
								$author$project$Blog$Content$InlineCode('T[]'),
								$author$project$Blog$Content$Text(' will be significantly faster than '),
								$author$project$Blog$Content$InlineCode('Dictionary<T1, T2>'),
								$author$project$Blog$Content$Text(' since in the latter case a lot of translation from the dictionary structure to something\r\n                resembling an '),
								$author$project$Blog$Content$InlineCode('IEnumerable<KeyValuePair<T1, T2>>'),
								$author$project$Blog$Content$Text(' needs to occur.')
							])),
						$author$project$Blog$Content$Heading('Dictionary.Values'),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('In fact, '),
								$author$project$Blog$Content$InlineCode('Dictionary<T1, T2>'),
								$author$project$Blog$Content$Text(' (or '),
								$author$project$Blog$Content$InlineCode('Dictionary<TKey, TValue>'),
								$author$project$Blog$Content$Text(') comes with such high penalties for iterating through it, that I wanted to see whether\r\n                iterating instead through a dictionary\'s '),
								$author$project$Blog$Content$InlineCode('Values'),
								$author$project$Blog$Content$Text(', which is a '),
								A2($author$project$Blog$Content$ExternalLink, 'https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.valuecollection?view=net-5.0', 'ValueCollection'),
								$author$project$Blog$Content$Text(', would yield better results. When iterating this, only the dictionary\'s '),
								$author$project$Blog$Content$InlineCode('TValue'),
								$author$project$Blog$Content$Text('s are yielded. This removes the overhead of needing to construct '),
								$author$project$Blog$Content$InlineCode('KeyValuePair<TKey, TValue>'),
								$author$project$Blog$Content$Text('s. Below, I compare mapping through the dictionary itself vs mapping its '),
								$author$project$Blog$Content$InlineCode('Values'),
								$author$project$Blog$Content$Text('. Again, this is using a higher than usual count of data, '),
								$author$project$Blog$Content$InlineCode('200,000'),
								$author$project$Blog$Content$Text(', to heighten the differences.')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('DictionaryValuesSelectVsDictionarySelect'),
										$author$project$Component$Table$Caption$Emphasis(' (200,000 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Values.Select(pred)', '9.601 ms', '0.0232 ms', '0.0217 ms']),
									_List_fromArray(
									['Select(pred)', '11.118 ms', '0.0729 ms', '0.0646 ms'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Likewise, '),
								$author$project$Blog$Content$InlineCode('First'),
								$author$project$Blog$Content$Text(', which again incurs translation when iterating through the dictionary to '),
								$author$project$Blog$Content$InlineCode('KeyValuePair<TKey, TValue>'),
								$author$project$Blog$Content$Text('s, can benefit from grabbing the '),
								$author$project$Blog$Content$InlineCode('Values'),
								$author$project$Blog$Content$Text('. Note the below values are from querying over data with a count of just '),
								$author$project$Blog$Content$InlineCode('201'),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('DictionaryValuesFirstVsDictionaryFirstValue'),
										$author$project$Component$Table$Caption$Emphasis(' (201 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Values.First(pred)', '1.963 us', '0.0089 us', '0.0079 us']),
									_List_fromArray(
									['First(pred).Value', '3.244 us', '0.0123 us', '0.0115 us'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Working with a dictionary, '),
								$author$project$Blog$Content$InlineCode('First(pred)'),
								$author$project$Blog$Content$Text(' won\'t be the most efficient way to grab an element. Generally you should be able to access\r\n                that element by some hashable index that you\'ve chosen (might be a '),
								$author$project$Blog$Content$InlineCode('Guid'),
								$author$project$Blog$Content$Text(' id, for example), to get the '),
								$author$project$Blog$Content$InlineCode('O(1)'),
								$author$project$Blog$Content$Text(' constant complexity performance. If, however, for whatever reason you need to get the first\r\n                element in a dictionary where you can\'t get the element by its hashed index, then it may be worth\r\n                grabbing the '),
								$author$project$Blog$Content$InlineCode('Values'),
								$author$project$Blog$Content$Text(' collection.')
							])),
						$author$project$Blog$Content$Heading('Order Matters'),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('If you were hoping that you could enjoy the same query optimisation techniques you can get\r\n                with SQL, it\'s important to confirm that order does indeed matter. The delegates that you pass LINQ\r\n                methods '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('can')
									])),
								$author$project$Blog$Content$Text(' have side effects, so they need to be executed in the order they\'re defined. I\'ve used a\r\n                simple filter -> map to compare the results.')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('SelectWhereVsWhereSelect'),
										$author$project$Component$Table$Caption$Emphasis(' (200 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Select -> Where (T[])', '8.656 μs', '0.0091 μs', '0.0076 μs']),
									_List_fromArray(
									['Where -> Select (T[])', '2.582 μs', '0.0106 μs', '0.0088 μs']),
									_List_fromArray(
									['Select -> Where (List<T>)', '9.217 μs', '0.0247 μs', '0.0231 μs']),
									_List_fromArray(
									['Where -> Select (List<T>)', '3.381 μs', '0.0325 μs', '0.0288 μs']),
									_List_fromArray(
									['Select -> Where (Collection<T>)', '9.892 μs', '0.0163 μs', '0.0145 μs']),
									_List_fromArray(
									['Where -> Select (Collection<T>)', '4.069 μs', '0.0048 μs', '0.0040 μs']),
									_List_fromArray(
									['Select -> Where (HashSet<T>)', '9.646 μs', '0.0095 μs', '0.0084 μs']),
									_List_fromArray(
									['Where -> Select (HashSet<T>)', '3.985 μs', '0.0047 μs', '0.0042 μs']),
									_List_fromArray(
									['Select -> Where (Dictionary<T1, T2>)', '11.338 μs', '0.0103 μs', '0.0086 μs']),
									_List_fromArray(
									['Where -> Select (Dictionary<T1, T2>)', '4.917 μs', '0.0111 μs', '0.0104 μs'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Perhaps it\'s just me, but when combining deduplication and filtering, it felt like\r\n                deduplication should come first. My intuition (which was wrong...), made me feel that filtering over\r\n                the reduced subset of elements post-deduplication would be the better option. I confirmed just how\r\n                wrong I was by comparing the two possible orders.')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('WhereDistinctVsDistinctWhere'),
										$author$project$Component$Table$Caption$Emphasis(' (200 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Where -> Distinct (T[])', '2.533 μs', '0.0038 μs', '0.0032 μs']),
									_List_fromArray(
									['Distinct -> Where (T[])', '8.346 μs', '0.0135 μs', '0.0113 μs']),
									_List_fromArray(
									['Where -> Distinct (List<T>)', '3.276 μs', '0.0023 μs', '0.0021 μs']),
									_List_fromArray(
									['Distinct -> Where (List<T>)', '8.734 μs', '0.0090 μs', '0.0080 μs']),
									_List_fromArray(
									['Where -> Distinct (Collection<T>)', '3.959 μs', '0.0041 μs', '0.0039 μs']),
									_List_fromArray(
									['Distinct -> Where (Collection<T>)', '8.725 μs', '0.0144 μs', '0.0127 μs']),
									_List_fromArray(
									['Where -> Distinct (HashSet<T>)', '3.886 μs', '0.0043 μs', '0.0041 μs']),
									_List_fromArray(
									['Distinct -> Where (HashSet<T>)', '8.828 μs', '0.0070 μs', '0.0058 μs']),
									_List_fromArray(
									['Where -> Distinct (Dictionary<T1, T2>)', '5.829 μs', '0.0070 μs', '0.0066 μs']),
									_List_fromArray(
									['Distinct -> Where (Dictionary<T1, T2>)', '11.460 μs', '0.0145 μs', '0.0129 μs'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('You can see that '),
								$author$project$Blog$Content$InlineCode('Distinct'),
								$author$project$Blog$Content$Text(' is a pretty expensive operation. I was interested to see how expensive it was based on how\r\n                many unique elements '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('(i.e., unique according to whatever implementation of '),
										A2($author$project$Blog$Content$ExternalLink, 'https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.iequalitycomparer-1?view=net-5.0', 'IEqualityComparer<T>'),
										$author$project$Blog$Content$Text(' you gave it)')
									])),
								$author$project$Blog$Content$Text(' there are in the enumerable. To simplify the comparison, I stuck just to '),
								$author$project$Blog$Content$InlineCode('T[]'),
								$author$project$Blog$Content$Text(' and modified how many unique elements there are in a collection of '),
								$author$project$Blog$Content$InlineCode('200'),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('WhereDistinctVsDistinctWhere_DifferingLevelsOfDistinctness'),
										$author$project$Component$Table$Caption$Emphasis(' (200 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Where -> Distinct (10 distinct elems)', '6.168 μs', '0.0979 μs', '0.0916 μs']),
									_List_fromArray(
									['Distinct -> Where (10 distinct elems)', '8.770 μs', '0.1653 μs', '0.1837 μs']),
									_List_fromArray(
									['Where -> Distinct (50 distinct elems)', '5.565 μs', '0.0576 μs', '0.0539 μs']),
									_List_fromArray(
									['Distinct -> Where (50 distinct elems)', '10.088 μs', '0.1474 μs', '0.1379 μs']),
									_List_fromArray(
									['Where -> Distinct (100 distinct elems)', '5.511 μs', '0.0502 μs', '0.0469 μs']),
									_List_fromArray(
									['Distinct -> Where (100 distinct elems)', '10.050 μs', '0.1769 μs', '0.1655 μs']),
									_List_fromArray(
									['Where -> Distinct (150 distinct elems)', '6.570 μs', '0.0385 μs', '0.0341 μs']),
									_List_fromArray(
									['Distinct -> Where (150 distinct elems)', '10.633 μs', '0.1500 μs', '0.1403 μs'])
								])
						}),
						$author$project$Blog$Content$Heading('Redundancy Matters ... sometimes'),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('That lack of magical optimisation extends to chained '),
								$author$project$Blog$Content$InlineCode('Where'),
								$author$project$Blog$Content$Text(' calls. Iteration through the resulting enumerable will happen as many times as you have calls\r\n                to '),
								$author$project$Blog$Content$InlineCode('Where'),
								$author$project$Blog$Content$Text('. This is somewhat unfortunate, since it can be tempting, depending on your style, to write \r\n                filters that should happen in series like '),
								$author$project$Blog$Content$InlineCode('myNumbers.Where(IsEven).Where(IsNegative)'),
								$author$project$Blog$Content$Text('. It would be nice if the provided delegates could be composed when combining '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('where')
									])),
								$author$project$Blog$Content$Text(' iterators, so that '),
								$author$project$Blog$Content$InlineCode('myNumbers'),
								$author$project$Blog$Content$Text(' in the example above would only need to be iterated over once. Without this black magic, you\r\n                may want to think of composing the '),
								$author$project$Blog$Content$InlineCode('IsEven'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('IsNegative'),
								$author$project$Blog$Content$Text(' methods yourself, if appropriate. As it were, the differences in performance are:')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('WhereWhereVsWhere'),
										$author$project$Component$Table$Caption$Emphasis(' (201 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Where -> Where (T[])', '807.9 ns', '1.28 ns', '1.19 ns']),
									_List_fromArray(
									['Where (T[])', '433.3 ns', '1.04 ns', '0.92 ns']),
									_List_fromArray(
									['Where -> Where (List<T>)', '1,576.7 ns', '10.42 ns', '9.75 ns']),
									_List_fromArray(
									['Where (List<T>)', '1,198.0 ns', '2.25 ns', '1.88 ns']),
									_List_fromArray(
									['Where -> Where (Collection<T>)', '2,210.4 ns', '5.40 ns', '5.06 ns']),
									_List_fromArray(
									['Where (Collection<T>)', '1,917.4 ns', '18.65 ns', '16.53 ns']),
									_List_fromArray(
									['Where -> Where (HashSet<T>)', '2,319.5 ns', '10.45 ns', '9.77 ns']),
									_List_fromArray(
									['Where (HashSet<T>)', '1,901.3 ns', '6.11 ns', '5.71 ns']),
									_List_fromArray(
									['Where -> Where (Dictionary<T1, T2>)', '4,122.7 ns', '12.19 ns', '10.18 ns']),
									_List_fromArray(
									['Where (Dictionary<T1, T2>)', '3,925.7 ns', '7.04 ns', '6.25 ns'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Looking at these numbers, you might be forgiven (i.e., I might be forgiven 😉) for believing\r\n                that the same penalisation would apply to chaining '),
								$author$project$Blog$Content$InlineCode('Select'),
								$author$project$Blog$Content$Text(' calls. The following, however, shows that this is not the case:')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('SelectSelectVsSelect'),
										$author$project$Component$Table$Caption$Emphasis(' (200,000 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Select -> Select (T[])', '20.68 ms', '0.176 ms', '0.165 ms']),
									_List_fromArray(
									['Select (T[])', '20.75 ms', '0.171 ms', '0.160 ms']),
									_List_fromArray(
									['Select -> Select (List<T>)', '21.38 ms', '0.252 ms', '0.236 ms']),
									_List_fromArray(
									['Select (List<T>)', '21.19 ms', '0.148 ms', '0.138 ms']),
									_List_fromArray(
									['Select -> Select (Collection<T>)', '21.31 ms', '0.116 ms', '0.097 ms']),
									_List_fromArray(
									['Select (Collection<T>)', '21.49 ms', '0.215 ms', '0.201 ms']),
									_List_fromArray(
									['Select -> Select (HashSet<T>)', '21.65 ms', '0.156 ms', '0.146 ms']),
									_List_fromArray(
									['Select (HashSet<T>)', '21.46 ms', '0.145 ms', '0.135 ms']),
									_List_fromArray(
									['Select -> Select (Dictionary<T1, T2>)', '23.52 ms', '0.271 ms', '0.253 ms']),
									_List_fromArray(
									['Select (Dictionary<T1, T2>)', '23.75 ms', '0.184 ms', '0.163 ms'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('It would seem then that some optimisations are being performed on '),
								$author$project$Blog$Content$InlineCode('Select'),
								$author$project$Blog$Content$Text(' that aren\'t '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('(or aren\'t yet)')
									])),
								$author$project$Blog$Content$Text(' being performed on '),
								$author$project$Blog$Content$InlineCode('Where'),
								$author$project$Blog$Content$Text('.')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: '... the not-so-surprising', K: 'Lessons I learnt'})
			}),
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'Visible confusion GIF',
							ay: $author$project$Blog$Content$ComplexAttribute(
								{aV: 'https://giphy.com', bk: 'Giphy.com'}),
							be: 'https://media.giphy.com/media/1oJLpejP9jEvWQlZj4/giphy.gif'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('A lot of the benchmarks I wrote confirmed hunches and helped clarify the severity of the\r\n                differences in performance between equivalent methods. Some routine ones, however, exposed some pretty\r\n                interesting surprises.')
							])),
						$author$project$Blog$Content$Heading('When double-enumeration doesn\'t matter'),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Have a look at the following where I compare '),
								$author$project$Blog$Content$InlineCode('Select(delegate).Contains'),
								$author$project$Blog$Content$Text(' with '),
								$author$project$Blog$Content$InlineCode('Any'),
								$author$project$Blog$Content$Text(':')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('SelectContainsVsAnyBenchmark'),
										$author$project$Component$Table$Caption$Emphasis(' (201 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Select -> Contains (T[])', '1.246 μs', '0.0020 μs', '0.0017 μs']),
									_List_fromArray(
									['Any (T[])', '1.223 μs', '0.0027 μs', '0.0025 μs']),
									_List_fromArray(
									['Select -> Contains (List<T>)', '1.873 μs', '0.0056 μs', '0.0052 μs']),
									_List_fromArray(
									['Any (List<T>)', '1.923 μs', '0.0118 μs', '0.0111 μs']),
									_List_fromArray(
									['Select -> Contains (Collection<T>)', '1.813 μs', '0.0163 μs', '0.0145 μs']),
									_List_fromArray(
									['Any (Collection<T>)', '1.227 μs', '0.0035 μs', '0.0032 μs']),
									_List_fromArray(
									['Select -> Contains (HashSet<T>)', '2.576 μs', '0.0075 μs', '0.0070 μs']),
									_List_fromArray(
									['Any (HashSet<T>)', '1.850 μs', '0.0025 μs', '0.0021 μs']),
									_List_fromArray(
									['Select -> Contains (Dictionary<T1, T2>)', '3.739 μs', '0.0045 μs', '0.0042 μs']),
									_List_fromArray(
									['Any (Dictionary<T1, T2>)', '3.155 μs', '0.0075 μs', '0.0066 μs'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Since the '),
								$author$project$Blog$Content$InlineCode('Select(delegate).Contains'),
								$author$project$Blog$Content$Text(' incurs a double enumeration of the iterable source, my intuition would tell me that it will\r\n                always be slower than '),
								$author$project$Blog$Content$InlineCode('Any'),
								$author$project$Blog$Content$Text(', which only requires a single enumeration. As we saw before when establishing the baseline\r\n                and examining chained '),
								$author$project$Blog$Content$InlineCode('Where'),
								$author$project$Blog$Content$Text(' calls, there\'s always a price to be paid for the enumeration through the enumerable data\r\n                structure. And this is generally the case above, except curiously enough for '),
								$author$project$Blog$Content$InlineCode('T[]'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('List<T>'),
								$author$project$Blog$Content$Text(' where here the difference between the two methods is negligible. Yet even a '),
								$author$project$Blog$Content$InlineCode('Collection<T>'),
								$author$project$Blog$Content$Text(' shows a marked improvement when choosing '),
								$author$project$Blog$Content$InlineCode('Any'),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('There\'s no punchline here. I\'m actually at a loss to explain it, since it seems as though the\r\n                time taken for '),
								$author$project$Blog$Content$InlineCode('T[]'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('List<T>'),
								$author$project$Blog$Content$Text(' is just exempt from the rules. The results are relatively the same when I bump the count of\r\n                the data source up to '),
								$author$project$Blog$Content$InlineCode('200,000'),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Heading('Filtering vs finding'),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('The biggest surprise for me though comes when comparing '),
								$author$project$Blog$Content$InlineCode('Where(predicate).FirstOrDefault'),
								$author$project$Blog$Content$Text(' against '),
								$author$project$Blog$Content$InlineCode('FirstOrDefault(predicate)'),
								$author$project$Blog$Content$Text('. Again, the intuition that the former incurs double-enumeration and thus it must be worse\r\n                actually doesn\'t hold up here.')
							])),
						$author$project$Blog$Content$Table(
						{
							u: $elm$core$Maybe$Just(
								_List_fromArray(
									[
										$author$project$Component$Table$Caption$Text('Results of '),
										$author$project$Component$Table$Caption$InlineCode('WhereThenFirstOrDefaultVsFirstOrDefault'),
										$author$project$Component$Table$Caption$Emphasis(' (201 items)')
									])),
							v: _List_fromArray(
								['Method', 'Mean', 'Error', 'Std Dev']),
							y: _List_fromArray(
								[
									_List_fromArray(
									['Where -> First or Default (T[])', '688.8 ns', '1.07 ns', '0.89 ns']),
									_List_fromArray(
									['First or Default (T[])', '1,282.1 ns', '2.76 ns', '2.45 ns']),
									_List_fromArray(
									['Where -> First or Default (List<T>)', '1,391.0 ns', '2.78 ns', '2.60 ns']),
									_List_fromArray(
									['First or Default (List<T>)', '2,041.6 ns', '4.65 ns', '4.35 ns']),
									_List_fromArray(
									['Where -> First or Default (Collection<T>)', '1,808.3 ns', '4.97 ns', '4.64 ns']),
									_List_fromArray(
									['First or Default (Collection<T>)', '2,004.6 ns', '23.88 ns', '21.17 ns']),
									_List_fromArray(
									['Where -> First or Default (HashSet<T>)', '2,031.0 ns', '4.93 ns', '4.61 ns']),
									_List_fromArray(
									['First or Default (HashSet<T>)', '1,979.5 ns', '3.38 ns', '3.00 ns']),
									_List_fromArray(
									['Where -> First or Default (Dictionary<T1, T2>)', '3,253.9 ns', '4.31 ns', '3.82 ns']),
									_List_fromArray(
									['First or Default (Dictionary<T1, T2>)', '3,122.0 ns', '8.47 ns', '7.93 ns'])
								])
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$InlineCode('T[]'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('List<T>'),
								$author$project$Blog$Content$Text(' show a significant improvement when doing '),
								$author$project$Blog$Content$InlineCode('Where(predicate).FirstOrDefault'),
								$author$project$Blog$Content$Text(' over simply finding the first thing using '),
								$author$project$Blog$Content$InlineCode('FirstOrDefault(predicate)'),
								$author$project$Blog$Content$Text('.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('The trick here is that the implementation of '),
								$author$project$Blog$Content$InlineCode('Where'),
								$author$project$Blog$Content$Text(' creates special iterators for '),
								$author$project$Blog$Content$InlineCode('T[]'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('List<T>'),
								$author$project$Blog$Content$Text(' that appear to make use of those types, whereas '),
								$author$project$Blog$Content$InlineCode('FirstOrDefault'),
								$author$project$Blog$Content$Text(' and, it appears, '),
								$author$project$Blog$Content$InlineCode('First'),
								$author$project$Blog$Content$Text(' do not. '),
								A2($author$project$Blog$Content$ExternalLink, 'https://github.com/dotnet/runtime/issues/19382', 'This GitHub issue'),
								$author$project$Blog$Content$Text(' raises this problem, and there should be a fix for this inconsistency on the horizon.')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: '... the head-scratchers', K: 'Surprises I found'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('As mentioned, LINQ isn\'t going to be your choice if you\'re looking for high-performing code.\r\n                It can, however, be a great tool in writing concise, declarative code, particularly if you\'re leaning\r\n                towards Functional Programming. This alone can lower the cost in maintaining current code and delivering\r\n                additional functionality. When it comes to choosing not '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('whether')
									])),
								$author$project$Blog$Content$Text(', but '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('how')
									])),
								$author$project$Blog$Content$Text(' you use LINQ, some key takeaways are:')
							])),
						$author$project$Blog$Content$Collection(
						_List_fromArray(
							[
								{bk: 'A dictionary is great for retrieving items by a known index. They\'re less great for\r\n                  simply iterating through them, item by item. If you do need to do this, consider iterating through the\r\n                  dictionary\'s \'Values\' property instead. This doesn\'t greatly impact the clarity of the code, but it\r\n                  does positively affect performance.', K: 'Avoid iterating through a dictionary where possible'},
								{bk: 'Whilst it may sometimes appear more concise to layout your query with multiple chained\r\n                  \'Where\' filters, you may also be paying for redundant enumerations. Instead consider composing\r\n                  multiple predicates, even if just to a local helper function / method, that is then used when\r\n                  iterating once.', K: 'Order and invokation count matters'},
								{bk: 'Currently, there are proven performance gains in favouring \'Where(predicate).First\' over\r\n                  \'First(predicate)\' (and similarly for \'FirstOrDefault(predicate)\'), and it\'s still relatively concise\r\n                  language for the query. That said, this is relying on a particular hitch in the implementation detail,\r\n                  and there\'s no promise that you\'ll continue to have this performance benefit in future, altering the\r\n                  cost / benefit ratio.', K: 'Consider \'Where(predicate).First\' instead of \'First(predicate)\', but don\'t rely on it'}
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('As always, don\'t just take my word for it - if you\'re concerned about performance of your\r\n                code, always look to prove the benefits of alternatives with benchmarking.')
							]))
					]),
				K: $elm$core$Maybe$Nothing
			})
		]);
};
var $author$project$Blog$Content$TextAttribute = function (a) {
	return {$: 0, a: a};
};
var $author$project$Blog$ProgrammingAsASecondLanguage$getContent = function (_v0) {
	return _List_fromArray(
		[
			$author$project$Blog$Content$Title('Programming as a Second Language'),
			$author$project$Blog$Content$SubTitle('... and why I\'m glad I\'ve learnt / taught a second language'),
			$author$project$Blog$Content$WhenCreated(
			A3($justinmimbs$date$Date$fromCalendarDate, 2020, 0, 26)),
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'Useless teacher',
							ay: $author$project$Blog$Content$TextAttribute('Memecenter'),
							be: '/assets/img/meme3.jpg'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('I have come to the world of programming relatively late, at least compared\r\n                to some other people I work with. For anyone who has ever suffered with '),
								A2($author$project$Blog$Content$ExternalLink, 'https://www.youtube.com/watch?v=eqhUHyVpAwE', 'Imposter Syndrome'),
								$author$project$Blog$Content$Text(', you can understand how that might be quite daunting. It can feel like \r\n            you\'ve been wasting all this time and potential on travel, tangential job paths and other \r\n            pursuits.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Prior to my current career, I worked mainly in the teaching of music and\r\n            English as a Second Language. These weren\'t just gigs for money: I\'ve been genuinely\r\n            interested in both. When I look at how these jobs fit in with my current trajectory, I\r\n            scratch my head regarding music, but I\'ve some ideas about how teaching / learning a\r\n            second language has helped me as a programmer, and why I\'d encourage anyone considering\r\n            it to give it a go.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This article, then, describes how a pursuit that may seem irrelevant at\r\n                first to working as a software developer actually benefits me. If you have any\r\n                similar experience of working in a seemingly unrelated area, try to reflect on ways\r\n                in which it may actually come in handy for you.')
							]))
					]),
				K: $elm$core$Maybe$Nothing
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('You\'ll often here someone try to argue that their idea, pattern etc. is the '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('best')
									])),
								$author$project$Blog$Content$Text(' or the '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('correct')
									])),
								$author$project$Blog$Content$Text(' way to do something. The larger that concept is, e.g. '),
								A2($author$project$Blog$Content$ExternalLink, 'https://www.jinfonet.com/resources/bi-defined/3-tier-architecture-complete-overview/', 'Three Tier Architecture'),
								$author$project$Blog$Content$Text(', the dearer they\'d likely hold it to their hearts, even though the larger\r\n                the concept is the more likely a '),
								A2($author$project$Blog$Content$ExternalLink, 'https://jimmybogard.com/vertical-slice-architecture/', 'viable alternative exists'),
								$author$project$Blog$Content$Text('. If you\'ve learnt some aspects of a foreign language, however, you can \r\n                see that there is a multitude of different, equally valid ways of attacking the \r\n                same problem.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('English places a lot of importance '),
								A2($author$project$Blog$Content$ExternalLink, 'https://www.toeflgoanywhere.org/importance-word-order-english', 'on the order of words within a sentence'),
								$author$project$Blog$Content$Text('. '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('\'The boy ate the burger\'')
									])),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('\'the burger ate the boy\'')
									])),
								$author$project$Blog$Content$Text(' are two very different news stories. This is because the language places\r\n                meaning into the order by codifying a \'Subject\' \'Verb\' \'Object\' pattern. Basically,\r\n                due to the burger coming first in the second sentence, '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('it')
									])),
								$author$project$Blog$Content$Text(' is the thing doing the eating. In Russian, however, '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('\'мальчик ест гамбургер\'')
									])),
								$author$project$Blog$Content$Text(' would mean \'the boy is eating a hamburger\', whereas '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('\'мальчика ест гамбургер\'')
									])),
								$author$project$Blog$Content$Text(' is a viable way of saying \'the hamburger is eating a boy\'. It would be\r\n                unusual to present the information in this way, since there are still patterns and\r\n                conventions in word order in Russian to keep things predictable (in a good way), \r\n                but the \'source of truth\' in the sentence\'s meaning would be the declension of the\r\n                adjectives / nouns and the conjugation of the verbs. In '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('\'мальчика ест гамбургер\'')
									])),
								$author$project$Blog$Content$Text(', we know that the boy is the object of the sentence only due to the extra\r\n                \'а\' appearing at the end of the word \'мальчик\'. Pretty sneaky...')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('A parallel in programming that comes to mind is the use of positional\r\n                arguments for a function or method vs named arguments (or, where that\'s not possible,\r\n                an arguments object). For example, in JavaScript, we might:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nconst processValues = (name, email, password, dateOfBirth, hasConsented) => {\r\n    // We process the positional arguments in some way\r\n}\r\n\r\n// We then call this function like so\r\nprocessValues(\'Boris\', \'boris.y@rumbler.ru\', \'admin\', \'01-02-1931\', true);\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('We\'ve placed a lot of importance on the order of words here. Essentially,\r\n                \'boris.y@rumbler.ru\' is only being interpreted as an email because of the somewhat\r\n                arbitrary order of arguments sent to the function. If someone wanted to refactor\r\n                this function by changing this order (if they, I don\'t know, really hate themselves),\r\n                there would be many unintended consequences as now names will be treated as emails\r\n                and dates of birth as passwords etc.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Alternatively, we could give the arguments meaning in and of themselves,\r\n                allowing them to be understood without the need for them to appear in a particular\r\n                order. One way to achieve this in JavaScript would be to:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nconst processValues = (args) => {\r\n    // We process the arguments object in some way using args.name, args.email etc.\r\n}\r\n\r\n// Or, we can just use deconstruction to keep things clearer\r\n\r\nconst processValues = ({ name, email, password, dateOfBirth, hasConsented }) => {\r\n    // We process the deconstructed arguments object in some way\r\n}\r\n\r\n// We then call this function like so\r\nprocessValues({ \r\n    name: \'Boris\', \r\n    email: \'boris.y@rumbler.ru\', \r\n    password: \'admin\', \r\n    dateOfBirth: \'01-02-1931\', \r\n    hasConsented: true\r\n});\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This may seem less concise than the above option of using positional\r\n                arguments, which is why it may be overkill when a function has one or two arguments,\r\n                particularly when the order of those arguments is intuitive given the nature of the\r\n                function. The benefit, though, is there is no longer any meaning coupled with the\r\n                order of the arguments as given. If that same self-hating developer wanted to\r\n                refactor the function, they can move around the parameters to please themselves,\r\n                since JavaScript would be matching on property name, not the parameter order.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('As an analogy to English\'s and Russian\'s approach to word order, then, we \r\n                can choose whether we want to place meaning in the order the words appear, or \r\n                whether we want the words to describe their own meaning in that function. Both are\r\n                entirely valid options, and each will be most useful in certain circumstances.')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: '', K: 'There will never be one correct way'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'Less is more',
							ay: $author$project$Blog$Content$ComplexAttribute(
								{aV: 'https://unsplash.com/@sarahdorweiler?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge', bk: 'Photo by Sarah Dorweiler on Unsplash'}),
							be: '/assets/img/sarah-dorweiler-x2Tmfd1-SgA-unsplash.jpg'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('When teaching ESL, you\'re by nature of it communicating with people who\r\n                don\'t usually understand English very well... in English. That puts a lot of \r\n                pressure in being highly concise. Fewer words are often better. A long sentence can \r\n                often mask the truly important word or words that the students should be focusing \r\n                on.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('When writing code, the audience isn\'t really the computer. Your compiler\r\n                doesn\'t care how sensible your variable names are, but other developers who '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('will')
									])),
								$author$project$Blog$Content$Text(' have to understand your code some day will care, and they are your\r\n                audience. In this sense, then, you are writing a foreign language that will be read\r\n                and (ideally) understood by someone else for whom this is also a foreign language.\r\n                Imagine if we wrote all our instructions to a computer in Latin: knowing that\r\n                your colleague would have to make sense of it all, you would hopefully settle for -\r\n                where the option exists - simpler grammar and vocabulary.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Additionally, '),
								A2($author$project$Blog$Content$ExternalLink, 'https://danieljscheufler.wordpress.com/2016/12/27/code-is-read-more-often-than-it-is-written/', 'code is read more often that it is written'),
								$author$project$Blog$Content$Text('. Especially if what you\'re writing is a \'hot path\' in terms of other\r\n                developers being required to read and understand it, you should treat it as\r\n                optimisation to pause, think, and make your code as straight forward and to the\r\n                point as possible. Some examples might be:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nvar numbers = new[] { 1, 2, 3 };\r\n\r\nvar result = new List<int>();\r\nfor (var i = 0; i < numbers.Count(); i++)\r\n{\r\n    var num = numbers[i];\r\n    if (num > 1)\r\n    {\r\n        var a = num * num;\r\n        result.Add(a);\r\n    }\r\n}\r\n\r\nConsole.WriteLine(result);\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This will get the job done. And for some, this is very readable, '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('concise')
									])),
								$author$project$Blog$Content$Text(' code. For me, though, the intention (signal) is lost in a sea of words\r\n                (noise). I don\'t want another developer to have to explore the bowels of my code to\r\n                understand it. Ideally, they could understand this more from the surface. So I might\r\n                instead use:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nvar numbers = new[] { 1, 2, 3 };\r\n\r\nvar result = numbers\r\n    .Where(num => num > 1)\r\n    .Select(num => num * num);\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Not only is there the immediately noticeable advantage of '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('\'Oh hey, there are fewer words to read\'')
									])),
								$author$project$Blog$Content$Text(', but those words are also more declarative. We could read this simply as')
							])),
						$author$project$Blog$Content$BlockQuote('The result is the numbers where they\'re greater than 1, mapping each one\r\n            by multiplying it by itself.'),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('For anyone reading along who is unfamiliar with C# Linq syntax, you may have \r\n                even understood it by inference. This is of course a contrived example, and it\'s \r\n                probably fine leaving it where it is, but if you were to imagine that the callback \r\n                passed to the '),
								$author$project$Blog$Content$InlineCode('.Where'),
								$author$project$Blog$Content$Text(' and '),
								$author$project$Blog$Content$InlineCode('.Select'),
								$author$project$Blog$Content$Text(' methods were less trivial, and risked obfuscating this code, the use of\r\n                some local functions / private helper methods can alleviate this, to make it:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nvar numbers = new[] { 1, 2, 3 };\r\n\r\nvar result = numbers\r\n    .Where(NumberGreaterThanOne)\r\n    .Select(SquareNumber);\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('This only makes the broader code more concise if those callback functions\r\n                themselves are reasonable, something that the process of attempting to name them\r\n                may illuminate. Let\'s say some sick joke meant that the query ignored the last item:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n// Notice our named helper method is becoming less concise\r\nvar result = numbers\r\n    .Where(NumberGreaterThanOneAndItemNotLast)\r\n    .Select(SquareNumber);\r\n\r\n// Whereas, if we were to keep these separate\r\nvar result = numbers\r\n    .Where(NumberGreaterThanOne)\r\n    .Where(ItemNotLast)\r\n    .Select(SquareNumber);\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Here, it was seen that it didn\'t make sense to shove two very different\r\n                actions into one private helper method, which resulted essentially in two calls to\r\n                the '),
								$author$project$Blog$Content$InlineCode('.Where'),
								$author$project$Blog$Content$Text(' method. It\'s arguable this is inefficient, and I would agree that\r\n                (particularly in languages that don\'t have any optimisation of these collection-based\r\n                functions) this - to a computer - may seem excessive, but hopefully to a human\r\n                reader this splits out the filtering requirements more discretely and concisely.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Starting with a simple base that other developers can easily understand\r\n                also makes it easier to add required embellishments later. Examples include a retry \r\n                policy surrounding a network call, or error logging to record exceptions occurred \r\n                during a HTTP request. Hopefully, the next developer, with a concentrated purpose,\r\n                will also be able to contribute to the shared codebase in an equally focused\r\n                manner.')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: '... less is more', K: 'Be concise'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('ESL, perhaps unintuitively for the lay person, is often taught with English\r\n                as the medium when the teacher is a native speaker. This forces you to -\r\n                particularly when you have students at varying levels - learn how to communicate\r\n                complex ideas at varying levels of complexity. This isn\'t just applicable when\r\n                trying to explain to a child that \'I do, you do, but he / she / it '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('does')
									])),
								$author$project$Blog$Content$Text('\', but also useful when giving an overview to your non-technical manager\r\n                how you\'re going to implement your new system\'s architecture. If you can\'t boil\r\n                down some pretty complicated ideas into a form that\'s palatable to them, you might\r\n                not be able to justify some of your work or argue some of your decisions.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Learning a second language draws a number of parallels with learning a\r\n                programming language. There is a syntax, a vocabulary - there are areas in which\r\n                there\'s no room for movement or interpretation, and others where the lines are less\r\n                clear. Broadly, though, I think you can learn a lot about your communication with\r\n                others, as well as an appreciation for the vast array of ways in which we can say\r\n                the same thing with our code.')
							]))
					]),
				K: $elm$core$Maybe$Nothing
			})
		]);
};
var $author$project$Blog$ThreeBestPractices$getContent = function (_v0) {
	return _List_fromArray(
		[
			$author$project$Blog$Content$Title('3 Best Practices in programming'),
			$author$project$Blog$Content$SubTitle('... and how there are no Best Practices'),
			$author$project$Blog$Content$WhenCreated(
			A3($justinmimbs$date$Date$fromCalendarDate, 2019, 10, 15)),
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('We\'ve all had that argument with another developer where\r\n        we\'ve reasonably laid out our position why it would be a good idea to do something,\r\n        only to be met with')
							])),
						$author$project$Blog$Content$BlockQuote('Yes, but best practice...'),
						$author$project$Blog$Content$Image(
						{
							aw: 'boom-mic-drop',
							ay: $author$project$Blog$Content$TextAttribute('GIPHY'),
							be: 'https://media.giphy.com/media/d0NnEG1WnnXqg/giphy.gif'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('and that\'s all they need to say. And how can you respond to that? \'Sure, then I want to do\r\n            something less than best\' hardly wins anyone over. They\'ve said the relevant buzzword and we can now just\r\n            switch off our brains and do what the man on the Internet told us to do. If you\'ve never had this\r\n            conversation before, congratulations.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('For me, however, experience in this conversation brings me to my first 😓 blargh post. I want\r\n            to show you that there are no strictly '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('best')
									])),
								$author$project$Blog$Content$Text(' practices and remind you that everything really does\r\n            depend on the situation.')
							]))
					]),
				K: $elm$core$Maybe$Nothing
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('My last workplace had a severely pro-commenting culture, with rules for commenting '),
								$author$project$Blog$Content$InlineCode('private'),
								$author$project$Blog$Content$Text(' methods and simple object properties. This led to wonders such as...')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n/// <summary>\r\n/// Returns the current value of this object.\r\n/// </summary>\r\n/// <returns>The current value of this object</returns>\r\npublic int GetValue() =>\r\n    this.Value\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('with more text explaining than doing, regardless of whether the code is already\r\n            completely unambiguous. Worse still, this can easily be...')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\n/// <summary>\r\n/// Returns the current value of this object.\r\n/// </summary>\r\n/// <returns>The current value of this object</returns>\r\npublic int GetValue() =>\r\n    this.Value ?? throw new InvalidOperationException();\r\n            ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('at which point, the comments don\'t even mention the most surprising '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('feature')
									])),
								$author$project$Blog$Content$Text(' about this method, which is that if it\'s called when '),
								$author$project$Blog$Content$InlineCode('this.Value'),
								$author$project$Blog$Content$Text(' is '),
								$author$project$Blog$Content$InlineCode('null'),
								$author$project$Blog$Content$Text(' then we\'re gonna explode!')
							])),
						$author$project$Blog$Content$Image(
						{
							aw: 'explosions',
							ay: $author$project$Blog$Content$TextAttribute('GIPHY'),
							be: 'https://media.giphy.com/media/13d2jHlSlxklVe/giphy.gif'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('On the other side of this spectrum is my current workplace, which strictly believes\r\n            that all code should be self-descriptive enough to not warrant any comments, ever. And there are some good\r\n            reasons:')
							])),
						$author$project$Blog$Content$Collection(
						_List_fromArray(
							[
								{bk: 'We deal with tight deadlines and a lot of words to process. I am human, and if there are\r\n            reasonable shortcuts to take, I\'ll take them. First things first, you\'re well-versed yet untestable code\r\n            comments.', K: 'Programmers will barely read your code, let alone the comments that go with it'},
								{bk: 'If you change what a JavaScript function returns without changing your JS Doc, then you\'re\r\n            no better than those that use social engineering to convince old ladies you work at her bank.', K: 'The compiler can never know whether your comments are correct anymore'},
								{bk: 'There\'s no such thing as a free sandwich, and I have found myself wasting very real time\r\n            in order to satisfy commenting standards that either my workplace or university had.', K: 'Maintenance costs'},
								{bk: 'Walls of description can distract coders from the nuts and bolts of the code, and if the\r\n            comments become stale (where the code has moved on but the comment has not been updated) then they only\r\n            cause confusion.', K: 'There\'s no guarantee your code will be easier to understand'}
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('That said, there is a time and place for documentation. The more your actual code can\r\n            inform this, the better. For example, think how your typed API is self-documenting when you have a\r\n            method...')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nTask<bool> ItemExistsAsync(string itemId);\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Immediately, I know that I need to give it a '),
								$author$project$Blog$Content$InlineCode('string'),
								$author$project$Blog$Content$Text(' identifier of an item, and I can '),
								$author$project$Blog$Content$InlineCode('await'),
								$author$project$Blog$Content$Text(' a '),
								$author$project$Blog$Content$InlineCode('boolean'),
								$author$project$Blog$Content$Text(' answer. Or even better, if you dabble a little more with '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('functional')
									])),
								$author$project$Blog$Content$Text(' patterns...')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nEither<Error, Item> GetItem(string itemId);\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('From this, I can see that I\'ll either get an '),
								$author$project$Blog$Content$InlineCode('Error'),
								$author$project$Blog$Content$Text(' (if something went wrong) or I\'ll get the '),
								$author$project$Blog$Content$InlineCode('Item'),
								$author$project$Blog$Content$Text(' I was looking for. This even means I don\'t need to dig into the bowels of the method to\r\n                discover that it might actually '),
								$author$project$Blog$Content$InlineCode('throw'),
								$author$project$Blog$Content$Text(' an exception (or even rely on code comments to describe this to me).')
							])),
						$author$project$Blog$Content$BlockQuote('Cool, so what do you suggest?'),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('I\'m glad you asked. I would consider the following when determining whether you should\r\n            use comments or not.')
							])),
						$author$project$Blog$Content$Collection(
						_List_fromArray(
							[
								{bk: 'This can be difficult, since it\'ll always be understandable to the author, which is why a\r\n                  code review process can be very useful.', K: 'Is the code understandable without it?'},
								{bk: 'If there\'s a certain if condition that makes people\'s eyes bleed and scratch their heads,\r\n                  then perhaps you can assign that condition to a named function.', K: 'Can I make things clearer by refactoring?'},
								{bk: 'Consider whether the caller of some code is able to see it. For example, a private method\r\n                will be called from within the same class, so if a developer is working on the caller, they will have\r\n                full access to it. If you\'re writing the outer API of some library code (or, using OpenAPI, documenting\r\n                a HTTP API) there\'ll likely be more value in commenting, since the consumer perhaps won\'t be able to\r\n                peer into the code as easily.', K: 'How accessible is the code to the caller?'}
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: 'Everyone\'s favourite pastime', K: '1. Commenting'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'shifty-eyes',
							ay: $author$project$Blog$Content$TextAttribute('GIPHY'),
							be: 'https://media.giphy.com/media/32b3S2YQbby2A/giphy.gif'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('It\'s generally considered best practice to not trust the calling code, and to always\r\n            check your arguments. But while you might not trust the guy down the street, do you trust your neighbours?\r\n            It isn\'t completely black and white, and some thought should be given to how defensive you need to be.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('I\'ve seen, for example, code imitated by the following in a web application that uses\r\n            Dependency Injection to provide dependencies:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\npublic MyService(\r\n    object depA,\r\n    object depB,\r\n    object depN\r\n)\r\n{\r\n    this.depA = depA ?? throw new ArgumentNullException(nameof(depA));\r\n    this.depB = depB ?? throw new ArgumentNullException(nameof(depB));\r\n    this.depN = depN ?? throw new ArgumentNullException(nameof(depN));\r\n}\r\n                ', H: 'cs'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Since it was expected behaviour of the '),
								$author$project$Blog$Content$InlineCode('MyService'),
								$author$project$Blog$Content$Text(' class to '),
								$author$project$Blog$Content$InlineCode('throw'),
								$author$project$Blog$Content$Text(' if any of its dependencies were '),
								$author$project$Blog$Content$InlineCode('null'),
								$author$project$Blog$Content$Text(', this of course came with unit tests verifying this expected behaviour.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Within the context of web-application code (where a consumer of your application\r\n            typically communicates via HTTP), this code isn\'t really library code and a developer designing this class\r\n            is likely going to be in a position to check the calling code. Also, keeping that same context in mind,\r\n        we know we\'re in a position where the dependencies are guaranteed by our DI framework to be resolved and\r\n        delivered; if a dependency cannot be resolved from the DI container, then with our setup an exception will be\r\n        thrown and the '),
								$author$project$Blog$Content$InlineCode('MyService'),
								$author$project$Blog$Content$Text(' class will not be constructed.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('So you '),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('could')
									])),
								$author$project$Blog$Content$Text(' see these checks as redundant. And whilst C# (above) let\'s you tidy this up with the null\r\n                coalescing ('),
								$author$project$Blog$Content$InlineCode('??'),
								$author$project$Blog$Content$Text(') operator, in some other languages this can become more distracting. There are two main ends\r\n                of the spectrum to be on with this.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('You could say '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('I trust no one')
									])),
								$author$project$Blog$Content$Text(', and I can\'t guarantee that this class will always be resolved through Dependency Injection.\r\n                Even then, we may switch DI frameworks, the standard behaviour may be different and we might end up\r\n                trying to construct this class with '),
								$author$project$Blog$Content$InlineCode('null'),
								$author$project$Blog$Content$Text(' dependencies.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('You could also say '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('Take responsibility when calling me')
									])),
								$author$project$Blog$Content$Text(', and decide that if a caller has attempted to manually construct this class with a '),
								$author$project$Blog$Content$InlineCode('null'),
								$author$project$Blog$Content$Text(' dependency, then they\'ve violated the class\' type contract (which asks in this example case\r\n                for an '),
								$author$project$Blog$Content$InlineCode('object'),
								$author$project$Blog$Content$Text(', not an '),
								$author$project$Blog$Content$InlineCode('object'),
								$author$project$Blog$Content$Emphasised(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text(' or ')
									])),
								$author$project$Blog$Content$InlineCode('null'),
								$author$project$Blog$Content$Text(') and can no longer have any expectations about its behaviour.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('There\'s truth to both positions. It may be better in your situation to put responsibility on\r\n                the caller in order to minimise the bloat and complexity of this class, allowing it to evolve faster\r\n                (I\'ve given an example of a '),
								$author$project$Blog$Content$InlineCode('class'),
								$author$project$Blog$Content$Text('\' constructor, but this can apply to any of its methods\' arguments, including complex object\r\n                arguments). Or it may be, particularly if you\'re writing deeper-level library code, more appropriate to\r\n                guard against every inch of input you get from calling code.')
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: 'Trust no one', K: '2. Get defensive'})
			}),
			$author$project$Blog$Content$Divider,
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Image(
						{
							aw: 'square-wheels',
							ay: $author$project$Blog$Content$TextAttribute('GIPHY'),
							be: 'https://media.giphy.com/media/UP5CZUXC5dH1K/giphy.gif'
						}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Taken to the extreme, someone might want to import libraries (especially large utility\r\n            libraries, such as '),
								$author$project$Blog$Content$InlineCode('lodash.js'),
								$author$project$Blog$Content$Text(') to get the job done for them. After all, someone else has likely written this functionality\r\n            before, and particularly if it\'s a popular, open-source code base, it\'s likely undergone more scrutiny than\r\n            my (given company policy) private repository will ever receive.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('There\'s nothing wrong with this line of thinking, in most cases. It\'s been some years\r\n            since the '),
								A2($author$project$Blog$Content$ExternalLink, 'https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/', '2016 chaos caused by pulling a\r\n            commonly-shared dependency'),
								$author$project$Blog$Content$Text(', the '),
								$author$project$Blog$Content$InlineCode('npm'),
								$author$project$Blog$Content$Text(' package '),
								A2($author$project$Blog$Content$ExternalLink, 'https://www.npmjs.com/package/left-pad', 'left-pad'),
								$author$project$Blog$Content$Text('. While it may be an extreme example, it does point out that sometimes wheels <b>can</b> be\r\n                reinvented. It\'s a cost / value ratio between the time it would take you to rewrite this functionality,\r\n                vs the \'costs\' (which may be your JS bundle size, or your coupling to a certain library / framework)\r\n                involved in importing something pre-rolled. For example, if you\'re in need of a function to recursively\r\n                flatten an array, consider the following code before importing half of '),
								$author$project$Blog$Content$InlineCode('lodash.js'),
								$author$project$Blog$Content$Text(' to do it for you:')
							])),
						$author$project$Blog$Content$CodeBlock(
						{F: '\r\nfunction flattenArray(array) {\r\n    return array.reduce(\r\n        (accumulator, current) => (Array.isArray(current)\r\n            ? accumulator.concat(flattenArray(current))\r\n            : accumulator.concat(current)),\r\n        []);\r\n}\r\n                ', H: 'js'}),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Sure, certain aspects of it could be improved, the main one, depending on your project\'s\r\n                policy on defensiveness, would be checking the given '),
								$author$project$Blog$Content$InlineCode('array'),
								$author$project$Blog$Content$Text('. The costs would be the requirement of testing this function, and maintaining it in the\r\n            inevitable circumstance where you now need this function to flatten to a certain depth level. The benefits,\r\n            however, is that you would have negated the need for depending on a large library.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Library code is complicated because it needs to incorporate a huge (and potentially growing)\r\n                range of callers, which might bring issues with environment, language version and unreasonable,\r\n                unexpected yet possible input. Even if you\'re not sure about your own abilities, you might find it a lot\r\n        simpler rolling your own in some cases, since you can keep your solution scoped to the needs of\r\n        your own project. Having actually written the functionality yourself, you\'ll also have '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('a)')
									])),
								$author$project$Blog$Content$Text(' learnt how it works in detail (making it easier to debug / reason about) and '),
								$author$project$Blog$Content$Strong(
								_List_fromArray(
									[
										$author$project$Blog$Content$Text('b)')
									])),
								$author$project$Blog$Content$Text(' improved your abilities.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('I have been both on projects that import everything, usually landing us in some form\r\n            of dependency hell or another, and ones that attempt to start from scratch on everything. Before deciding,\r\n        consider:')
							])),
						$author$project$Blog$Content$Collection(
						_List_fromArray(
							[
								{bk: 'You might not know up front. That\'s okay; if you\'ve given it an hour of your time, you\'ll\r\n            likely already understand whether this is looking like a reasonable function, or whether you\'re starting to\r\n            write the code that you will labour over for another month.', K: 'What\'s the size / complexity of this functionality I want?'},
								{bk: 'If the only library you can find hasn\'t been updated (when it likely should have been) for\r\n            years, has no public support / interest, with unaddressed / ignored issues, or would lock you into some tech\r\n            stack you don\'t want a part of, I wouldn\'t touch it with a ten-foot pole.', K: 'What\'s available that\'s already done this?'},
								{bk: 'If someone eagerly imported the whole of lodash because it seemed like you\'d need a lot of\r\n                its functionality moving forward, then it turned out you only needed a couple of functions (and the\r\n                needed functionality was spread out across modules so cherry-picking wasn\'t an option), there\'s nothing\r\n                stopping you from adapting the source code of the few functions you need and killing the import. There\r\n                would be a simple way to remove that dependency on that library.', K: 'Will we be able to get out of this?'}
							]))
					]),
				K: $elm$core$Maybe$Just(
					{aq: 'But why not try square tyres?', K: '3. Don\'t reinvent the wheel'})
			}),
			$author$project$Blog$Content$Section(
			{
				Y: _List_fromArray(
					[
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('There are countless other examples of \'best practices\' that people follow\r\n            dogmatically, even when over time \'best practices\' go through complete paradigm shifts (going from\r\n            Object-Oriented approaches to Functional-Oriented ones, de-duplicated data to allowing duplication where\r\n            read performance may be improved). You will likely, at first, just follow these and keep your head down.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('As you improve your own understanding of what it is you\'re doing as a developer,\r\n            however, start to ask \'why?\', even against well-established \'best practices\' that no one else questions. In\r\n            any case you\'ll come to understand the root reason why you should follow this rule, and be able to stop\r\n            telling people \'We should do this because it\'s best practice\'. You may even come to realise this practice\r\n            that is usually good isn\'t very appropriate for your given situation.')
							])),
						$author$project$Blog$Content$Paragraph(
						_List_fromArray(
							[
								$author$project$Blog$Content$Text('Or at the very least, you can feel the rage burn through your veins next week when\r\n            some other dev rips out your lovingly crafted function that was working just fine to import a library,\r\n            saying \'Haven\'t they even read about best practices here?\'')
							]))
					]),
				K: $elm$core$Maybe$Nothing
			})
		]);
};
var $author$project$Article$getContent = function (slug) {
	switch (slug) {
		case 0:
			return $author$project$Blog$ThreeBestPractices$getContent(0);
		case 1:
			return $author$project$Blog$ProgrammingAsASecondLanguage$getContent(0);
		case 2:
			return $author$project$Blog$AreYouProvidingValue$getContent(0);
		case 3:
			return $author$project$Blog$EitherPatternNetworkCalls$getContent(0);
		default:
			return $author$project$Blog$LinqPerformanceLessons$getContent(0);
	}
};
var $elm$html$Html$main_ = _VirtualDom_node('main');
var $elm$html$Html$b = _VirtualDom_node('b');
var $elm$html$Html$blockquote = _VirtualDom_node('blockquote');
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $elm$html$Html$h5 = _VirtualDom_node('h5');
var $elm$html$Html$i = _VirtualDom_node('i');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$section = _VirtualDom_node('section');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $elm$html$Html$caption = _VirtualDom_node('caption');
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$html$Html$em = _VirtualDom_node('em');
var $author$project$Component$Table$Caption$viewCaptionSegment = function (segment) {
	switch (segment.$) {
		case 0:
			var t = segment.a;
			return $elm$html$Html$text(t);
		case 1:
			var t = segment.a;
			return A2(
				$elm$html$Html$code,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('language-markup')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(t)
					]));
		default:
			var t = segment.a;
			return A2(
				$elm$html$Html$em,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(t)
					]));
	}
};
var $author$project$Component$Table$Caption$viewCaption = function (c) {
	return A2(
		$elm$html$Html$caption,
		_List_Nil,
		A2($elm$core$List$map, $author$project$Component$Table$Caption$viewCaptionSegment, c));
};
var $elm$html$Html$td = _VirtualDom_node('td');
var $author$project$Component$Table$viewRow = function (row) {
	return A2(
		$elm$html$Html$tr,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (cell) {
				return A2(
					$elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(cell)
						]));
			},
			row));
};
var $author$project$Component$Table$view = function (model) {
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('striped')
			]),
		A2(
			$elm$core$List$cons,
			$author$project$Component$Table$Caption$viewCaption(
				A2($elm$core$Maybe$withDefault, _List_Nil, model.u)),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$thead,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$tr,
							_List_Nil,
							A2(
								$elm$core$List$map,
								function (h) {
									return A2(
										$elm$html$Html$th,
										_List_Nil,
										_List_fromArray(
											[
												$elm$html$Html$text(h)
											]));
								},
								model.v))
						])),
					A2(
					$elm$html$Html$tbody,
					_List_Nil,
					A2($elm$core$List$map, $author$project$Component$Table$viewRow, model.y))
				])));
};
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $author$project$Page$Article$viewCodeBlock = function (codeBlock) {
	return A2(
		$elm$html$Html$pre,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('language-' + codeBlock.H)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$code,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(codeBlock.F)
					]))
			]));
};
var $author$project$Page$Article$viewCollectionItem = function (collectionItem) {
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('collection-item')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h5,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(collectionItem.K)
					])),
				A2(
				$elm$html$Html$p,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(collectionItem.bk)
					]))
			]));
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		case 5:
			return 6;
		case 6:
			return 7;
		case 7:
			return 8;
		case 8:
			return 9;
		case 9:
			return 10;
		case 10:
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		case 7:
			return 6;
		case 8:
			return 7;
		case 9:
			return 8;
		case 10:
			return 9;
		case 11:
			return 10;
		default:
			return 11;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {aD: d, aW: m, bs: y};
			}
		}
	});
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0;
	var y = $justinmimbs$date$Date$year(rd);
	return {
		aj: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		bs: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0;
	var date = $justinmimbs$date$Date$toOrdinalDate(rd);
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.bs, 0, date.aj);
};
var $justinmimbs$date$Date$day = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.aD;
	});
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.aW;
	});
var $justinmimbs$date$Date$monthNumber = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToNumber);
var $justinmimbs$date$Date$ordinalDay = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toOrdinalDate,
	function ($) {
		return $.aj;
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $justinmimbs$date$Date$padSignedInt = F2(
	function (length, _int) {
		return _Utils_ap(
			(_int < 0) ? '-' : '',
			A3(
				$elm$core$String$padLeft,
				length,
				'0',
				$elm$core$String$fromInt(
					$elm$core$Basics$abs(_int))));
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$daysBeforeWeekYear = function (y) {
	var jan4 = $justinmimbs$date$Date$daysBeforeYear(y) + 4;
	return jan4 - $justinmimbs$date$Date$weekdayNumber(jan4);
};
var $elm$time$Time$Fri = 4;
var $elm$time$Time$Mon = 0;
var $elm$time$Time$Sat = 5;
var $elm$time$Time$Sun = 6;
var $elm$time$Time$Thu = 3;
var $elm$time$Time$Tue = 1;
var $elm$time$Time$Wed = 2;
var $justinmimbs$date$Date$numberToWeekday = function (wdn) {
	var _v0 = A2($elm$core$Basics$max, 1, wdn);
	switch (_v0) {
		case 1:
			return 0;
		case 2:
			return 1;
		case 3:
			return 2;
		case 4:
			return 3;
		case 5:
			return 4;
		case 6:
			return 5;
		default:
			return 6;
	}
};
var $justinmimbs$date$Date$toWeekDate = function (_v0) {
	var rd = _v0;
	var wdn = $justinmimbs$date$Date$weekdayNumber(rd);
	var wy = $justinmimbs$date$Date$year(rd + (4 - wdn));
	var week1Day1 = $justinmimbs$date$Date$daysBeforeWeekYear(wy) + 1;
	return {
		bn: 1 + (((rd - week1Day1) / 7) | 0),
		bo: wy,
		b5: $justinmimbs$date$Date$numberToWeekday(wdn)
	};
};
var $justinmimbs$date$Date$weekNumber = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.bn;
	});
var $justinmimbs$date$Date$weekYear = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toWeekDate,
	function ($) {
		return $.bo;
	});
var $justinmimbs$date$Date$weekday = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$weekdayNumber, $justinmimbs$date$Date$numberToWeekday);
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $justinmimbs$date$Date$ordinalSuffix = function (n) {
	var nn = A2($elm$core$Basics$modBy, 100, n);
	var _v0 = A2(
		$elm$core$Basics$min,
		(nn < 20) ? nn : A2($elm$core$Basics$modBy, 10, nn),
		4);
	switch (_v0) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
};
var $justinmimbs$date$Date$withOrdinalSuffix = function (n) {
	return _Utils_ap(
		$elm$core$String$fromInt(n),
		$justinmimbs$date$Date$ordinalSuffix(n));
};
var $justinmimbs$date$Date$formatField = F4(
	function (language, _char, length, date) {
		switch (_char) {
			case 'y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$year(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$year(date));
				}
			case 'Y':
				if (length === 2) {
					return A2(
						$elm$core$String$right,
						2,
						A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekYear(date))));
				} else {
					return A2(
						$justinmimbs$date$Date$padSignedInt,
						length,
						$justinmimbs$date$Date$weekYear(date));
				}
			case 'Q':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 3:
						return 'Q' + $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					case 4:
						return $justinmimbs$date$Date$withOrdinalSuffix(
							$justinmimbs$date$Date$quarter(date));
					case 5:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$quarter(date));
					default:
						return '';
				}
			case 'M':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$monthNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$monthNumber(date)));
					case 3:
						return language._(
							$justinmimbs$date$Date$month(date));
					case 4:
						return language.ag(
							$justinmimbs$date$Date$month(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language._(
								$justinmimbs$date$Date$month(date)));
					default:
						return '';
				}
			case 'w':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekNumber(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$weekNumber(date)));
					default:
						return '';
				}
			case 'd':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$day(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$day(date)));
					case 3:
						return language.ac(
							$justinmimbs$date$Date$day(date));
					default:
						return '';
				}
			case 'D':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$ordinalDay(date));
					case 2:
						return A3(
							$elm$core$String$padLeft,
							2,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					case 3:
						return A3(
							$elm$core$String$padLeft,
							3,
							'0',
							$elm$core$String$fromInt(
								$justinmimbs$date$Date$ordinalDay(date)));
					default:
						return '';
				}
			case 'E':
				switch (length) {
					case 1:
						return language.M(
							$justinmimbs$date$Date$weekday(date));
					case 2:
						return language.M(
							$justinmimbs$date$Date$weekday(date));
					case 3:
						return language.M(
							$justinmimbs$date$Date$weekday(date));
					case 4:
						return language.at(
							$justinmimbs$date$Date$weekday(date));
					case 5:
						return A2(
							$elm$core$String$left,
							1,
							language.M(
								$justinmimbs$date$Date$weekday(date)));
					case 6:
						return A2(
							$elm$core$String$left,
							2,
							language.M(
								$justinmimbs$date$Date$weekday(date)));
					default:
						return '';
				}
			case 'e':
				switch (length) {
					case 1:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					case 2:
						return $elm$core$String$fromInt(
							$justinmimbs$date$Date$weekdayNumber(date));
					default:
						return A4($justinmimbs$date$Date$formatField, language, 'E', length, date);
				}
			default:
				return '';
		}
	});
var $justinmimbs$date$Date$formatWithTokens = F3(
	function (language, tokens, date) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (token, formatted) {
					if (!token.$) {
						var _char = token.a;
						var length = token.b;
						return _Utils_ap(
							A4($justinmimbs$date$Date$formatField, language, _char, length, date),
							formatted);
					} else {
						var str = token.a;
						return _Utils_ap(str, formatted);
					}
				}),
			'',
			tokens);
	});
var $justinmimbs$date$Pattern$Literal = function (a) {
	return {$: 1, a: a};
};
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = $elm$core$Basics$identity;
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0;
		return function (s0) {
			var _v1 = parseA(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				var _v2 = callback(a);
				var parseB = _v2;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
				}
			}
		};
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0;
		var parseB = _v1;
		return function (s0) {
			var _v2 = parseA(s0);
			if (_v2.$ === 1) {
				var p = _v2.a;
				var x = _v2.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _v2.a;
				var a = _v2.b;
				var s1 = _v2.c;
				var _v3 = parseB(s1);
				if (_v3.$ === 1) {
					var p2 = _v3.a;
					var x = _v3.b;
					return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _v3.a;
					var b = _v3.b;
					var s2 = _v3.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$parser$Parser$Expecting = function (a) {
	return {$: 0, a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$toToken = function (str) {
	return A2(
		$elm$parser$Parser$Advanced$Token,
		str,
		$elm$parser$Parser$Expecting(str));
};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {aC: col, bz: contextStack, a0: problem, a8: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 0};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.a8, s.aC, x, s.c));
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$core$Basics$not = _Basics_not;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return function (s) {
		var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.b, s.a8, s.aC, s.a);
		var newOffset = _v1.a;
		var newRow = _v1.b;
		var newCol = _v1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			$elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{aC: newCol, c: s.c, d: s.d, b: newOffset, a8: newRow, a: s.a});
	};
};
var $elm$parser$Parser$token = function (str) {
	return $elm$parser$Parser$Advanced$token(
		$elm$parser$Parser$toToken(str));
};
var $justinmimbs$date$Pattern$escapedQuote = A2(
	$elm$parser$Parser$ignorer,
	$elm$parser$Parser$succeed(
		$justinmimbs$date$Pattern$Literal('\'')),
	$elm$parser$Parser$token('\'\''));
var $elm$parser$Parser$UnexpectedChar = {$: 11};
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return function (s) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.b, s.a);
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{aC: 1, c: s.c, d: s.d, b: s.b + 1, a8: s.a8 + 1, a: s.a}) : A3(
				$elm$parser$Parser$Advanced$Good,
				true,
				0,
				{aC: s.aC + 1, c: s.c, d: s.d, b: newOffset, a8: s.a8, a: s.a}));
		};
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $justinmimbs$date$Pattern$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{aC: col, c: s0.c, d: s0.d, b: offset, a8: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.a8, s.aC, s);
	};
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$parser$Parser$Advanced$getOffset = function (s) {
	return A3($elm$parser$Parser$Advanced$Good, false, s.b, s);
};
var $elm$parser$Parser$getOffset = $elm$parser$Parser$Advanced$getOffset;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 12, a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return function (s) {
		return A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $justinmimbs$date$Pattern$fieldRepeats = function (str) {
	var _v0 = $elm$core$String$toList(str);
	if (_v0.b && (!_v0.b.b)) {
		var _char = _v0.a;
		return A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F2(
						function (x, y) {
							return A2($justinmimbs$date$Pattern$Field, _char, 1 + (y - x));
						})),
				A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$getOffset,
					$elm$parser$Parser$chompWhile(
						$elm$core$Basics$eq(_char)))),
			$elm$parser$Parser$getOffset);
	} else {
		return $elm$parser$Parser$problem('expected exactly one char');
	}
};
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (_v1.$ === 1) {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3($elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $justinmimbs$date$Pattern$field = A2(
	$elm$parser$Parser$andThen,
	$justinmimbs$date$Pattern$fieldRepeats,
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompIf($elm$core$Char$isAlpha)));
var $justinmimbs$date$Pattern$finalize = A2(
	$elm$core$List$foldl,
	F2(
		function (token, tokens) {
			var _v0 = _Utils_Tuple2(token, tokens);
			if (((_v0.a.$ === 1) && _v0.b.b) && (_v0.b.a.$ === 1)) {
				var x = _v0.a.a;
				var _v1 = _v0.b;
				var y = _v1.a.a;
				var rest = _v1.b;
				return A2(
					$elm$core$List$cons,
					$justinmimbs$date$Pattern$Literal(
						_Utils_ap(x, y)),
					rest);
			} else {
				return A2($elm$core$List$cons, token, tokens);
			}
		}),
	_List_Nil);
var $elm$parser$Parser$Advanced$lazy = function (thunk) {
	return function (s) {
		var _v0 = thunk(0);
		var parse = _v0;
		return parse(s);
	};
};
var $elm$parser$Parser$lazy = $elm$parser$Parser$Advanced$lazy;
var $justinmimbs$date$Pattern$isLiteralChar = function (_char) {
	return (_char !== '\'') && (!$elm$core$Char$isAlpha(_char));
};
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0;
		return function (s0) {
			var _v1 = parse(s0);
			if (!_v1.$) {
				var p = _v1.a;
				var a = _v1.b;
				var s1 = _v1.c;
				return A3(
					$elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $justinmimbs$date$Pattern$literal = A2(
	$elm$parser$Parser$map,
	$justinmimbs$date$Pattern$Literal,
	$elm$parser$Parser$getChompedString(
		A2(
			$elm$parser$Parser$ignorer,
			A2(
				$elm$parser$Parser$ignorer,
				$elm$parser$Parser$succeed(0),
				$elm$parser$Parser$chompIf($justinmimbs$date$Pattern$isLiteralChar)),
			$elm$parser$Parser$chompWhile($justinmimbs$date$Pattern$isLiteralChar))));
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (!_v1.$) {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$ExpectingEnd = {$: 10};
var $elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			$elm$core$String$length(s.a),
			s.b) ? A3($elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			$elm$parser$Parser$Advanced$Bad,
			false,
			A2($elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $justinmimbs$date$Pattern$quotedHelp = function (result) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (str) {
					return $justinmimbs$date$Pattern$quotedHelp(
						_Utils_ap(result, str));
				},
				$elm$parser$Parser$getChompedString(
					A2(
						$elm$parser$Parser$ignorer,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed(0),
							$elm$parser$Parser$chompIf(
								$elm$core$Basics$neq('\''))),
						$elm$parser$Parser$chompWhile(
							$elm$core$Basics$neq('\''))))),
				A2(
				$elm$parser$Parser$andThen,
				function (_v0) {
					return $justinmimbs$date$Pattern$quotedHelp(result + '\'');
				},
				$elm$parser$Parser$token('\'\'')),
				$elm$parser$Parser$succeed(result)
			]));
};
var $justinmimbs$date$Pattern$quoted = A2(
	$elm$parser$Parser$keeper,
	A2(
		$elm$parser$Parser$ignorer,
		$elm$parser$Parser$succeed($justinmimbs$date$Pattern$Literal),
		$elm$parser$Parser$chompIf(
			$elm$core$Basics$eq('\''))),
	A2(
		$elm$parser$Parser$ignorer,
		$justinmimbs$date$Pattern$quotedHelp(''),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					$elm$parser$Parser$chompIf(
					$elm$core$Basics$eq('\'')),
					$elm$parser$Parser$end
				]))));
var $justinmimbs$date$Pattern$patternHelp = function (tokens) {
	return $elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$parser$Parser$andThen,
				function (token) {
					return $justinmimbs$date$Pattern$patternHelp(
						A2($elm$core$List$cons, token, tokens));
				},
				$elm$parser$Parser$oneOf(
					_List_fromArray(
						[$justinmimbs$date$Pattern$field, $justinmimbs$date$Pattern$literal, $justinmimbs$date$Pattern$escapedQuote, $justinmimbs$date$Pattern$quoted]))),
				$elm$parser$Parser$lazy(
				function (_v0) {
					return $elm$parser$Parser$succeed(
						$justinmimbs$date$Pattern$finalize(tokens));
				})
			]));
};
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {aC: col, a0: problem, a8: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.a8, p.aC, p.a0);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0;
		var _v1 = parse(
			{aC: 1, c: _List_Nil, d: 1, b: 0, a8: 1, a: src});
		if (!_v1.$) {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (!_v0.$) {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $justinmimbs$date$Pattern$fromString = function (str) {
	return A2(
		$elm$core$Result$withDefault,
		_List_fromArray(
			[
				$justinmimbs$date$Pattern$Literal(str)
			]),
		A2(
			$elm$parser$Parser$run,
			$justinmimbs$date$Pattern$patternHelp(_List_Nil),
			str));
};
var $justinmimbs$date$Date$formatWithLanguage = F2(
	function (language, pattern) {
		var tokens = $elm$core$List$reverse(
			$justinmimbs$date$Pattern$fromString(pattern));
		return A2($justinmimbs$date$Date$formatWithTokens, language, tokens);
	});
var $justinmimbs$date$Date$monthToName = function (m) {
	switch (m) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		default:
			return 'December';
	}
};
var $justinmimbs$date$Date$weekdayToName = function (wd) {
	switch (wd) {
		case 0:
			return 'Monday';
		case 1:
			return 'Tuesday';
		case 2:
			return 'Wednesday';
		case 3:
			return 'Thursday';
		case 4:
			return 'Friday';
		case 5:
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $justinmimbs$date$Date$language_en = {
	ac: $justinmimbs$date$Date$withOrdinalSuffix,
	ag: $justinmimbs$date$Date$monthToName,
	_: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$monthToName,
		$elm$core$String$left(3)),
	at: $justinmimbs$date$Date$weekdayToName,
	M: A2(
		$elm$core$Basics$composeR,
		$justinmimbs$date$Date$weekdayToName,
		$elm$core$String$left(3))
};
var $justinmimbs$date$Date$format = function (pattern) {
	return A2($justinmimbs$date$Date$formatWithLanguage, $justinmimbs$date$Date$language_en, pattern);
};
var $author$project$Page$Article$viewDate = function (date) {
	return A2($justinmimbs$date$Date$format, 'MMMM d y', date);
};
var $elm$html$Html$Attributes$alt = $elm$html$Html$Attributes$stringProperty('alt');
var $author$project$Page$Article$viewAttribution = function (attributionInfo) {
	if (!attributionInfo.$) {
		var attribution = attributionInfo.a;
		return A2(
			$elm$html$Html$span,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('center-align')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(attribution)
				]));
	} else {
		var attribution = attributionInfo.a;
		return A2(
			$author$project$Widget$externalLink,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('center-align'),
					$elm$html$Html$Attributes$href(attribution.aV)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(attribution.bk)
				]));
	}
};
var $author$project$Page$Article$viewImage = function (imageInfo) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('d-flex align-items-centre flex-col')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$img,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('responsive-img'),
								$elm$html$Html$Attributes$src(imageInfo.be),
								$elm$html$Html$Attributes$alt(imageInfo.aw)
							]),
						_List_Nil)
					])),
				$author$project$Page$Article$viewAttribution(imageInfo.ay)
			]));
};
var $elm$html$Html$ol = _VirtualDom_node('ol');
var $elm$html$Html$strong = _VirtualDom_node('strong');
var $author$project$Page$Article$viewParagraphSegment = function (segment) {
	switch (segment.$) {
		case 0:
			var t = segment.a;
			return $elm$html$Html$text(t);
		case 3:
			var t = segment.a;
			return A2(
				$elm$html$Html$code,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('language-markup')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(t)
					]));
		case 1:
			var emphasisedTs = segment.a;
			return A2(
				$elm$html$Html$em,
				_List_Nil,
				A2($elm$core$List$map, $author$project$Page$Article$viewParagraphSegment, emphasisedTs));
		case 2:
			var strongTs = segment.a;
			return A2(
				$elm$html$Html$strong,
				_List_Nil,
				A2($elm$core$List$map, $author$project$Page$Article$viewParagraphSegment, strongTs));
		case 4:
			var link = segment.a;
			var label = segment.b;
			return A2(
				$author$project$Widget$externalLink,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href(link)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(label)
					]));
		default:
			var link = segment.a;
			var label = segment.b;
			return A2(
				$elm$html$Html$a,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$href(link)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(label)
					]));
	}
};
var $author$project$Page$Article$viewListItem = function (paragraphSegments) {
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flow-text')
			]),
		A2($elm$core$List$map, $author$project$Page$Article$viewParagraphSegment, paragraphSegments));
};
var $author$project$Page$Article$viewOrderedList = function (orderedList) {
	return A2(
		$elm$html$Html$ol,
		_List_Nil,
		A2($elm$core$List$map, $author$project$Page$Article$viewListItem, orderedList));
};
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $author$project$Page$Article$viewSectionTitle = function (maybeSectionTitle) {
	if (maybeSectionTitle.$ === 1) {
		return _List_fromArray(
			[
				$elm$html$Html$text('')
			]);
	} else {
		var sectionTitle = maybeSectionTitle.a;
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$h3,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(sectionTitle.K)
					])),
				A2(
				$elm$html$Html$h4,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(sectionTitle.aq)
					]))
			]);
	}
};
var $author$project$Page$Article$viewContent = function (content) {
	switch (content.$) {
		case 0:
			var title = content.a;
			return A2(
				$elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(title)
					]));
		case 1:
			var subTitle = content.a;
			return A2(
				$elm$html$Html$h2,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(subTitle)
					]));
		case 2:
			var when = content.a;
			return A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grey-text text-darken-3')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$author$project$Page$Article$viewDate(when))
					]));
		case 3:
			var heading = content.a;
			return A2(
				$elm$html$Html$h5,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$b,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$i,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(heading)
									]))
							]))
					]));
		case 4:
			var paragraph = content.a;
			return A2(
				$elm$html$Html$p,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flow-text')
					]),
				A2($elm$core$List$map, $author$project$Page$Article$viewParagraphSegment, paragraph));
		case 6:
			var quote = content.a;
			return A2(
				$elm$html$Html$blockquote,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flow-text')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(quote)
					]));
		case 8:
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('divider')
					]),
				_List_Nil);
		case 7:
			var imageInfo = content.a;
			return $author$project$Page$Article$viewImage(imageInfo);
		case 5:
			var sectionInfo = content.a;
			return $author$project$Page$Article$viewSection(sectionInfo);
		case 10:
			var collection = content.a;
			return A2(
				$elm$html$Html$ul,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('collection')
					]),
				A2($elm$core$List$map, $author$project$Page$Article$viewCollectionItem, collection));
		case 9:
			var codeBlock = content.a;
			return $author$project$Page$Article$viewCodeBlock(codeBlock);
		case 11:
			var orderedList = content.a;
			return $author$project$Page$Article$viewOrderedList(orderedList);
		default:
			var table = content.a;
			return $author$project$Component$Table$view(table);
	}
};
var $author$project$Page$Article$viewSection = function (sectionInfo) {
	return A2(
		$elm$html$Html$section,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('section')
			]),
		_Utils_ap(
			$author$project$Page$Article$viewSectionTitle(sectionInfo.K),
			A2($elm$core$List$map, $author$project$Page$Article$viewContent, sectionInfo.Y)));
};
var $author$project$Page$Article$view = function (model) {
	return A2(
		$elm$html$Html$main_,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container')
			]),
		A2($elm$core$List$map, $author$project$Page$Article$viewContent, model));
};
var $author$project$Component$Card$viewAction = function (action) {
	return action.ae ? A2(
		$author$project$Widget$externalLink,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href(action.aV)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(action.bk)
			])) : A2(
		$elm$html$Html$a,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$href(action.aV)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(action.bk)
			]));
};
var $author$project$Component$Card$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('card purple hoverable')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-content white-text')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('card-title')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(model.K)
							])),
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(model.bk)
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('card-action purple darken-3')
					]),
				A2($elm$core$List$map, $author$project$Component$Card$viewAction, model.au))
			]));
};
var $author$project$Page$Home$viewApps = function (_v0) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Apps')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('row')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('col s12 m6 l6')
						]),
					_List_fromArray(
						[
							$author$project$Component$Card$view(
							{
								au: _List_fromArray(
									[
										{aV: 'https://github.com/matthew-matvei/TerminalTetris', ae: true, bk: 'Play'}
									]),
								bk: '... a simple game of Tetris in the terminal',
								K: 'Terminal Tetris'
							})
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('col s12 m6 l6')
						]),
					_List_fromArray(
						[
							$author$project$Component$Card$view(
							{
								au: _List_fromArray(
									[
										{aV: 'https://github.com/matthew-matvei/wikiscape', ae: true, bk: 'Explore'}
									]),
								bk: '... see articles for nearby places of interest; perfect for exploring\r\n                home or abroad',
								K: 'Wikiscape'
							})
						]))
				]))
		]);
};
var $author$project$Component$Card$readArticleAction = function (link) {
	return {aV: link, ae: false, bk: 'Read'};
};
var $author$project$Page$Home$viewBlogArticles = function (_v0) {
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$h2,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Tech musings')
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('row')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('col s12 m6 l6')
						]),
					_List_fromArray(
						[
							$author$project$Component$Card$view(
							{
								au: _List_fromArray(
									[
										$author$project$Component$Card$readArticleAction('/blog/linq-performance-lessons')
									]),
								bk: '... when comparing logically equivalent methods',
								K: 'Lessons on performance with LINQ'
							})
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('col s12 m6 l6')
						]),
					_List_fromArray(
						[
							$author$project$Component$Card$view(
							{
								au: _List_fromArray(
									[
										$author$project$Component$Card$readArticleAction('/blog/no-best-practices')
									]),
								bk: '... and how there are no best practices',
								K: '3 Best Practices in programming'
							})
						]))
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('row')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('col s12 m6 l6')
						]),
					_List_fromArray(
						[
							$author$project$Component$Card$view(
							{
								au: _List_fromArray(
									[
										$author$project$Component$Card$readArticleAction('/blog/programming-as-a-second-language')
									]),
								bk: '... and why I\'m glad I\'ve learnt / taught a second language',
								K: 'Programming as a Second Language'
							})
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('col s12 m6 l6')
						]),
					_List_fromArray(
						[
							$author$project$Component$Card$view(
							{
								au: _List_fromArray(
									[
										$author$project$Component$Card$readArticleAction('/blog/are-you-providing-value')
									]),
								bk: '... and how the road to hell is paved with good intentions',
								K: 'Are you providing value?'
							})
						]))
				])),
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('row')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('col s12 m6 l6')
						]),
					_List_fromArray(
						[
							$author$project$Component$Card$view(
							{
								au: _List_fromArray(
									[
										$author$project$Component$Card$readArticleAction('/blog/either-pattern-for-network-calls')
									]),
								bk: '... for network calls',
								K: 'The Either / Result pattern'
							})
						]))
				]))
		]);
};
var $author$project$Page$Home$view = function (_v0) {
	return A2(
		$elm$html$Html$main_,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container')
			]),
		_Utils_ap(
			$author$project$Page$Home$viewApps(0),
			$author$project$Page$Home$viewBlogArticles(0)));
};
var $author$project$Page$NotFound$view = function (_v0) {
	return A2(
		$elm$html$Html$main_,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('container d-flex flex-col align-items-centre justify-content-centre')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h2,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grey-text text-darken-1')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Couldn\'t find it ☹')
					])),
				A2(
				$elm$html$Html$h3,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('grey-text text-darken-1')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('404')
					]))
			]));
};
var $author$project$Page$view = function (model) {
	var _v0 = model.ak;
	switch (_v0.$) {
		case 0:
			return $author$project$Page$NotFound$view(0);
		case 1:
			return $author$project$Page$Home$view(0);
		default:
			var slug = _v0.a;
			return $author$project$Page$Article$view(
				$author$project$Article$getContent(slug));
	}
};
var $author$project$Main$view = function (model) {
	var page = $author$project$Page$Model(
		$author$project$Page$fromRoute(model.am));
	return {
		bv: _List_fromArray(
			[
				$author$project$Header$view(0),
				$author$project$Page$view(page),
				$author$project$Footer$view(model.as)
			]),
		K: $author$project$Page$title(page)
	};
};
var $author$project$Main$main = $elm$browser$Browser$application(
	{bK: $author$project$Main$init, bW: $author$project$Main$UrlChanged, bX: $author$project$Main$LinkClicked, b0: $author$project$Main$subscriptions, b3: $author$project$Main$update, b4: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(0))(0)}});}(this));