import React from 'react';
import { Button, Table, Space } from 'antd';
import { useMutation } from 'lian-hooks';
import { getAll } from '../service';

const defaultFormatter = ({ data = [] } = {}) => {
  return { total: data.length, dataSource: data };
};

export const UseMutationDemo = () => {
  const [load, { loading, data }] = useMutation(getAll);

  const tableProps = defaultFormatter(data);

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
        <Button loading={loading} onClick={() => load()}>
          load
        </Button>
      </Space>
      <Table
        loading={loading}
        rowKey='id'
        columns={columns}
        {...tableProps}
      />
    </>
  );
};
