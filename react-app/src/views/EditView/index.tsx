import React from "react";
import "./EditView.scss";
import { useParams } from "react-router-dom";
import Editor from "../../components/Panel/Editor/Editor";
import Form from "../../components/Form/Form";

const EditView: React.FC = () => {
  const { id } = useParams();
  return <div className="edit-view">
    <Editor />
    <Form />
  </div>;
};

export default EditView;
