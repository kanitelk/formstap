import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Layout, Menu } from 'antd';
import { FormOutlined, DollarOutlined, SettingOutlined } from '@ant-design/icons';
import { EditorStoreContext, EditorTabsEnum } from '../../../stores/editorStore';

const EditorSider: React.FC = observer(() => {
  const { Sider } = Layout;
  const editorStore = useContext(EditorStoreContext);
  return (
    <Sider theme="light" collapsed>
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item
          key="1"
          onClick={() => (editorStore.editorTab = EditorTabsEnum.fields)}
        >
          <FormOutlined />
          <span>Fields</span>
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => (editorStore.editorTab = EditorTabsEnum.rewards)}
        >
          <DollarOutlined />
          <span>Rewards</span>
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => (editorStore.editorTab = EditorTabsEnum.settings)}
        >
          <SettingOutlined />
          <span>Settings</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
})

export default EditorSider;