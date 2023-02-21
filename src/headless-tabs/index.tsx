import React from 'react';
import { Tabs, TabsProps, TabPaneProps } from 'antd';

interface HeadlessTabsProps extends Omit<TabsProps, 'renderTabBar'> {}

interface IHeadlessTabs {
  (props: HeadlessTabsProps): React.ReactElement;
  displayName?: string;
  TabPane: {
    (props: TabPaneProps): React.ReactElement;
    displayName?: string;
  };
}

const HeadlessTabs: IHeadlessTabs = props => {
  return <Tabs {...props} renderTabBar={() => <></>}></Tabs>;
};
HeadlessTabs.displayName = 'HeadlessTabs';

HeadlessTabs.TabPane = Tabs.TabPane;
HeadlessTabs.TabPane.displayName = 'HeadlessTabs.TabPane';

export { HeadlessTabs };
