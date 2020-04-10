import React, { useContext, useState } from "react";
import { Input, Button } from "antd";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../../../stores/formStore";
import { MailOutlined } from "@ant-design/icons";

const EmailField: React.FC = observer(() => {
  const store = useContext(FormStoreContext);
    const { form, current_step } = store;
  const [state, setState] = useState("");
  const setAnswer = () => {
    store.setAnswer(state);
  };
  return (
    <div className="email-field">
      <div className="title">{form?.fields[current_step].title}</div>
      <Input
        onPressEnter={setAnswer}
        prefix={<MailOutlined />}
        type="email"
        autoFocus
        onChange={(e) => setState(e.target.value)}
      />
      <Button onClick={setAnswer}>Next</Button>
    </div>
  );
});

export default EmailField;
