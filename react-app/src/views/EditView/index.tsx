import React from "react";
import "./EditView.scss";
import { useParams } from "react-router-dom";
import Editor from "../../components/Panel/Editor/Editor";
import Form from "../../components/Form/Form";

const EditView: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="edit-view">
      <Editor />
      <Form id={id!} />
    </div>
  );
};

export default EditView;
