import React, { useContext } from "react";
import "./EditorFieldsList.scss";
import { Button, List, Typography } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { EditorStoreContext } from "../../../../stores/editorStore";

const EditorFieldsList: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);
  console.log(editorStore.form);
  
  return (
    <div className="editor-fields-list">
      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={editorStore.form?.fields}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>{item.type}</Typography.Text> {item.title}
          </List.Item>
        )}
      />
    </div>
  );
});

export default EditorFieldsList;
