import { useState, useRef, useEffect } from 'react';
import debounce from 'lodash.debounce';

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
      debounce(_method, 100)(realParams, rest);
    }
  };

  const reload = () => {
    loadData();
  };

  useUpdateEffect(() => {
    if (_autoLoad) {
      loadData();
    }
  }, [JSON.stringify(necessaryParams)]);
  useEffect(() => {
    if (_autoLoad) {
      loadData();
    }
  }, []);
  return {
    search: loadData,
    reload,
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

const usePolling = ({
  method,
  onReceive,
  interval: _interval = 1000,
  errorRetryCount: _errorRetryCount = 0,
  autoStart: _autoStart = false
}) => {
  const [request, {
    loading,
    error,
    data
  }] = useMutation(method);
  const [polling, setPolling] = useState(_autoStart);
  const [retryCount, setRetryCount] = useState(_errorRetryCount);

  const start = () => {
    if (polling === false) {
      setPolling(true);
      request();
    }
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
      start();
    }
  };

  const clear = useInterval(() => {
    if (polling) {
      if (error) {
        onError();
      } else {
        onSuccess();
      }
    }
  }, _interval, [data, error, polling]);

  const cancel = () => {
    clear();
    setPolling(false);
  };

  return {
    start,
    cancel,
    loading,
    data,
    polling
  };
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

const useEventListener = (target, eventName, listener) => {
  const listenerRef = useRef(listener);
  listenerRef.current = listener;
  const targetElement = getTargetElement(target, window);
  useEffect(() => {
    if (!(targetElement === null || targetElement === void 0 ? void 0 : targetElement.addEventListener)) {
      return;
    }

    targetElement.addEventListener(eventName, listenerRef.current);
    return targetElement.removeEventListener.bind(targetElement, listenerRef.current);
  }, [eventName]);
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

export { useEventListener, useInterval, useMutation, usePolling, useRequest, useSize, useTable, useTimeout, useUpdateEffect };
//# sourceMappingURL=index.modern.js.map
