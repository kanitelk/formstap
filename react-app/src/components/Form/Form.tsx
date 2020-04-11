import React, { useEffect, useState, useContext } from "react";
import "./Form.scss";
import { TForm, FieldTypeEnum } from "./types";
import { getForm } from "../../services/editorAPI";
import { httpErrorHandler } from "../../services/utils";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../../stores/formStore";
import InputField from "./Fields/Input";
import TextareaField from "./Fields/Textarea";
import NumberField from "./Fields/Number";
import PhoneField from "./Fields/Phone";
import EmailField from "./Fields/Email";
import { Progress } from "antd";

const Form: React.FC<{ id: string }> = observer(({ id }) => {
  const store = useContext(FormStoreContext);

  useEffect(() => {
    store.getForm(id);
  }, []);

  return (
    <>
      {store.form && store.form.fields.length > 0 && (
        <div className="form">
          <h1>Form</h1>
          {store.form.fields[store.current_step].type ===
            FieldTypeEnum.input && <InputField />}
          {store.form.fields[store.current_step].type ===
            FieldTypeEnum.textarea && <TextareaField />}
          {store.form.fields[store.current_step].type ===
            FieldTypeEnum.number && <NumberField />}
          {store.form.fields[store.current_step].type ===
            FieldTypeEnum.phone && <PhoneField />}
          {store.form.fields[store.current_step].type ===
            FieldTypeEnum.email && <EmailField />}
          <Progress
            percent={(store.current_step / store.form?.fields!.length) * 100}
            showInfo={false}
          />
        </div>
      )}
    </>
  );
});

export default Form;
