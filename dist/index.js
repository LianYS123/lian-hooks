function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var react = require('react');
var debounce = _interopDefault(require('lodash.debounce'));

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

      debounce(_method, 100)(realParams, rest);
    }
  };

  var reload = function reload() {
    loadData();
  };

  useUpdateEffect(function () {
    if (autoLoad) {
      loadData();
    }
  }, [JSON.stringify(necessaryParams)]);
  react.useEffect(function () {
    if (autoLoad) {
      loadData();
    }
  }, []);
  return _extends({
    search: loadData,
    reload: reload
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

var usePolling = function usePolling(_ref) {
  var method = _ref.method,
      onReceive = _ref.onReceive,
      _ref$interval = _ref.interval,
      interval = _ref$interval === void 0 ? 1000 : _ref$interval,
      _ref$errorRetryCount = _ref.errorRetryCount,
      errorRetryCount = _ref$errorRetryCount === void 0 ? 0 : _ref$errorRetryCount,
      _ref$autoStart = _ref.autoStart,
      autoStart = _ref$autoStart === void 0 ? false : _ref$autoStart;

  var _useMutation = useMutation(method),
      request = _useMutation[0],
      _useMutation$ = _useMutation[1],
      loading = _useMutation$.loading,
      error = _useMutation$.error,
      data = _useMutation$.data;

  var _useState = react.useState(autoStart),
      polling = _useState[0],
      setPolling = _useState[1];

  var _useState2 = react.useState(errorRetryCount),
      retryCount = _useState2[0],
      setRetryCount = _useState2[1];

  var start = function start() {
    if (polling === false) {
      setPolling(true);
      request();
    }
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
      start();
    }
  };

  var clear = useInterval(function () {
    if (polling) {
      if (error) {
        onError();
      } else {
        onSuccess();
      }
    }
  }, interval, [data, error, polling]);

  var cancel = function cancel() {
    clear();
    setPolling(false);
  };

  return {
    start: start,
    cancel: cancel,
    loading: loading,
    data: data,
    polling: polling
  };
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

var useEventListener = function useEventListener(target, eventName, listener) {
  var listenerRef = react.useRef(listener);
  listenerRef.current = listener;
  var targetElement = getTargetElement(target, window);
  react.useEffect(function () {
    if (!(targetElement === null || targetElement === void 0 ? void 0 : targetElement.addEventListener)) {
      return;
    }

    targetElement.addEventListener(eventName, listenerRef.current);
    return targetElement.removeEventListener.bind(targetElement, listenerRef.current);
  }, [eventName]);
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

exports.useEventListener = useEventListener;
exports.useInterval = useInterval;
exports.useMutation = useMutation;
exports.usePolling = usePolling;
exports.useRequest = useRequest;
exports.useSize = useSize;
exports.useTable = useTable;
exports.useTimeout = useTimeout;
exports.useUpdateEffect = useUpdateEffect;
//# sourceMappingURL=index.js.map
