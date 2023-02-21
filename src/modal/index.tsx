import React from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

export interface MyModalProps extends ModalProps {}

const MyModal: React.FC<MyModalProps> = ({
  mask = true,
  closable = true,
  maskClosable = false,
  destroyOnClose = true,
  centered = false,
  ...rest
}) => {
  return (
    <Modal
      {...rest}
      mask={mask}
      centered={centered}
      closable={closable}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
    />
  );
};

export default MyModal;
