import React, { useContext, useState } from "react";
import { InputNumber, Button } from "antd";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../../../stores/formStore";

const NumberField: React.FC = observer(() => {
  const store = useContext(FormStoreContext);
  const { form, current_step } = store;
  const [state, setState] = useState(0);
  const setAnswer = () => {
    store.setAnswer(state);
  };
  return (
    <div className="number-field">
      <div className="title">{form?.fields[current_step].title}</div>
      <InputNumber
        onPressEnter={setAnswer}
        autoFocus={store.formView}
        onChange={(value) => setState(value!)}
      />
      <Button onClick={setAnswer}>Next</Button>
    </div>
  );
});

export default NumberField;
