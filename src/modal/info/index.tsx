import React from 'react';
import { Button } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import Modal from '../index';
import { Color } from '../builtin.type';
import s from '../builtin.m.less';
import { InfoCircleOutlined } from 'components/antd/icons';

interface InfoModalProps extends ModalProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showCancelButton?: boolean;
  showOkButton?: boolean;
}

const InfoModal = (props: InfoModalProps) => {
  const {
    icon = <InfoCircleOutlined />,
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
    confirmLoading,
    mask = true,
    maskClosable = false,
    centered = false,
    closable = false,
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
      visible={visible}
      mask={mask}
      centered={centered}
      maskClosable={maskClosable}
      closable={closable}
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

export default InfoModal;
