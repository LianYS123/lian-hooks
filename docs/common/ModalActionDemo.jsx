import { Button, Modal } from 'antd';
import React from 'react';
import { useModalAction } from '../../src/hooks/common/useModalAction';

const CustomModal = ({ close, message, ...modalProps }) => {
  return (
    <Modal onCancel={close} onOk={close} title="Test Modal" {...modalProps}>
      {message}
    </Modal>
  );
};

export default () => {
  const { open, ...modalProps } = useModalAction();
  return (
    <div>
      <Button
        onClick={() => {
          // 可以直接通过open方法传参
          open({ message: 'some message' });
        }}
      >
        click me
      </Button>
      <CustomModal {...modalProps} />
    </div>
  );
};
