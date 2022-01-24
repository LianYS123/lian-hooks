import { useCallback, useState } from 'react';

/**
 * @description 弹出框状态封装
 * @param {Object} [initialProps] modal属性初始值
 * @return {{ open: Function, close: Function, visible: Boolean }}
 */
export const useModalAction = <T = any>(initialProps: T) => {
  const [visible, setVisible] = useState(false);
  const [props, setProps] = useState(initialProps || {});
  const open = useCallback(props => {
    setVisible(true);
    setProps(props);
  }, []);
  const close = useCallback(() => {
    setVisible(false);
    setProps(initialProps);
  }, []);
  return {
    open,
    close,
    visible,
    ...props,
  };
};
