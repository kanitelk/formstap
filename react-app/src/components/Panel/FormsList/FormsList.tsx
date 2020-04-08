import "./FormsList.scss";

import { Card } from "antd";
import React, { useEffect, useState } from "react";

import { Form, getForms } from "../../../services/editorAPI";
import { httpErrorHandler } from "../../../services/utils";
import history from "../../../stores/history";

const FormsList: React.FC = () => {
  const [state, setState] = useState<{
    isLoading: boolean;
    forms: Form[];
  }>({
    isLoading: false,
    forms: [],
  });
  useEffect(() => {
    let r = async () => {
      setState({ ...state, isLoading: true });
      let forms = await getForms();
      setState({ ...state, isLoading: false, forms: forms });
    };
    try {
      r();
    } catch (error) {
      setState({ ...state, isLoading: false });
      httpErrorHandler(error);
    }
  }, []);
  return (
    <div className="forms-list">
      {state.forms.map((form) => (
        <Card
          className="form-card"
          // cover={<img src={form.img} />}
          key={form._id}
          title={form.title}
          onClick={() => history.push(`/edit/${form._id}`)}
        >
          {/* {form.responces} responses */}
        </Card>
      ))}
    </div>
  );
};

export default FormsList;
