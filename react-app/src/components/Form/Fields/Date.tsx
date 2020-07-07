import { Button, DatePicker } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";

import { FormStoreContext } from "../../../stores/formStore";

const DateField: React.FC = observer(() => {
  const store = useContext(FormStoreContext);
  const { form, current_step } = store;
  const [state, setState] = useState("");
  const setAnswer = () => {
    store.setAnswer(state);
  };
  return (
    <div className="date-field">
      <div className="title">{form?.fields[current_step].title}</div>
      <DatePicker
        placeholder="2020-01-01"
        autoFocus={store.formView}
        onChange={(date, dateString) => setState(dateString)}
      />
      <Button disabled={state.length === 0} onClick={setAnswer}>
        Next
      </Button>
    </div>
  );
});

export default DateField;
