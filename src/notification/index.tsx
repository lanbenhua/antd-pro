import React from 'react';
import { notification, Button } from 'antd';
import { NotificationApi } from 'antd/lib/notification';
import s from './s.m.less';

export type NotificationOptions = {
  title: string | React.ReactNode;
  message?: React.ReactNode;
  type?: 'success' | 'info' | 'warning' | 'error' | 'open';
  timeout?: number;
  actions?: Array<{
    name: string;
    buttonType?:
      | 'link'
      | 'text'
      | 'ghost'
      | 'default'
      | 'primary'
      | 'dashed'
      | undefined;
    callback?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }>;
};

export const fireNotification = (options: NotificationOptions): void => {
  const id = `id${Date.now()}`;
  const { type = 'open', title, message, timeout = 3, actions = [] } = options;
  const btnList = actions.map(({ name, buttonType, callback }, index) => (
    <Button
      key={index}
      type={buttonType ?? 'default'}
      size="small"
      onClick={(event): void => {
        notification.close(id);
        if (typeof callback === 'function') {
          callback(event);
        }
      }}
      className={s.notificationActionButton}
    >
      {name}
    </Button>
  ));
  const btn = <>{btnList}</>;
  const methodName: keyof NotificationApi = notification.hasOwnProperty(type)
    ? type
    : 'open';
  notification[methodName]({
    key: id,
    message: title,
    description: message,
    duration: timeout,
    btn,
  });
};
