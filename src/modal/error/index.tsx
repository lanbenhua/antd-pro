import React from 'react';
import { Button } from 'antd';
import { CloseCircleOutlined } from 'components/antd/icons';
import { ModalProps } from 'antd/lib/modal';
import Modal from '../index';
import { Color } from '../builtin.type';
import s from '../builtin.m.less';

interface ErrorModalProps extends ModalProps {
  children?: React.ReactNode;
  iconType?: string;
  icon?: React.ReactNode;
  showCancelButton?: boolean;
  showOkButton?: boolean;
}

const ErrorModal = (props: ErrorModalProps) => {
  const {
    icon = <CloseCircleOutlined />,
    title,
    visible,
    onCancel,
    onOk,
    footer,
    width,
    cancelText = 'Cancel',
    okText = 'OK',
    cancelButtonProps,
    okButtonProps,
    showCancelButton = false,
    showOkButton = true,
    mask = true,
    maskClosable = false,
    closable = false,
    centered = false,
    confirmLoading,
    children,
    ...restProps
  } = props;

  const footerComp = props.hasOwnProperty('footer') ? (
    footer
  ) : (
    <div>
      {showCancelButton && (
        <Button onClick={onCancel} type="default" {...cancelButtonProps}>
          {cancelText}
        </Button>
      )}
      {showOkButton && (
        <Button
          onClick={e => onOk && onOk(e)}
          type="primary"
          loading={confirmLoading}
          {...okButtonProps}
        >
          {okText}
        </Button>
      )}
    </div>
  );

  return (
    <Modal
      className={s.modal}
      width={width ?? 500}
      mask={mask}
      centered={centered}
      closable={closable}
      maskClosable={maskClosable}
      visible={visible}
      onCancel={onCancel}
      onOk={e => onOk && onOk(e)}
      footer={footerComp}
      {...restProps}
    >
      <h2 className={s.title}>
        <span style={{ color: Color.Confirm, marginRight: 16 }}>{icon}</span>
        {title}
      </h2>
      <div style={{ marginLeft: 38 }}>{children}</div>
    </Modal>
  );
};

export default ErrorModal;
