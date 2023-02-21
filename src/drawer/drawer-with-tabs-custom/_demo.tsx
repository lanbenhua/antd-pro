import React, { useState } from 'react';
import DrawerWithTabs, { Tabs, DrawerWithTabsProps } from './index';
import { Button, Select } from 'antd';

function callback(key: string) {
  console.log(key);
}

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
        Open DrawerWithTabs
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
      <DrawerWithTabs
        visible={visible}
        onClose={handleDrawerClose}
        title="This is a Drawer Component"
        width={600}
        footer={<button>xx</button>}
        placement={placement as DrawerWithTabsProps['placement']}
      >
        <Tabs
          defaultActiveKey="1"
          onChange={callback}
          tabPosition="top"
          animated={false}
        >
          <Tabs.TabPane tab="Tab 1" key="1">
            <div style={{ height: 1000 }}>Content of Tab Pane 1</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 3 Tab eqwr" key="3">
            Content of Tab Pane 3
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 4" key="4">
            Content of Tab Pane 4
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 5" key="5">
            Content of Tab Pane 5
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 6" key="6">
            Content of Tab Pane 6
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 7" key="7">
            Content of Tab Pane 7
          </Tabs.TabPane>
          <Tabs.TabPane tab="Tab 8" key="8">
            Content of Tab Pane 8
          </Tabs.TabPane>
        </Tabs>
      </DrawerWithTabs>
    </>
  );
}
