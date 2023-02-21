import React from 'react';
import cx from 'classnames';
import { Tabs as AntdTabs } from 'antd';
import {
  TabsProps as AntdTabsProps,
  TabPaneProps as AntdTabPaneProps,
} from 'antd/lib/tabs';
import Drawer, { DrawerProps } from '..';
import './s.less';
import { LayoutContext } from 'container/app/layout/root/context';

export interface DrawerWithTabsProps extends DrawerProps {
  ignoreKey?: string;
  noCollasped?: boolean;
}

export default function DrawerWithTabs(
  props: DrawerWithTabsProps
): JSX.Element {
  const {
    noCollasped,
    ignoreKey,
    className,
    visible,
    mask = false,
    closable = true,
    maskClosable = true,
    title,
    children,
    footer,
    placement = 'right',
    onClose,
    ...restProps
  } = props;

  const {
    sider: { collapsed },
  } = React.useContext(LayoutContext);

  return (
    <Drawer
      noCollasped={noCollasped}
      ignoreKey={ignoreKey}
      visible={visible}
      onClose={onClose}
      mask={mask}
      closable={closable}
      maskClosable={maskClosable}
      title={title}
      footer={footer}
      placement={placement}
      className={cx(
        className,
        'di-drawer-with-tabs-wrapper',
        `di-drawer-with-tabs-wrapper-${placement}`,
        {
          'di-drawer-with-tabs-wrapper-collasped': collapsed,
          'di-drawer-with-tabs-wrapper-no-collasped': noCollasped,
        }
      )}
      {...restProps}
    >
      {children}
    </Drawer>
  );
}

export interface TabsProps extends AntdTabsProps {
  children?: React.ReactNode | null;
}
const Tabs = function Tabs(props: TabsProps) {
  return (
    <AntdTabs className={cx('di-drawer-tabs', props.className)} {...props} />
  );
};
export interface TabPaneProps extends AntdTabPaneProps {
  children?: React.ReactNode | null;
}
Tabs.TabPane = function TabPane(props: TabPaneProps) {
  return (
    <AntdTabs.TabPane
      className={cx('di-drawer-tabs-tabPane', props.className)}
      {...props}
    />
  );
};

export { Tabs };
