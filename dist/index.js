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
        } catch (ev) {}

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

var throttle = function throttle(fn, t) {
  var shouldRun = true;
  return function () {
    if (shouldRun) {
      fn.apply(void 0, arguments);
      shouldRun = false;
      setTimeout(function () {
        shouldRun = true;
      }, t);
    }
  };
};

var useDragableBox = function useDragableBox(_ref) {
  var defaultWidth = _ref.defaultWidth,
      minWidth = _ref.minWidth,
      maxWidth = _ref.maxWidth,
      boxRef = _ref.boxRef,
      siderRef = _ref.siderRef;

  var _useMouse = useMouse(),
      clientX = _useMouse.clientX;

  var _useState = react.useState(defaultWidth),
      width = _useState[0],
      _setWidth = _useState[1];

  var _useState2 = react.useState(false),
      isDragging = _useState2[0],
      setIsDragging = _useState2[1];

  var setWidth = react.useCallback(throttle(_setWidth, 100), []);
  react.useEffect(function () {
    var box = getTargetElement(boxRef);

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
  }, [boxRef, clientX, isDragging, maxWidth, minWidth, setWidth, siderRef]);
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
  useEventListener(siderRef, 'mousedown', function () {
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
exports.useTimeout = useTimeout;
exports.useUnmount = useUnmount$1;
exports.useUpdateEffect = useUpdateEffect;
//# sourceMappingURL=index.js.map
