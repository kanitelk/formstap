import React, { useContext, useState } from "react";
import { Input, Button } from "antd";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../../../stores/formStore";
import { PhoneOutlined } from "@ant-design/icons";

const PhoneField: React.FC = observer(() => {
  const store = useContext(FormStoreContext);
    const { form, current_step } = store;
  const [state, setState] = useState("");
  const setAnswer = () => {
    store.setAnswer(state);
  };
  return (
    <div className="phone-field">
      <div className="title">{form?.fields[current_step].title}</div>
      <Input
        prefix={<PhoneOutlined />}
        autoFocus={store.formView}
        onChange={(e) => setState(e.target.value)}
        minLength={10}
        maxLength={12}
        placeholder="+7-910-222-11-99"
        onPressEnter={setAnswer}
      />
      <Button disabled={state.length === 0} onClick={setAnswer}>
        Next
      </Button>
    </div>
  );
});

export default PhoneField;
