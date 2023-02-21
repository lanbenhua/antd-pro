import React, { useState } from 'react';
import Drawer, { DrawerProps } from './index';
import { Button, Select } from 'antd';

export default function Demo() {
  const [visible, setVisible] = useState<boolean>(false);
  const [placement, setPlacement] = useState<string>('right');
  const handleDrawerOpen = () => {
    setVisible(true);
  };
  const handleDrawerClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button data-drawer-close-ignore onClick={handleDrawerOpen}>
        Open Drawer
      </Button>
      <Select
        style={{ width: 100 }}
        onChange={(value: string) => setPlacement(value)}
      >
        <Select.Option value="right">Right</Select.Option>
        <Select.Option value="left">Left</Select.Option>
        <Select.Option value="top">Top</Select.Option>
        <Select.Option value="bottom">Bottom</Select.Option>
      </Select>
      <Drawer
        visible={visible}
        onClose={handleDrawerClose}
        title="This is a Drawer Component"
        width={800}
        placement={placement as DrawerProps['placement']}
        footer={<button>xx</button>}
      >
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
        <p>waf</p>
      </Drawer>
    </>
  );
}
