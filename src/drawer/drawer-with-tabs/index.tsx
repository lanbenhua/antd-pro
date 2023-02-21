import React from 'react';
import cx from 'classnames';
import { Drawer, Tabs } from 'antd';
import { DrawerProps } from 'antd/lib/drawer';
import { TabPaneProps, TabsProps } from 'antd/lib/tabs';
import './index.less';

interface DrawerWithTabsProps extends DrawerProps {
  visible: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

const DrawerWithTabs = (props: DrawerWithTabsProps) => {
  const {
    children,
    className,
    footer,
    onClose,
    destroyOnClose = true,
    ...restProps
  } = props;

  return (
    <Drawer
      {...restProps}
      destroyOnClose={destroyOnClose}
      onClose={onClose}
      className={cx('sp-drawer-with-tabs', className)}
    >
      {children}
      {footer && (
        <div className={cx('sp-drawer-with-tabs-footer')}>{footer}</div>
      )}
    </Drawer>
  );
};

const MyTabs = (props: TabsProps & { children?: React.ReactNode }) => {
  return (
    <Tabs
      animated={false}
      {...props}
      className={cx('sp-drawer-tabs', props.className)}
    />
  );
};

const MyTabPane = (props: TabPaneProps & { children?: React.ReactNode }) => {
  return (
    <Tabs.TabPane
      {...props}
      className={cx('sp-drawer-tabs-tabpane', props.className)}
    />
  );
};

MyTabs.TabPane = MyTabPane;

export { MyTabs as Tabs };

export default DrawerWithTabs;
