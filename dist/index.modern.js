import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

const useMutation = (method, initialData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState(initialData);
  const methodRef = useRef(method);
  methodRef.current = method;

  const loadData = async (...params) => {
    try {
      setLoading(true);
      const res = await methodRef.current(...params);
      setLoading(false);
      setData(res);
    } catch (e) {
      setLoading(false);
      setError(e);
      console.error(e);
    }
  };

  return [loadData, {
    loading,
    error,
    data
  }];
};

const useShouldUpdateEffect = (effect, deps, shouldUpdate) => {
  const depsRef = useRef(deps);

  if (shouldUpdate(depsRef.current, deps)) {
    depsRef.current = deps;
  }

  useEffect(effect, depsRef.current);
};
const useCustomCompareEffect = (effect, deps, compare) => useShouldUpdateEffect(effect, deps, (...args) => !compare(...args));

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

const useDeepCompareEffect = (effect, deps = []) => {
  return useCustomCompareEffect(effect, deps, fastDeepEqual);
};

const useRequest = ({
  method,
  defaultParams: _defaultParams = {},
  necessaryParams,
  autoLoad: _autoLoad = true,
  ...rest
}) => {
  const [_method, requestState] = useMutation(method);
  const paramRef = useRef(_defaultParams);
  const necessaryParamsRef = useRef(necessaryParams);
  necessaryParamsRef.current = necessaryParams;

  const loadData = (_params = paramRef.current) => {
    paramRef.current = _params;

    if (!requestState.loading) {
      const realParams = { ...necessaryParamsRef.current,
        ..._params
      };

      _method(realParams, rest);
    }
  };

  const reload = () => {
    loadData();
  };

  useDeepCompareEffect(() => {
    if (_autoLoad) {
      loadData();
    }
  }, [necessaryParams]);
  return {
    search: loadData,
    reload,
    params: { ...necessaryParamsRef.current,
      ...paramRef.current
    },
    ...requestState
  };
};

const defaultFormatter = (data = {}) => {
  const {
    total_records = 0,
    records = []
  } = data.content || {};
  return {
    total: total_records,
    dataSource: records
  };
};

const useTable = options => {
  let {
    method,
    defaultPageSize = 10,
    necessaryParams = {},
    formatter = defaultFormatter,
    getAllKeys,
    rowSelection: customRowSelection,
    ...rest
  } = options;
  const [{
    current = 1,
    pageSize = defaultPageSize
  }, onChangePaination] = useState({
    current: 1,
    pageSize: defaultPageSize
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const realParams = { ...necessaryParams,
    page: current,
    page_size: pageSize
  };
  const {
    data,
    loading,
    search,
    reload
  } = useRequest({
    method,
    necessaryParams: realParams,
    ...rest
  });
  const {
    total,
    dataSource
  } = formatter(data);

  const onChange = (current, pageSize) => {
    let toCurrent = current <= 0 ? 1 : current;
    const toPageSize = pageSize <= 0 ? 1 : pageSize;
    const tempTotalPage = Math.ceil(total / toPageSize);

    if (tempTotalPage && toCurrent > tempTotalPage) {
      toCurrent = tempTotalPage;
    }

    onChangePaination({
      current: toCurrent,
      pageSize: toPageSize
    });
  };

  let selections = false;

  if (getAllKeys) {
    selections = ['SELECT_INVERT', {
      key: 'select-all-pages',
      text: '选择全部',
      onSelect: async () => {
        const keys = await (getAllKeys === null || getAllKeys === void 0 ? void 0 : getAllKeys());
        setSelectedRowKeys(keys);
      }
    }, {
      key: 'cancel-all-pages',
      text: '取消全部',
      onSelect: () => {
        setSelectedRowKeys([]);
      }
    }];
  }

  const rowSelection = customRowSelection ? {
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
    preserveSelectedRowKeys: true,
    selections
  } : undefined;

  if (customRowSelection && typeof customRowSelection === 'object') {
    Object.assign(rowSelection, customRowSelection);
  }

  const pagination = {
    current,
    pageSize,
    total,
    onChange: onChange,
    onShowSizeChange: onChange
  };
  return {
    loading,
    data,
    reload,
    search,
    pagination,
    tableProps: {
      dataSource,
      loading,
      pagination,
      rowSelection
    }
  };
};

const useInterval = (func, interval, deps = []) => {
  const [timer, setTimer] = useState();
  const funcRef = useRef(func);
  funcRef.current = func;

  const clear = () => clearInterval(timer);

  useEffect(() => {
    const I = setInterval(() => {
      funcRef.current();
    }, interval);
    setTimer(I);
    return () => clearInterval(I);
  }, deps);
  return clear;
};
const useTimeout = (func, timeout, deps = []) => {
  const [timer, setTimer] = useState();
  const funcRef = useRef(func);
  funcRef.current = func;

  const clear = () => clearTimeout(timer);

  useEffect(() => {
    const T = setTimeout(funcRef.current, timeout);
    setTimer(T);
    return () => clearTimeout(T);
  }, deps);
  return clear;
};

const useUnmount = fn => {
  const fnRef = useRef();
  fnRef.current = fn;
  useEffect(() => {
    return fnRef.current;
  }, []);
};
const useIsUnmounted = () => {
  const isUnmountedRef = useRef(false);
  isUnmountedRef.current = false;
  useUnmount(() => {
    isUnmountedRef.current = true;
  });
  return isUnmountedRef.current;
};
const useIsMounted = () => !useIsUnmounted();

const useUpdateEffect = (fn, deps) => {
  const isMouted = useRef(false);
  useEffect(() => {
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

  let targetElement;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

const isDocumentVisible = () => {
  if (typeof document !== 'undefined' && typeof document.visibilityState !== 'undefined') {
    return document.visibilityState !== 'hidden';
  }

  return true;
};

const useEventListener = (target, eventName, listener) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  useEffect(() => {
    const targetElement = getTargetElement(target, window);

    if (!(targetElement !== null && targetElement !== void 0 && targetElement.addEventListener)) {
      return;
    }

    targetElement.addEventListener(eventName, listenerRef.current);
    return targetElement.removeEventListener.bind(targetElement, listenerRef.current);
  }, [eventName, target]);
};
const useSize = ref => {
  const [size, setSize] = useState({
    width: 0,
    height: 0
  });

  const _setSize = () => {
    setSize({
      width: ref.current ? ref.current.clientWidth : 0,
      height: ref.current ? ref.current.clientHeight : 0
    });
  };

  useEventListener(window, 'resize', _setSize);
  useEffect(() => {
    _setSize();
  }, []);
  return size;
};
const useDocumentVisible = () => {
  const [visible, setVisible] = useState(isDocumentVisible());
  useEventListener(document, 'visibilitychange', () => {
    setVisible(isDocumentVisible());
  });
  return visible;
};
const defaultMouseAttribute = {
  pageX: NaN,
  pageY: NaN,
  screenX: NaN,
  screenY: NaN,
  x: NaN,
  y: NaN,
  clientX: NaN,
  clientY: NaN
};
const useMouse = () => {
  const [attr, setAttr] = useState(defaultMouseAttribute);
  useEventListener(window, 'mousemove', ev => {
    const {
      pageX,
      pageY,
      screenX,
      screenY,
      x,
      y,
      clientX,
      clientY
    } = ev;
    setAttr({
      pageX,
      pageY,
      screenX,
      screenY,
      x,
      y,
      clientX,
      clientY
    });
  });
  return attr;
};

const usePolling = ({
  method,
  onReceive,
  interval: _interval = 1000,
  errorRetryCount: _errorRetryCount = 0,
  autoStart: _autoStart = false,
  pollingWhenHidden: _pollingWhenHidden = false
}) => {
  const [_request, {
    loading,
    error,
    data
  }] = useMutation(method);
  const isMounted = useIsMounted();
  const [polling, setPolling] = useState(_autoStart);
  const [retryCount, setRetryCount] = useState(_errorRetryCount);
  const visible = useDocumentVisible();

  const request = () => {
    if (_pollingWhenHidden || visible) {
      setPolling(true);

      _request();
    }
  };

  const start = () => {
    if (polling === false && isMounted) {
      request();
    }
  };

  const cancel = () => {
    clear();
    setRetryCount(_errorRetryCount);
    setPolling(false);
  };

  const onError = () => {
    if (retryCount) {
      setRetryCount(count => count - 1);
      request();
    } else {
      cancel();
    }
  };

  const onSuccess = () => {
    if (onReceive && onReceive(data) === true) {
      cancel();
    } else {
      request();
    }
  };

  const clear = useTimeout(() => {
    if (polling) {
      if (error) {
        onError();
      } else {
        onSuccess();
      }
    }
  }, _interval, [data, error, polling]);
  useUpdateEffect(() => {
    if (!_pollingWhenHidden && visible && polling) {
      request();
    }
  }, [visible]);
  useUnmount(() => {
    cancel();
  });
  return {
    start,
    cancel,
    loading,
    data,
    polling
  };
};

const useDrag = (config = {}) => {
  return data => ({
    draggable: 'true',
    key: JSON.stringify(data),
    onDragStart: ev => {
      var _config$onDragStart;

      ev.dataTransfer.setData('custom', JSON.stringify(data));
      (_config$onDragStart = config.onDragStart) === null || _config$onDragStart === void 0 ? void 0 : _config$onDragStart.call(config, data, ev);
    },
    onDragEnd: ev => {
      var _config$onDragEnd;

      (_config$onDragEnd = config.onDragEnd) === null || _config$onDragEnd === void 0 ? void 0 : _config$onDragEnd.call(config, data, ev);
    }
  });
};
const useDrop = options => {
  const [isHovering, setIsHovering] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const props = useMemo(() => ({
    onDragOver: ev => {
      ev.preventDefault();
    },
    onDrop: ev => {
      var _optionsRef$current$o, _optionsRef$current;

      ev.preventDefault();
      ev.persist();
      setIsHovering(false);
      let data = ev.dataTransfer.getData('custom');

      try {
        data = JSON.parse(data);
      } catch (ev) {}

      (_optionsRef$current$o = (_optionsRef$current = optionsRef.current).onDrop) === null || _optionsRef$current$o === void 0 ? void 0 : _optionsRef$current$o.call(_optionsRef$current, data, ev);
    },
    onDragEnter: ev => {
      ev.preventDefault();
      setIsHovering(true);
    },
    onDragLeave: ev => {
      ev.preventDefault();
      setIsHovering(false);
    }
  }), [setIsHovering]);
  return [props, {
    isHovering
  }];
};

const throttle = (fn, t) => {
  let shouldRun = true;
  return (...args) => {
    if (shouldRun) {
      fn(...args);
      shouldRun = false;
      setTimeout(() => {
        shouldRun = true;
      }, t);
    }
  };
};

const useDragableBox = ({
  defaultWidth,
  minWidth,
  maxWidth,
  boxRef,
  siderRef
}) => {
  const {
    clientX
  } = useMouse();
  const [width, _setWidth] = useState(defaultWidth);
  const [isDragging, setIsDragging] = useState(false);
  const setWidth = useCallback(throttle(_setWidth, 100), []);
  useEffect(() => {
    const box = getTargetElement(boxRef);

    if (!box.getBoundingClientRect) {
      return;
    }

    const {
      left
    } = box.getBoundingClientRect() || {};
    let newWidth = clientX - left;
    newWidth = Math.max(minWidth, newWidth);
    newWidth = Math.min(maxWidth, newWidth);

    if (isDragging && width !== newWidth) {
      setWidth(newWidth);
    }
  }, [boxRef, clientX, isDragging, maxWidth, minWidth, setWidth, siderRef]);
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.cursor = '';
    }

    return () => {
      document.body.style.cursor = '';
    };
  }, [isDragging]);
  useEventListener(window, 'mouseup', () => {
    setIsDragging(false);
  });
  useEventListener(siderRef, 'mousedown', () => {
    setIsDragging(true);
  });
  return {
    width,
    isDragging
  };
};

const usePrevious = (state, compare) => {
  const prevRef = useRef();
  const curRef = useRef(state);
  const shouldUpdate = typeof compare === 'function' ? compare(curRef.current, state) : true;

  if (shouldUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
};

const useUnmount$1 = fn => {
  const fnRef = useRef();
  fnRef.current = fn;
  useEffect(() => {
    return fnRef.current;
  }, []);
};
const useIsUnmounted$1 = () => {
  const isUnmountedRef = useRef(false);
  isUnmountedRef.current = false;
  useUnmount$1(() => {
    isUnmountedRef.current = true;
  });
  return isUnmountedRef.current;
};
const useIsMounted$1 = () => !useIsUnmounted$1();

export { useCustomCompareEffect, useDeepCompareEffect, useDocumentVisible, useDrag, useDragableBox, useDrop, useEventListener, useInterval, useIsMounted$1 as useIsMounted, useIsUnmounted$1 as useIsUnmounted, useMouse, useMutation, usePolling, usePrevious, useRequest, useShouldUpdateEffect, useSize, useTable, useTimeout, useUnmount$1 as useUnmount, useUpdateEffect };
//# sourceMappingURL=index.modern.js.map
