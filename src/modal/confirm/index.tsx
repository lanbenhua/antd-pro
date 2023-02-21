import React from 'react';
import { Button } from 'antd';
import { QuestionCircleOutlined } from 'components/antd/icons';
import { ModalProps } from 'antd/lib/modal';
import Modal from '../index';
import { Color } from '../builtin.type';
import s from '../builtin.m.less';

interface ConfirmModalProps extends ModalProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showCancelButton?: boolean;
  showOkButton?: boolean;
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const {
    icon = <QuestionCircleOutlined />,
    title,
    visible,
    onCancel,
    onOk,
    footer,
    cancelText = 'Cancel',
    okText = 'OK',
    cancelButtonProps,
    okButtonProps,
    showCancelButton = true,
    showOkButton = true,
    mask = true,
    confirmLoading,
    maskClosable = false,
    closable = false,
    centered = false,
    children,
    ...restProps
  } = props;

  const FooterComp = props.hasOwnProperty('footer') ? (
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
      width={500}
      centered={centered}
      mask={mask}
      closable={closable}
      maskClosable={maskClosable}
      visible={visible}
      onCancel={onCancel}
      onOk={e => onOk && onOk(e)}
      footer={FooterComp}
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

export default ConfirmModal;
