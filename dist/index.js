var react = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var useMutation = function useMutation(method, initialData) {
  var _useState = react.useState(false),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = react.useState(),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = react.useState(initialData),
      data = _useState3[0],
      setData = _useState3[1];

  var methodRef = react.useRef(method);
  methodRef.current = method;

  var loadData = function loadData() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    try {
      var _temp2 = _catch(function () {
        setLoading(true);
        return Promise.resolve(methodRef.current.apply(methodRef, params)).then(function (res) {
          setLoading(false);
          setData(res);
        });
      }, function (e) {
        setLoading(false);
        setError(e);
        console.error(e);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return [loadData, {
    loading: loading,
    error: error,
    data: data
  }];
};

var useShouldUpdateEffect = function useShouldUpdateEffect(effect, deps, shouldUpdate) {
  var depsRef = react.useRef(deps);

  if (shouldUpdate(depsRef.current, deps)) {
    depsRef.current = deps;
  }

  react.useEffect(effect, depsRef.current);
};
var useCustomCompareEffect = function useCustomCompareEffect(effect, deps, compare) {
  return useShouldUpdateEffect(effect, deps, function () {
    return !compare.apply(void 0, arguments);
  });
};

// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

var useDeepCompareEffect = function useDeepCompareEffect(effect, deps) {
  if (deps === void 0) {
    deps = [];
  }

  return useCustomCompareEffect(effect, deps, fastDeepEqual);
};

var useRequest = function useRequest(_ref) {
  var method = _ref.method,
      _ref$defaultParams = _ref.defaultParams,
      defaultParams = _ref$defaultParams === void 0 ? {} : _ref$defaultParams,
      necessaryParams = _ref.necessaryParams,
      _ref$autoLoad = _ref.autoLoad,
      autoLoad = _ref$autoLoad === void 0 ? true : _ref$autoLoad,
      rest = _objectWithoutPropertiesLoose(_ref, ["method", "defaultParams", "necessaryParams", "autoLoad"]);

  var _useMutation = useMutation(method),
      _method = _useMutation[0],
      requestState = _useMutation[1];

  var paramRef = react.useRef(defaultParams);
  var necessaryParamsRef = react.useRef(necessaryParams);
  necessaryParamsRef.current = necessaryParams;

  var loadData = function loadData(_params) {
    if (_params === void 0) {
      _params = paramRef.current;
    }

    paramRef.current = _params;

    if (!requestState.loading) {
      var realParams = _extends({}, necessaryParamsRef.current, _params);

      _method(realParams, rest);
    }
  };

  var reload = function reload() {
    loadData();
  };

  useDeepCompareEffect(function () {
    if (autoLoad) {
      loadData();
    }
  }, [necessaryParams]);
  return _extends({
    search: loadData,
    reload: reload,
    params: _extends({}, necessaryParamsRef.current, paramRef.current)
  }, requestState);
};

var defaultFormatter = function defaultFormatter(data) {
  if (data === void 0) {
    data = {};
  }

  var _ref = data.content || {},
      _ref$total_records = _ref.total_records,
      total_records = _ref$total_records === void 0 ? 0 : _ref$total_records,
      _ref$records = _ref.records,
      records = _ref$records === void 0 ? [] : _ref$records;

  return {
    total: total_records,
    dataSource: records
  };
};

var useTable = function useTable(options) {
  var method = options.method,
      _options$defaultPageS = options.defaultPageSize,
      defaultPageSize = _options$defaultPageS === void 0 ? 10 : _options$defaultPageS,
      _options$necessaryPar = options.necessaryParams,
      necessaryParams = _options$necessaryPar === void 0 ? {} : _options$necessaryPar,
      _options$formatter = options.formatter,
      formatter = _options$formatter === void 0 ? defaultFormatter : _options$formatter,
      getAllKeys = options.getAllKeys,
      customRowSelection = options.rowSelection,
      rest = _objectWithoutPropertiesLoose(options, ["method", "defaultPageSize", "necessaryParams", "formatter", "getAllKeys", "rowSelection"]);

  var _useState = react.useState({
    current: 1,
    pageSize: defaultPageSize
  }),
      _useState$ = _useState[0],
      _useState$$current = _useState$.current,
      current = _useState$$current === void 0 ? 1 : _useState$$current,
      _useState$$pageSize = _useState$.pageSize,
      pageSize = _useState$$pageSize === void 0 ? defaultPageSize : _useState$$pageSize,
      onChangePaination = _useState[1];

  var _useState2 = react.useState([]),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];

  var realParams = _extends({}, necessaryParams, {
    page: current,
    page_size: pageSize
  });

  var _useRequest = useRequest(_extends({
    method: method,
    necessaryParams: realParams
  }, rest)),
      data = _useRequest.data,
      loading = _useRequest.loading,
      search = _useRequest.search,
      reload = _useRequest.reload;

  var _formatter = formatter(data),
      total = _formatter.total,
      dataSource = _formatter.dataSource;

  var onChange = function onChange(current, pageSize) {
    var toCurrent = current <= 0 ? 1 : current;
    var toPageSize = pageSize <= 0 ? 1 : pageSize;
    var tempTotalPage = Math.ceil(total / toPageSize);

    if (tempTotalPage && toCurrent > tempTotalPage) {
      toCurrent = tempTotalPage;
    }

    onChangePaination({
      current: toCurrent,
      pageSize: toPageSize
    });
  };

  var selections = false;

  if (getAllKeys) {
    selections = ['SELECT_INVERT', {
      key: 'select-all-pages',
      text: '选择全部',
      onSelect: function () {
        try {
          return Promise.resolve(getAllKeys === null || getAllKeys === void 0 ? void 0 : getAllKeys()).then(function (keys) {
            setSelectedRowKeys(keys);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }, {
      key: 'cancel-all-pages',
      text: '取消全部',
      onSelect: function onSelect() {
        setSelectedRowKeys([]);
      }
    }];
  }

  var rowSelection = customRowSelection ? {
    onChange: function onChange(selectedRowKeys) {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys: selectedRowKeys,
    preserveSelectedRowKeys: true,
    selections: selections
  } : undefined;

  if (customRowSelection && typeof customRowSelection === 'object') {
    Object.assign(rowSelection, customRowSelection);
  }

  var pagination = {
    current: current,
    pageSize: pageSize,
    total: total,
    onChange: onChange,
    onShowSizeChange: onChange
  };
  return {
    loading: loading,
    data: data,
    reload: reload,
    search: search,
    pagination: pagination,
    tableProps: {
      dataSource: dataSource,
      loading: loading,
      pagination: pagination,
      rowSelection: rowSelection
    }
  };
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var lodash_throttle = throttle;

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN$1 = 0 / 0;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim$1 = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary$1 = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal$1 = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt$1 = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf$1 = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax$1 = Math.max,
    nativeMin$1 = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now$1 = function() {
  return root$1.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce$1(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber$1(wait) || 0;
  if (isObject$1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin$1(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now$1());
  }

  function debounced() {
    var time = now$1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike$1(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber$1(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol$1(value)) {
    return NAN$1;
  }
  if (isObject$1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject$1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim$1, '');
  var isBinary = reIsBinary$1.test(value);
  return (isBinary || reIsOctal$1.test(value))
    ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex$1.test(value) ? NAN$1 : +value);
}

var lodash_debounce = debounce$1;

var useInterval = function useInterval(func, interval, deps) {
  if (deps === void 0) {
    deps = [];
  }

  var _useState = react.useState(),
      timer = _useState[0],
      setTimer = _useState[1];

  var funcRef = react.useRef(func);
  funcRef.current = func;

  var clear = function clear() {
    return clearInterval(timer);
  };

  react.useEffect(function () {
    var I = setInterval(function () {
      funcRef.current();
    }, interval);
    setTimer(I);
    return function () {
      return clearInterval(I);
    };
  }, deps);
  return clear;
};
var useTimeout = function useTimeout(func, timeout, deps) {
  if (deps === void 0) {
    deps = [];
  }

  var _useState2 = react.useState(),
      timer = _useState2[0],
      setTimer = _useState2[1];

  var funcRef = react.useRef(func);
  funcRef.current = func;

  var clear = function clear() {
    return clearTimeout(timer);
  };

  react.useEffect(function () {
    var T = setTimeout(funcRef.current, timeout);
    setTimer(T);
    return function () {
      return clearTimeout(T);
    };
  }, deps);
  return clear;
};
var useThrottledValue = function useThrottledValue(value, wait) {
  if (wait === void 0) {
    wait = 100;
  }

  var _useState3 = react.useState(),
      throttledValue = _useState3[0],
      setValue = _useState3[1];

  var setThrottledValue = react.useCallback(lodash_throttle(setValue, wait), []);
  react.useEffect(function () {
    setThrottledValue(value);
  }, [value]);
  return throttledValue;
};
var useDebouncedValue = function useDebouncedValue(value, wait) {
  if (wait === void 0) {
    wait = 100;
  }

  var _useState4 = react.useState(),
      debouncedValue = _useState4[0],
      setValue = _useState4[1];

  var setThrottledValue = react.useCallback(lodash_debounce(setValue, wait), []);
  react.useEffect(function () {
    setThrottledValue(value);
  }, [value]);
  return debouncedValue;
};

var useUnmount = function useUnmount(fn) {
  var fnRef = react.useRef();
  fnRef.current = fn;
  react.useEffect(function () {
    return fnRef.current;
  }, []);
};
var useIsUnmounted = function useIsUnmounted() {
  var isUnmountedRef = react.useRef(false);
  isUnmountedRef.current = false;
  useUnmount(function () {
    isUnmountedRef.current = true;
  });
  return isUnmountedRef.current;
};
var useIsMounted = function useIsMounted() {
  return !useIsUnmounted();
};

var useUpdateEffect = function useUpdateEffect(fn, deps) {
  var isMouted = react.useRef(false);
  react.useEffect(function () {
    if (isMouted.current) {
      return fn();
    } else {
      isMouted.current = true;
    }
  }, deps);
};

function getTargetElement(target, defaultElement) {
  if (!target) {
    return defaultElement;
  }

  var targetElement;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

var isDocumentVisible = function isDocumentVisible() {
  if (typeof document !== 'undefined' && typeof document.visibilityState !== 'undefined') {
    return document.visibilityState !== 'hidden';
  }

  return true;
};

var useEventListener = function useEventListener(target, eventName, listener) {
  var listenerRef = react.useRef(listener);
  listenerRef.current = listener;
  react.useEffect(function () {
    var targetElement = getTargetElement(target, window);

    if (!(targetElement !== null && targetElement !== void 0 && targetElement.addEventListener)) {
      return;
    }

    targetElement.addEventListener(eventName, listenerRef.current);
    return targetElement.removeEventListener.bind(targetElement, eventName, listenerRef.current);
  }, [eventName, target]);
};
var useSize = function useSize(ref) {
  var _useState = react.useState({
    width: 0,
    height: 0
  }),
      size = _useState[0],
      setSize = _useState[1];

  var _setSize = function _setSize() {
    setSize({
      width: ref.current ? ref.current.clientWidth : 0,
      height: ref.current ? ref.current.clientHeight : 0
    });
  };

  useEventListener(window, 'resize', _setSize);
  react.useEffect(function () {
    _setSize();
  }, []);
  return size;
};
var useDocumentVisible = function useDocumentVisible() {
  var _useState2 = react.useState(isDocumentVisible()),
      visible = _useState2[0],
      setVisible = _useState2[1];

  useEventListener(document, 'visibilitychange', function () {
    setVisible(isDocumentVisible());
  });
  return visible;
};
var defaultMouseAttribute = {
  pageX: NaN,
  pageY: NaN,
  screenX: NaN,
  screenY: NaN,
  x: NaN,
  y: NaN,
  clientX: NaN,
  clientY: NaN
};
var useMouse = function useMouse() {
  var _useState3 = react.useState(defaultMouseAttribute),
      attr = _useState3[0],
      setAttr = _useState3[1];

  useEventListener(window, 'mousemove', function (ev) {
    var pageX = ev.pageX,
        pageY = ev.pageY,
        screenX = ev.screenX,
        screenY = ev.screenY,
        x = ev.x,
        y = ev.y,
        clientX = ev.clientX,
        clientY = ev.clientY;
    setAttr({
      pageX: pageX,
      pageY: pageY,
      screenX: screenX,
      screenY: screenY,
      x: x,
      y: y,
      clientX: clientX,
      clientY: clientY
    });
  });
  return attr;
};

var usePolling = function usePolling(_ref) {
  var method = _ref.method,
      onReceive = _ref.onReceive,
      _ref$interval = _ref.interval,
      interval = _ref$interval === void 0 ? 1000 : _ref$interval,
      _ref$errorRetryCount = _ref.errorRetryCount,
      errorRetryCount = _ref$errorRetryCount === void 0 ? 0 : _ref$errorRetryCount,
      _ref$autoStart = _ref.autoStart,
      autoStart = _ref$autoStart === void 0 ? false : _ref$autoStart,
      _ref$pollingWhenHidde = _ref.pollingWhenHidden,
      pollingWhenHidden = _ref$pollingWhenHidde === void 0 ? false : _ref$pollingWhenHidde;

  var _useMutation = useMutation(method),
      _request = _useMutation[0],
      _useMutation$ = _useMutation[1],
      loading = _useMutation$.loading,
      error = _useMutation$.error,
      data = _useMutation$.data;

  var isMounted = useIsMounted();

  var _useState = react.useState(autoStart),
      polling = _useState[0],
      setPolling = _useState[1];

  var _useState2 = react.useState(errorRetryCount),
      retryCount = _useState2[0],
      setRetryCount = _useState2[1];

  var visible = useDocumentVisible();

  var request = function request() {
    if (pollingWhenHidden || visible) {
      setPolling(true);

      _request();
    }
  };

  var start = function start() {
    if (polling === false && isMounted) {
      request();
    }
  };

  var cancel = function cancel() {
    clear();
    setRetryCount(errorRetryCount);
    setPolling(false);
  };

  var onError = function onError() {
    if (retryCount) {
      setRetryCount(function (count) {
        return count - 1;
      });
      request();
    } else {
      cancel();
    }
  };

  var onSuccess = function onSuccess() {
    if (onReceive && onReceive(data) === true) {
      cancel();
    } else {
      request();
    }
  };

  var clear = useTimeout(function () {
    if (polling) {
      if (error) {
        onError();
      } else {
        onSuccess();
      }
    }
  }, interval, [data, error, polling]);
  useUpdateEffect(function () {
    if (!pollingWhenHidden && visible && polling) {
      request();
    }
  }, [visible]);
  useUnmount(function () {
    cancel();
  });
  return {
    start: start,
    cancel: cancel,
    loading: loading,
    data: data,
    polling: polling
  };
};

var useDrag = function useDrag(config) {
  if (config === void 0) {
    config = {};
  }

  return function (data) {
    return {
      draggable: 'true',
      key: JSON.stringify(data),
      onDragStart: function onDragStart(ev) {
        var _config$onDragStart, _config;

        ev.dataTransfer.setData('custom', JSON.stringify(data));
        (_config$onDragStart = (_config = config).onDragStart) === null || _config$onDragStart === void 0 ? void 0 : _config$onDragStart.call(_config, data, ev);
      },
      onDragEnd: function onDragEnd(ev) {
        var _config$onDragEnd, _config2;

        (_config$onDragEnd = (_config2 = config).onDragEnd) === null || _config$onDragEnd === void 0 ? void 0 : _config$onDragEnd.call(_config2, data, ev);
      }
    };
  };
};
var useDrop = function useDrop(options) {
  var _useState = react.useState(false),
      isHovering = _useState[0],
      setIsHovering = _useState[1];

  var optionsRef = react.useRef(options);
  optionsRef.current = options;
  var props = react.useMemo(function () {
    return {
      onDragOver: function onDragOver(ev) {
        ev.preventDefault();
      },
      onDrop: function onDrop(ev) {
        var _optionsRef$current$o, _optionsRef$current;

        ev.preventDefault();
        ev.persist();
        setIsHovering(false);
        var data = ev.dataTransfer.getData('custom');

        try {
          data = JSON.parse(data);
        } catch (err) {}

        (_optionsRef$current$o = (_optionsRef$current = optionsRef.current).onDrop) === null || _optionsRef$current$o === void 0 ? void 0 : _optionsRef$current$o.call(_optionsRef$current, data, ev);
      },
      onDragEnter: function onDragEnter(ev) {
        ev.preventDefault();
        setIsHovering(true);
      },
      onDragLeave: function onDragLeave(ev) {
        ev.preventDefault();
        setIsHovering(false);
      }
    };
  }, [setIsHovering]);
  return [props, {
    isHovering: isHovering
  }];
};

var useDragableBox = function useDragableBox(_ref) {
  var defaultWidth = _ref.defaultWidth,
      minWidth = _ref.minWidth,
      maxWidth = _ref.maxWidth,
      target = _ref.target,
      siderTarget = _ref.siderTarget;

  var _useMouse = useMouse(),
      clientX = _useMouse.clientX;

  var _useState = react.useState(defaultWidth),
      width = _useState[0],
      setWidth = _useState[1];

  var _useState2 = react.useState(false),
      isDragging = _useState2[0],
      setIsDragging = _useState2[1];

  react.useEffect(function () {
    var box = getTargetElement(target);

    if (!box.getBoundingClientRect) {
      return;
    }

    var _ref2 = box.getBoundingClientRect() || {},
        left = _ref2.left;

    var newWidth = clientX - left;
    newWidth = Math.max(minWidth, newWidth);
    newWidth = Math.min(maxWidth, newWidth);

    if (isDragging && width !== newWidth) {
      setWidth(newWidth);
    }
  }, [target, clientX, isDragging, maxWidth, minWidth, setWidth, siderTarget]);
  react.useEffect(function () {
    document.body.style.cursor = isDragging ? 'col-resize' : '';

    document.onselectstart = function () {
      return !isDragging;
    };

    return function () {
      document.body.style.cursor = '';
      document.onselectstart = null;
    };
  }, [isDragging]);
  useEventListener(window, 'mouseup', function () {
    setIsDragging(false);
  });
  useEventListener(siderTarget, 'mousedown', function () {
    setIsDragging(true);
  });
  return {
    width: width,
    isDragging: isDragging
  };
};

var usePrevious = function usePrevious(state, compare) {
  var prevRef = react.useRef();
  var curRef = react.useRef(state);
  var shouldUpdate = typeof compare === 'function' ? compare(curRef.current, state) : true;

  if (shouldUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
};

var useUnmount$1 = function useUnmount(fn) {
  var fnRef = react.useRef();
  fnRef.current = fn;
  react.useEffect(function () {
    return fnRef.current;
  }, []);
};
var useIsUnmounted$1 = function useIsUnmounted() {
  var isUnmountedRef = react.useRef(false);
  isUnmountedRef.current = false;
  useUnmount$1(function () {
    isUnmountedRef.current = true;
  });
  return isUnmountedRef.current;
};
var useIsMounted$1 = function useIsMounted() {
  return !useIsUnmounted$1();
};

exports.useCustomCompareEffect = useCustomCompareEffect;
exports.useDebouncedValue = useDebouncedValue;
exports.useDeepCompareEffect = useDeepCompareEffect;
exports.useDocumentVisible = useDocumentVisible;
exports.useDrag = useDrag;
exports.useDragableBox = useDragableBox;
exports.useDrop = useDrop;
exports.useEventListener = useEventListener;
exports.useInterval = useInterval;
exports.useIsMounted = useIsMounted$1;
exports.useIsUnmounted = useIsUnmounted$1;
exports.useMouse = useMouse;
exports.useMutation = useMutation;
exports.usePolling = usePolling;
exports.usePrevious = usePrevious;
exports.useRequest = useRequest;
exports.useShouldUpdateEffect = useShouldUpdateEffect;
exports.useSize = useSize;
exports.useTable = useTable;
exports.useThrottledValue = useThrottledValue;
exports.useTimeout = useTimeout;
exports.useUnmount = useUnmount$1;
exports.useUpdateEffect = useUpdateEffect;
//# sourceMappingURL=index.js.map
