import React, { useState } from 'react';
import DrawerWithTabs, { Tabs as MyTabs } from './index';
import { Button, Select } from 'antd';

export default function Demo() {
  const [visible, setVisible] = useState<boolean>(false);
  const [placement, setPlacement] = useState<
    'right' | 'top' | 'bottom' | 'left' | undefined
  >('right');
  const handleDrawerOpen = () => {
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button data-drawer-close-ignore onClick={handleDrawerOpen}>
        Open Drawer With Tabs
      </Button>
      <Select
        style={{ width: 100 }}
        onChange={(value: 'right' | 'top' | 'bottom' | 'left') =>
          setPlacement(value)
        }
      >
        <Select.Option value="right">Right</Select.Option>
        <Select.Option value="left">Left</Select.Option>
        <Select.Option value="top">Top</Select.Option>
        <Select.Option value="bottom">Bottom</Select.Option>
      </Select>
      <DrawerWithTabs
        visible={visible}
        onClose={handleDrawerClose}
        title="This is a Drawer With Tabs Component"
        width={800}
        placement={placement}
      >
        <MyTabs defaultActiveKey="1" animated={false} tabPosition="top">
          <MyTabs.TabPane key="1" tab="This Is One">
            <div>This Is One</div>
          </MyTabs.TabPane>
          <MyTabs.TabPane key="2" tab="This Is Two">
            <div>This Is Two</div>
          </MyTabs.TabPane>
          <MyTabs.TabPane key="3" tab="This Is Three">
            <div>This Is Three</div>
          </MyTabs.TabPane>
          <MyTabs.TabPane key="4" tab="This Is Four">
            <div>This Is Four</div>
          </MyTabs.TabPane>
        </MyTabs>
      </DrawerWithTabs>
    </>
  );
}
