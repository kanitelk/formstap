import React from "react";
import "./Editor.scss";
import { Button } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import NewField from "./NewField/NewField";

const Editor: React.FC = () => {
  return (
    <div className="editor">
      <h1>Editor</h1>
      <Button shape="circle" icon={<PlusOutlined />} />
      <NewField />
    </div>
  );
};

export default Editor;
