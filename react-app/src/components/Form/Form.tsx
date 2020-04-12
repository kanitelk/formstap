import "./Form.scss";

import { Progress } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";

import { FormStoreContext } from "../../stores/formStore";
import EmailField from "./Fields/Email";
import InputField from "./Fields/Input";
import NumberField from "./Fields/Number";
import PhoneField from "./Fields/Phone";
import TextareaField from "./Fields/Textarea";
import { FieldTypeEnum } from "./types";
import DateField from "./Fields/Date";

const Form: React.FC<{ id: string }> = observer(({ id }) => {
  const store = useContext(FormStoreContext);

  useEffect(() => {
    store.getForm(id);
  }, []);

  const AnimationEffect = styled.div`
    animation: 1s ${keyframes`${fadeIn}`};
  `;

  return (
    <>
      {store.form && store.form.fields.length > 0 && (
        <div className="form">
          <h1>Form</h1>
          <AnimationEffect>
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
            {store.form.fields[store.current_step].type ===
              FieldTypeEnum.date && <DateField />}
          </AnimationEffect>
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
