import React, { useContext, useState } from "react";
import { Input, Button } from "antd";
import { observer } from "mobx-react-lite";
import { FormStoreContext } from "../../../stores/formStore";
import { TextareaAnswer, Answer } from "../types";

const TextareaField: React.FC = observer(() => {
  const store = useContext(FormStoreContext);
  const { TextArea } = Input;
  const { form, current_step} = store;
  const [state, setState] = useState('');
  const setAnswer = () => {;
    store.setAnswer(state)
  }
  return (
    <div className="textarea-field">
      <div className="title">{form?.fields[current_step].title}</div>
      <TextArea autoFocus onChange={(e) => setState(e.target.value)} />
      <Button onClick={setAnswer}>Next</Button>
    </div>
  );
});

export default TextareaField;
