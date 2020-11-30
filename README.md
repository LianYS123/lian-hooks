# idcos-hooks 配置

## 安装

```bash
$ npm install idcos-search --save-dev
```

## 组件说明

- useTable 请求表格常用逻辑封装
- useMutation 获取异步请求状态逻辑封装
- usePolling 轮询逻辑封装
- 其他：一些操作 dom 状态、定时器等 hooks 封装

## 使用方法

见 demo

## 参数说明

### useTable 参数说明

#### Params

| 参数            | 说明                 | 类型                                                | 默认值           |
| :-------------- | :------------------- | :-------------------------------------------------- | :--------------- |
| method          | 请求方法             | Function                                            | 无               |
| defaultPageSize | 默认分页大小         | number                                              | 10               |
| defaultParams   | 默认请求参数         | json                                                | 无               |
| necessaryParams | 必要请求参数         | json                                                | 无               |
| formatter       | 请求结果数据转换函数 | (data: any) => ({ total: number, dataSource: any }) | defaultFormatter |
| autoStart       | 是否自动请求一次     | boolean                                             | true             |

#### Result

| 属性       | 说明                       | 类型                                                   |
| :--------- | :------------------------- | :----------------------------------------------------- |
| loading    | 加载状态                   | boolean                                                |
| data       | 请求返回的原始数据         | Object                                                 |
| reload     | 使用上次的参数重新发起请求 | () => Promise                                          |
| search     | 使用指定参数搜索           | () => Promise                                          |
| pagination | 分页属性                   | {current, pageSize, total, onChange, onShowSizeChange} |
| tableProps | antd 的 table 属性         | {dataSource, loading, pagination}                      |

#### defaultFomatter

```js
const defaultFormatter = (data: { content?: any } = {}) => {
  const { total_records = 0, records = [] } = data.content || {};
  return { total: total_records, dataSource: records };
};
```

### useMutation 参数说明

| 参数        | 说明     | 类型     | 默认值 |
| :---------- | :------- | :------- | :----- |
| method      | 请求方法 | Function | 无     |
| initialData | 初始数据 | Object   | 无     |

#### Result

| 属性     | 说明                 | 类型     |
| :------- | :------------------- | :------- |
| loadData | 请求函数             | Function |
| loading  | 加载状态             | boolean  |
| error    | 发生错误时的错误对象 | Object   |
| data     | 请求返回的原始数据   | Object   |

### useRequest 参数说明

#### Params

| 参数            | 说明                                           | 类型     | 默认值 |
| :-------------- | :--------------------------------------------- | :------- | :----- |
| method          | 请求方法                                       | Function | 无     |
| defaultParams   | 默认请求参数                                   | json     | 无     |
| necessaryParams | 必要请求参数                                   | json     | 无     |
| autoLoad        | 自动请求, 为true 时当必要参数变化时会发起请求 | boolean  | true   |

#### Result

| 属性    | 说明                       | 类型          |
| :------ | :------------------------- | :------------ |
| reload  | 使用上次的参数重新发起请求 | () => Promise |
| search  | 使用指定参数搜索           | () => Promise |
| loading | 加载状态                   | boolean       |
| error   | 发生错误时的错误对象       | Object        |
| data    | 请求返回的原始数据         | Object        |

### usePolling 参数说明

#### Params

| 参数            | 说明                                             | 类型     | 默认值 |
| :-------------- | :----------------------------------------------- | :------- | :----- |
| method          | 请求方法                                         | Function | 无     |
| autoStart       | 是否自动开启轮询                                 | boolean  | true   |
| onReceive       | 当接收到数据时调用的函数, 返回 true 不再继续请求 | Function | 无     |
| interval        | 请求间隔（毫秒）                                 | number   | 1000   |
| errorRetryCount | 发生错误后继续请求次数                           | number   | 0      |

#### Result

| 属性    | 说明                       | 类型       |
| :------ | :------------------------- | :--------- |
| start   | 使用上次的参数重新发起请求 | () => void |
| cancel  | 使用指定参数搜索           | () => void |
| loading | 加载状态                   | boolean    |
| polling | 轮询状态，是否正在轮询中   | boolean    |
| error   | 发生错误时的错误对象       | Error      |
| data    | 请求返回的原始数据         | Object     |

### useInterval

#### Params

| 参数     | 说明         | 类型     | 默认值 |
| :------- | :----------- | :------- | :----- |
| func     | 要执行的函数 | Function | 无     |
| interval | 执行间隔     | number   | 无     |
| deps     | 执行依赖项   | any[]    | 无     |

### useTimeout

#### Params

| 参数    | 说明         | 类型     | 默认值 |
| :------ | :----------- | :------- | :----- |
| func    | 要执行的函数 | Function | 无     |
| timeout | 执行间隔     | number   | 无     |
| deps    | 执行依赖项   | any[]    | 无     |

### useUpdateEffect

#### Params

| 参数 | 说明         | 类型     | 默认值 |
| :--- | :----------- | :------- | :----- |
| func | 要执行的函数 | Function | 无     |
| deps | 执行依赖项   | any[]    | 无     |

### useEventListener

#### Params

| 参数      | 说明                  | 类型            | 默认值 |
| :-------- | :-------------------- | :-------------- | :----- |
| target    | dom 对象或其 ref 引用 | Object          | 无     |
| eventName | 事件名称              | string          | 无     |
| listener  | 事件监听器            | Function/Object | 无     |

### useSize

#### Params

| 参数 | 说明                | 类型   | 默认值 |
| :--- | :------------------ | :----- | :----- |
| ref  | dom 对象的 ref 引用 | Object | 无     |

#### Result

| 属性   | 说明       | 类型   |
| :----- | :--------- | :----- |
| width  | 元素的宽度 | number |
| height | 元素的高度 | number |

## 更新日志

1. 2020.11.17 版本 0.0.1
2. 2020.11.26 版本 0.0.2 添加轮询、定时器、DOM 操作的 hooks 封装
