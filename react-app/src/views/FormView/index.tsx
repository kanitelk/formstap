import React, { useContext, useEffect } from "react";
import "./FormView.scss";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { FormStoreContext } from "../../stores/formStore";
import Form from "../../components/Form/Form";

const FormView: React.FC = observer(() => {
  const { id } = useParams();
  const formStore = useContext(FormStoreContext);

  // useEffect(() => {
  //   formStore.getForm(id!);
  // }, [])

  useEffect(() => {
    document.title = formStore.form?.title!;
    formStore.formView = true;

    return () => {
      document.title = "TapForms";
      formStore.formView = false;
    };
  }, [formStore.form]);

  return (
    <div className="form-view">
      <Form id={id!} />
    </div>
  );
});

export default FormView;
