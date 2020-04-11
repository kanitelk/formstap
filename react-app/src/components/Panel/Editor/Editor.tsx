import React, { useContext, useEffect } from "react";
import "./Editor.scss";
import { Button } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import NewField from "./NewField/NewField";
import EditorFieldsList from "./EditorFieldsList/EditorFieldsList";
import { observer } from "mobx-react-lite";
import { EditorStoreContext } from "../../../stores/editorStore";
import { useParams } from "react-router-dom";

const Editor: React.FC = observer(() => {
  const editorStore = useContext(EditorStoreContext);
  const { id } = useParams();
  useEffect(() => {
    editorStore.getForm(id!);
  }, [])
  return (
    <div className="editor">
      <h1>Editor</h1>
      <Button shape="circle" icon={<PlusOutlined />} />
      <NewField />
      <EditorFieldsList />
    </div>
  );
});

export default Editor;
