import "./PanelView.scss";

import React from "react";
import FormsList from "../../components/Panel/FormsList/FormsList";
import { Button, message } from "antd";
import { newForm } from "../../services/editorAPI";
import history from "../../stores/history";
import { httpErrorHandler } from "../../services/utils";
import { getFingerprint } from "../../services/formAPI";

const PanelView: React.FC = () => {
  const createForm = async () => {
    try {
      let r = await newForm();
      history.push(`/edit/${r._id}`)
    } catch (error) {
      httpErrorHandler(error)
    }
  };
  return (
    <div className="panel-view">
      <FormsList />
      <Button
        onClick={createForm}
        className="create-form__btn"
        type="primary"
        size="large"
      >
        Create Form
      </Button>
    </div>
  );
};

export default PanelView;
