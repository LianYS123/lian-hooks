import React, { useState } from 'react';

import { useTable } from 'lian-hooks';
import { Table, Button, Input, Space, Switch, Form, Radio } from 'antd';
import { fakeRequest } from '../service';


export const UseTableDemo = () => {
  const [showSelection, setShowSelection] = useState(false);
  const [disabledOdd, setDisabledOdd] = useState(false);
  const [type, setType] = useState('checkbox');

  const { tableProps, reload, search } = useTable({
    method: fakeRequest,
    rowSelection: showSelection
      ? {
          type,
          getCheckboxProps: record => ({
            disabled: disabledOdd
              ? record && record.id % 2 === 1
                ? true
                : false
              : false,
          }),
        }
      : false
  });

  const columns = [
    {
      dataIndex: 'title',
      title: '标题',
    },
    {
      dataIndex: 'message',
      title: '信息',
    },
  ];

  return (
    <>
      <Space style={{ margin: 16 }}>
        <Form.Item label='show selection'>
          <Switch onChange={checked => setShowSelection(checked)} />
        </Form.Item>
        <Form.Item label='type'>
          <Radio.Group value={type} onChange={ev => setType(ev.target.value)}>
            <Radio.Button value='radio'>Radio</Radio.Button>
            <Radio.Button value='checkbox'>Checkbox</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='disable odd'>
          <Switch onChange={checked => setDisabledOdd(checked)} />
        </Form.Item>
      </Space>
      <Space style={{ margin: 16 }}>
        <Button onClick={() => reload()}>reload</Button>
        <Input.Search
          style={{ width: 200 }}
          onSearch={keyword => search({ keyword })}
        />
      </Space>
      <Table rowKey='id' columns={columns} {...tableProps} />
    </>
  );
};
