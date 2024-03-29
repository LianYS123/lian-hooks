## Constants

<dl>
<dt><a href="#useEventListener">useEventListener</a></dt>
<dd></dd>
<dt><a href="#useSize">useSize</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#useMouse">useMouse</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#useDrag">useDrag</a> ⇒ <code>function</code></dt>
<dd></dd>
<dt><a href="#useDrop">useDrop</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#useDragableBox">useDragableBox</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#useMutation">useMutation</a> ⇒ <code>Array</code></dt>
<dd></dd>
<dt><a href="#useRequest">useRequest</a></dt>
<dd></dd>
<dt><a href="#usePagination">usePagination</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#useTable">useTable</a></dt>
<dd></dd>
<dt><a href="#useInterval">useInterval</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#useTimeout">useTimeout</a> ⇒ <code>function</code></dt>
<dd><p>setTimeout的hooks实现</p>
</dd>
<dt><a href="#useThrottledValue">useThrottledValue</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#useDebouncedValue">useDebouncedValue</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#useShouldUpdateEffect">useShouldUpdateEffect</a></dt>
<dd></dd>
<dt><a href="#useCustomCompareEffect">useCustomCompareEffect</a></dt>
<dd></dd>
<dt><a href="#useDeepCompareEffect">useDeepCompareEffect</a></dt>
<dd></dd>
<dt><a href="#usePrevious">usePrevious</a> ⇒ <code>*</code></dt>
<dd></dd>
<dt><a href="#useUpdateEffect">useUpdateEffect</a></dt>
<dd></dd>
<dt><a href="#useUnmount">useUnmount</a></dt>
<dd></dd>
<dt><a href="#useIsUnmounted">useIsUnmounted</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#useIsMounted">useIsMounted</a> ⇒ <code>Boolean</code></dt>
<dd></dd>
<dt><a href="#useLog">useLog</a></dt>
<dd></dd>
<dt><a href="#useFlag">useFlag</a> ⇒ <code>Object</code></dt>
<dd><p>真假值状态封装</p>
</dd>
<dt><a href="#useModalAction">useModalAction</a> ⇒ <code>Object</code></dt>
<dd><p>弹出框状态封装</p>
</dd>
</dl>

<a name="useEventListener"></a>

## useEventListener
**Kind**: global constant  
**Description:**: 在hooks中使用事件监听器  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>\*</code> | dom对象或其ref引用 |
| eventName | <code>\*</code> | 事件名称 |
| listener | <code>\*</code> | 事件监听器 |

<a name="useSize"></a>

## useSize ⇒ <code>Object</code>
**Kind**: global constant  
**Returns**: <code>Object</code> - {width, height}  
**Description:**: 监听元素大小变化  

| Param | Description |
| --- | --- |
| ref | 元素ref引用 |

<a name="useMouse"></a>

## useMouse ⇒ <code>\*</code>
**Kind**: global constant  
**Returns**: <code>\*</code> - 鼠标位置信息  
**Description:**: 获取鼠标位置信息  
<a name="useDrag"></a>

## useDrag ⇒ <code>function</code>
**Kind**: global constant  
**Returns**: <code>function</code> - 一个获取拖拽属性的函数，入参为拖拽传输的数据  
**Description:**: 获取可以被拖拽的元素属性  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | 拖拽开始执行的函数, 拖拽结束执行的函数 |

<a name="useDrop"></a>

## useDrop ⇒ <code>Object</code>
**Kind**: global constant  
**Returns**: <code>Object</code> - 释放元素属性  
**Description:**: 获取接收被拖拽内容的元素的属性  
<a name="useDragableBox"></a>

## useDragableBox ⇒ <code>Object</code>
**Kind**: global constant  
**Returns**: <code>Object</code> - 包含宽度和拖拽状态的对象  
**Description:**: 拉伸容器  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> |  |
| options.defaultWidth | <code>Number</code> | 默认宽度 |
| options.minWidth | <code>Number</code> | 最小宽度 |
| options.maxWidth | <code>Number</code> | 最大宽度 |
| options.target | <code>\*</code> | 被拉伸的容器 |
| options.siderTarget | <code>\*</code> | 用于拉伸的边缘 |

<a name="useMutation"></a>

## useMutation ⇒ <code>Array</code>
**Kind**: global constant  
**Returns**: <code>Array</code> - 异步方法和状态信息  
**Description:**: 异步方法的简单封装，处理请求的loading状态  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>function</code> | 异步方法 |
| [initialData] | <code>Object</code> | 初始数据 |

<a name="useRequest"></a>

## useRequest
**Kind**: global constant  
**Description:**: 请求方法的简单封装，处理请求的loading状态  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 配置 |
| options.method | <code>function</code> | 请求方法 |
| [options.defaultParams] | <code>Object</code> | 默认参数 |
| [options.necessaryParams] | <code>Object</code> | 必要参数 |
| [options.ready] | <code>Boolean</code> | === true时发起请求，默认值为true |
| [options.initialData] | <code>\*</code> | 初始数据 |
| [options.rest] | <code>Array</code> | 请求方法额外参数, onError事件等options可以通过这个参数传递 |

<a name="usePagination"></a>

## usePagination ⇒ <code>\*</code>
**Kind**: global constant  
**Returns**: <code>\*</code> - pagination  
**Description:**: 处理分页状态的hooks  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> |  |
| config.defaultPageSize | <code>\*</code> | 默认分页大小 |
| config.total | <code>\*</code> | 总数据条数 |

<a name="useTable"></a>

## useTable
**Kind**: global constant  
**Description:**: 封装方便antd table使用的hooks  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  | 配置信息 |
| options.method | <code>function</code> |  | 请求方法 |
| [options.defaultPageSize] | <code>Number</code> | <code>10</code> | 默认分页大小 |
| [options.necessaryParams] | <code>Object</code> |  | 必要请求参数 |
| [options.rowSelection] | <code>Object</code> \| <code>Boolean</code> |  | 选择功能配置, 传true使用默认 |
| [options.formatter] | <code>function</code> |  | 请求结果数据转换函数, 返回{total, dataSource} |

<a name="useInterval"></a>

## useInterval ⇒ <code>\*</code>
**Kind**: global constant  
**Returns**: <code>\*</code> - clearInterval  
**Description:**: setInterval的hooks实现  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | 要执行的函数 |
| interval | <code>Number</code> | 执行间隔 |
| deps | <code>Array</code> | 依赖项 |

<a name="useTimeout"></a>

## useTimeout ⇒ <code>function</code>
setTimeout的hooks实现

**Kind**: global constant  
**Returns**: <code>function</code> - clearTimeout  

| Param | Type | Description |
| --- | --- | --- |
| func | <code>function</code> | 要执行的函数 |
| timeout | <code>Number</code> | 执行间隔 |
| deps | <code>Array</code> | 依赖项 |

<a name="useThrottledValue"></a>

## useThrottledValue ⇒ <code>\*</code>
**Kind**: global constant  
**Returns**: <code>\*</code> - 放缓变化的值  
**Description:**: 放缓获取value的速率（节流）  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | 要节流的值 |
| wait | <code>Number</code> | 节流时间间隔 |

<a name="useDebouncedValue"></a>

## useDebouncedValue ⇒ <code>\*</code>
**Kind**: global constant  
**Returns**: <code>\*</code> - 处理后的值  
**Description:**: 合并一定时间内多次获取value的值（防抖）  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | 要节流的值 |
| wait | <code>Number</code> | 节流时间间隔 |

<a name="useShouldUpdateEffect"></a>

## useShouldUpdateEffect
**Kind**: global constant  
**Description:**: 自定义useEffect的更新逻辑  

| Param | Type | Description |
| --- | --- | --- |
| effect | <code>EffectCallback</code> | 作用 |
| deps | <code>Array</code> | 依赖 |
| shouldUpdate | <code>function</code> | 是否执行作用，返回true执行effect |

<a name="useCustomCompareEffect"></a>

## useCustomCompareEffect
**Kind**: global constant  
**Description:**: 自定义useEffect的依赖比较逻辑  

| Param | Type | Description |
| --- | --- | --- |
| effect | <code>EffectCallback</code> | 作用 |
| deps | <code>Array</code> | 依赖 |
| compare | <code>function</code> | 自定义比较函数 |

<a name="useDeepCompareEffect"></a>

## useDeepCompareEffect
**Kind**: global constant  
**Description:**: 使用深比较的useEffect  

| Param | Type | Description |
| --- | --- | --- |
| effect | <code>EffectCallback</code> | 作用 |
| deps | <code>Array</code> | 依赖 |

<a name="usePrevious"></a>

## usePrevious ⇒ <code>\*</code>
**Kind**: global constant  
**Returns**: <code>\*</code> - 前一个值  
**Description:**: 获取上一个值  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | 当前值 |
| [compare] | <code>function</code> | 比较函数, 返回true时更新上一个值，默认每次渲染都更新 |

<a name="useUpdateEffect"></a>

## useUpdateEffect
**Kind**: global constant  
**Description:**: 组件更新时执行的事件  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | 要执行的函数 |
| deps | <code>Array</code> | 依赖项 |

<a name="useUnmount"></a>

## useUnmount
**Kind**: global constant  
**Description:**: 组件卸载时执行的操作  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | 操作函数 |

<a name="useIsUnmounted"></a>

## useIsUnmounted ⇒ <code>Boolean</code>
**Kind**: global constant  
**Returns**: <code>Boolean</code> - : 组件是否已卸载  
**Description:**: 获取组件卸载状态  
<a name="useIsMounted"></a>

## useIsMounted ⇒ <code>Boolean</code>
**Kind**: global constant  
**Returns**: <code>Boolean</code> - : 组件是否已挂载  
**Description:**: 获取组件卸载状态  
<a name="useLog"></a>

## useLog
**Kind**: global constant  
**Description:**: 值变化时打印  

| Param | Type | Description |
| --- | --- | --- |
| args | <code>array</code> | 打印内容 |

<a name="useFlag"></a>

## useFlag ⇒ <code>Object</code>
真假值状态封装

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| initialFlag | <code>\*</code> | 初始状态 |

<a name="useModalAction"></a>

## useModalAction ⇒ <code>Object</code>
弹出框状态封装

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| [initialProps] | <code>Object</code> | modal属性初始值 |

