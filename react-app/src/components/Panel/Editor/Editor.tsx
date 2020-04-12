import './Editor.scss';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { EditorStoreContext, EditorTabsEnum } from '../../../stores/editorStore';
import EditorFieldsList from './EditorFieldsList/EditorFieldsList';
import EditorSider from './EditorSider';
import FormSettings from './FormSettings/FormSettings';
import NewField from './NewField/NewField';
import RewardSettings from './RewardSettings/RewardSettings';

const Editor: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);
  const { id } = useParams();
  useEffect(() => {
    editorStore.getForm(id!);
  }, []);
  return (
    <div className="editor">
      <Layout>
        <EditorSider />
        <Layout className="editor-main">
          {editorStore.editorTab === EditorTabsEnum.fields && (
            <div className="editor-fields-view">
              <h1>Editor</h1>
              <Button
                shape="round"
                onClick={() =>
                  (editorStore.newFieldActive = !editorStore.newFieldActive)
                }
                icon={<PlusOutlined />}
              >
                Create field
              </Button>
              {editorStore.newFieldActive && <NewField />}
              <EditorFieldsList />
            </div>
          )}
          {editorStore.editorTab === EditorTabsEnum.rewards && (
            <RewardSettings />
          )}
          {editorStore.editorTab === EditorTabsEnum.settings && (
            <FormSettings />
          )}
        
        </Layout>
      </Layout>
    </div>
  );
});

export default Editor;
